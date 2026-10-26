package com.refactor;

import com.utils.R;
import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestFactory;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.ClassPathScanningCandidateComponentProvider;
import org.springframework.core.type.filter.AnnotationTypeFilter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.lang.reflect.Array;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

class ControllerDelegationTest {
    private static final List<String> CONTROLLERS = Arrays.asList(
            "Common", "Config", "Dictionary", "Exampaper", "Exampapertopic", "Examquestion",
            "Examrecord", "Examredetails", "Examrewrongquestion", "File", "Forum", "News",
            "Shipin", "Users", "Xuexizuji", "Yonghu");

    @TestFactory
    List<DynamicTest> everyEndpointForwardsTheSameArgumentsAndResult() throws Exception {
        List<DynamicTest> tests = new ArrayList<>();
        for (String name : CONTROLLERS) {
            Class<?> controllerType = Class.forName("com.controller." + name + "Controller");
            for (Method method : controllerType.getDeclaredMethods()) {
                tests.add(DynamicTest.dynamicTest(controllerType.getSimpleName() + "." + method.toGenericString(), () -> {
                    Object controller = controllerType.getDeclaredConstructor().newInstance();
                    List<Field> targets = new ArrayList<>();
                    for (Field field : controllerType.getDeclaredFields()) {
                        if (!field.isAnnotationPresent(Autowired.class)) continue;
                        try {
                            field.getType().getMethod(method.getName(), method.getParameterTypes());
                            targets.add(field);
                        } catch (NoSuchMethodException ignored) {
                            // 同一控制器中的其他职责服务不处理当前接口。
                        }
                    }
                    assertEquals(1, targets.size(), "接口必须只委托给一个职责服务");
                    Field target = targets.get(0);
                    Object expected = method.getReturnType() == ResponseEntity.class
                            ? new ResponseEntity<>(new byte[]{1}, HttpStatus.CREATED) : R.ok().put("marker", "unchanged");
                    Object service = Mockito.mock(target.getType(), invocation -> expected);
                    target.setAccessible(true);
                    target.set(controller, service);
                    Object[] arguments = new Object[method.getParameterCount()];
                    for (int i = 0; i < arguments.length; i++) arguments[i] = argument(method.getParameterTypes()[i]);

                    assertSame(expected, method.invoke(controller, arguments));
                    List<org.mockito.invocation.Invocation> calls = new ArrayList<>(Mockito.mockingDetails(service).getInvocations());
                    assertEquals(1, calls.size());
                    assertEquals(method.getName(), calls.get(0).getMethod().getName());
                    for (int i = 0; i < arguments.length; i++) assertSame(arguments[i], calls.get(0).getArguments()[i]);
                }));
            }
        }
        assertEquals(157, tests.size(), "保留所有原有接口");
        return tests;
    }

    @Test
    void allSplitServicesAndControllersCanBeInjectedWithoutExternalServices() throws Exception {
        Set<Class<?>> services = new LinkedHashSet<>();
        ClassPathScanningCandidateComponentProvider scanner = new ClassPathScanningCandidateComponentProvider(false);
        scanner.addIncludeFilter(new AnnotationTypeFilter(Service.class));
        for (String group : Arrays.asList("application", "authentication", "exam", "face", "file",
                "importing", "learning", "location", "statistics")) {
            for (org.springframework.beans.factory.config.BeanDefinition bean : scanner.findCandidateComponents("com.service." + group)) {
                services.add(Class.forName(bean.getBeanClassName()));
            }
        }
        assertEquals(38, services.size());
        Set<Class<?>> dependencies = new LinkedHashSet<>();
        for (Class<?> service : services) {
            for (Field field : service.getDeclaredFields()) {
                if (field.isAnnotationPresent(Autowired.class)) dependencies.add(field.getType());
            }
        }
        dependencies.removeAll(services);
        try (AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext()) {
            for (Class<?> dependency : dependencies) registerMock(context, dependency);
            for (Class<?> service : services) context.register(service);
            for (String name : CONTROLLERS) context.register(Class.forName("com.controller." + name + "Controller"));
            context.refresh();
            for (Class<?> service : services) assertNotNull(context.getBean(service));
        }
    }

    private static <T> void registerMock(AnnotationConfigApplicationContext context, Class<T> type) {
        context.registerBean(type, () -> Mockito.mock(type));
    }

    private static Object argument(Class<?> type) throws Exception {
        if (type == String.class) return "1";
        if (type == Integer.class) return 1;
        if (type == Long.class) return 1L;
        if (type == Map.class) return new LinkedHashMap<>();
        if (type == HttpServletRequest.class) return new MockHttpServletRequest();
        if (type == MultipartFile.class) return new MockMultipartFile("file", "a.txt", "text/plain", new byte[]{1});
        if (type.isArray()) return Array.newInstance(type.getComponentType(), 0);
        return type.getDeclaredConstructor().newInstance();
    }
}
