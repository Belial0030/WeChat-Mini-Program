package com.refactor;

import com.entity.ExampapertopicEntity;
import com.entity.UsersEntity;
import com.entity.view.ExampapertopicView;
import com.service.ExampapertopicService;
import com.service.ExamrecordService;
import com.service.ExamredetailsService;
import com.service.ExamrewrongquestionService;
import com.service.TokenService;
import com.service.UsersService;
import com.service.authentication.UsersAuthenticationService;
import com.service.exam.ExamPaperAssemblyService;
import com.service.exam.ExamSubmissionService;
import com.utils.PageUtils;
import com.utils.R;
import org.junit.jupiter.api.Test;
import org.mockito.InOrder;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

class WorkflowBehaviorTest {
    @Test
    void loginKeepsTokenRoleAndUserId() {
        UsersService users = mock(UsersService.class);
        TokenService tokens = mock(TokenService.class);
        UsersAuthenticationService authentication = new UsersAuthenticationService();
        ReflectionTestUtils.setField(authentication, "usersService", users);
        ReflectionTestUtils.setField(authentication, "tokenService", tokens);
        UsersEntity user = new UsersEntity();
        user.setId(7);
        user.setUsername("admin");
        user.setPassword("password");
        user.setRole("管理员");
        when(users.selectOne(any())).thenReturn(user);
        when(tokens.generateToken(7, "admin", "users", "管理员")).thenReturn("same-token");

        R result = authentication.login("admin", "password", "captcha", new MockHttpServletRequest());

        assertEquals(0, result.get("code"));
        assertEquals("same-token", result.get("token"));
        assertEquals("管理员", result.get("role"));
        assertEquals(7, result.get("userId"));
        assertEquals("账号或密码不正确", authentication.login("admin", "wrong", null, null).get("msg"));
        verify(tokens, times(1)).generateToken(any(), anyString(), anyString(), anyString());
    }

    @Test
    void logoutStillInvalidatesTheSession() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        org.springframework.mock.web.MockHttpSession session = (org.springframework.mock.web.MockHttpSession) request.getSession();
        R response = new UsersAuthenticationService().logout(request);
        assertTrue(session.isInvalid());
        assertEquals("退出成功", response.get("msg"));
    }

    @Test
    void paperScoreValidationAndSumStayTheSame() {
        ExampapertopicService topics = mock(ExampapertopicService.class);
        ExamPaperAssemblyService assembly = new ExamPaperAssemblyService();
        ReflectionTestUtils.setField(assembly, "exampapertopicService", topics);
        assertEquals("试卷id不能为空", assembly.sumExampapertopicNumber(null, null).get("msg"));
        assertEquals("试卷id不能为空", assembly.sumExampapertopicNumber(0, null).get("msg"));
        verifyNoInteractions(topics);
        ExampapertopicEntity first = new ExampapertopicEntity();
        first.setExampapertopicNumber(5);
        ExampapertopicEntity second = new ExampapertopicEntity();
        second.setExampapertopicNumber(10);
        when(topics.selectList(any())).thenReturn(Arrays.asList(first, second));
        assertEquals(15, assembly.sumExampapertopicNumber(1, null).get("exampapertopicNumber"));
    }

    @Test
    void emptyPaperSubmissionKeepsPersistenceOrder() {
        SubmissionFixture f = new SubmissionFixture();
        when(f.topics.queryPage(anyMap())).thenReturn(new PageUtils(Collections.emptyList(), 0, 9999, 1));
        assertEquals(0, f.submission.submitQuestions(submissionParameters(), null).get("code"));
        verify(f.records, never()).insert(any(com.entity.ExamrecordEntity.class));
        InOrder order = inOrder(f.details, f.wrongQuestions, f.records);
        order.verify(f.details).insertBatch(argThat(list -> list.isEmpty()));
        order.verify(f.wrongQuestions).insertBatch(argThat(list -> list.isEmpty()));
        order.verify(f.records).updateById(any(com.entity.ExamrecordEntity.class));
    }

    @Test
    void failedRecordInsertionStillStopsSubmission() {
        SubmissionFixture f = new SubmissionFixture();
        when(f.topics.queryPage(anyMap())).thenReturn(new PageUtils(Collections.singletonList(new ExampapertopicView()), 1, 9999, 1));
        when(f.records.insert(any(com.entity.ExamrecordEntity.class))).thenReturn(false);
        assertEquals(R.error().get("code"), f.submission.submitQuestions(submissionParameters(), null).get("code"));
        verifyNoInteractions(f.details, f.wrongQuestions);
        verify(f.records, never()).updateById(any(com.entity.ExamrecordEntity.class));
    }

    @Test
    void importValidationKeepsAllOriginalErrorMessages() throws Exception {
        MockHttpServletRequest request = new MockHttpServletRequest();
        request.getSession().setAttribute("userId", 7);
        for (String domain : Arrays.asList("Dictionary", "Exampaper", "Exampapertopic", "Examquestion",
                "Examrecord", "Examredetails", "Examrewrongquestion", "Forum", "News", "Shipin", "Xuexizuji", "Yonghu")) {
            Class<?> type = Class.forName("com.service.importing." + domain + "ImportService");
            Object service = type.getDeclaredConstructor().newInstance();
            java.lang.reflect.Method method = type.getMethod("save", String.class, javax.servlet.http.HttpServletRequest.class);
            R noSuffix = (R) method.invoke(service, "questions", request);
            R wrongSuffix = (R) method.invoke(service, "questions.xlsx", request);
            assertEquals(511, noSuffix.get("code"));
            assertEquals("该文件没有后缀", noSuffix.get("msg"));
            assertEquals(511, wrongSuffix.get("code"));
            assertEquals("只支持后缀为xls的excel文件", wrongSuffix.get("msg"));
        }
    }

    private static Map<String, Object> submissionParameters() {
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("yonghuId", 7);
        parameters.put("exampaperId", 2);
        parameters.put("answerList", "[]");
        return parameters;
    }

    private static class SubmissionFixture {
        final ExampapertopicService topics = mock(ExampapertopicService.class);
        final ExamrecordService records = mock(ExamrecordService.class);
        final ExamredetailsService details = mock(ExamredetailsService.class);
        final ExamrewrongquestionService wrongQuestions = mock(ExamrewrongquestionService.class);
        final ExamSubmissionService submission = new ExamSubmissionService();

        SubmissionFixture() {
            ReflectionTestUtils.setField(submission, "exampapertopicService", topics);
            ReflectionTestUtils.setField(submission, "examrecordService", records);
            ReflectionTestUtils.setField(submission, "examredetailsService", details);
            ReflectionTestUtils.setField(submission, "examrewrongquestionService", wrongQuestions);
        }
    }
}
