package com.controller;

import com.annotation.IgnoreAuth;
import com.entity.UsersEntity;
import com.service.application.UsersApplicationService;
import com.service.authentication.UsersAuthenticationService;
import com.utils.R;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * 登录相关
 */
@RequestMapping("users")
@RestController
public class UsersController {
    @Autowired
    private UsersAuthenticationService usersAuthenticationService;

    @Autowired
    private UsersApplicationService usersApplicationService;

	/**
	 * 登录
	 */
	@IgnoreAuth
	@PostMapping(value = "/login")
    public R login(String username, String password, String captcha, HttpServletRequest request){
        return usersAuthenticationService.login(username, password, captcha, request);
    }
	
	/**
	 * 注册
	 */
	@IgnoreAuth
	@PostMapping(value = "/register")
    public R register(@RequestBody UsersEntity user){
        return usersAuthenticationService.register(user);
    }

	/**
	 * 退出
	 */
	@GetMapping(value = "logout")
    public R logout(HttpServletRequest request){
        return usersAuthenticationService.logout(request);
    }
	
	/**
     * 密码重置
     */
    @IgnoreAuth
	@RequestMapping(value = "/resetPass")
    public R resetPass(String username, HttpServletRequest request){
        return usersAuthenticationService.resetPass(username, request);
    }
	
	/**
     * 列表
     */
    @RequestMapping("/page")
    public R page(@RequestParam Map<String, Object> params,UsersEntity user){
        return usersApplicationService.page(params, user);
    }

	/**
     * 列表
     */
    @RequestMapping("/list")
    public R list( UsersEntity user){
        return usersApplicationService.list(user);
    }

    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    public R info(@PathVariable("id") String id){
        return usersApplicationService.info(id);
    }
    
    /**
     * 获取用户的session用户信息
     */
    @RequestMapping("/session")
    public R getCurrUser(HttpServletRequest request){
        return usersAuthenticationService.getCurrUser(request);
    }

    /**
     * 保存
     */
    @PostMapping("/save")
    public R save(@RequestBody UsersEntity user){
        return usersApplicationService.save(user);
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    public R update(@RequestBody UsersEntity user){
        return usersApplicationService.update(user);
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    public R delete(@RequestBody Long[] ids){
        return usersApplicationService.delete(ids);
    }
}
