package com.service.authentication;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.entity.UsersEntity;
import com.service.TokenService;
import com.service.UsersService;
import com.utils.R;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 账户认证与会话。
 */
@Service
public class UsersAuthenticationService {
	@Autowired
	private UsersService usersService;

	@Autowired
	private TokenService tokenService;

    /** 校验登录并签发令牌。 */
    public R login(String username, String password, String captcha, HttpServletRequest request){
		UsersEntity user = usersService.selectOne(new EntityWrapper<UsersEntity>().eq("username", username));
		if(user==null || !user.getPassword().equals(password)) {
			return R.error("账号或密码不正确");
		}
		String token = tokenService.generateToken(user.getId(),username, "users", user.getRole());
		R r = R.ok();
		r.put("token", token);
		r.put("role",user.getRole());
		r.put("userId",user.getId());
		return r;
	}

    /** 注册账户。 */
    public R register(UsersEntity user){
    	if(usersService.selectOne(new EntityWrapper<UsersEntity>().eq("username", user.getUsername())) !=null) {
    		return R.error("用户已存在");
    	}
        usersService.insert(user);
        return R.ok();
    }

    /** 结束当前会话。 */
    public R logout(HttpServletRequest request){
		request.getSession().invalidate();
		return R.ok("退出成功");
	}

    /** 重置账户密码。 */
    public R resetPass(String username, HttpServletRequest request){
    	UsersEntity user = usersService.selectOne(new EntityWrapper<UsersEntity>().eq("username", username));
    	if(user==null) {
    		return R.error("账号不存在");
    	}
    	user.setPassword("123456");
        usersService.update(user,null);
        return R.ok("密码已重置为：123456");
    }

    /** 读取管理员会话信息。 */
    public R getCurrUser(HttpServletRequest request){
    	Integer id = (Integer)request.getSession().getAttribute("userId");
        UsersEntity user = usersService.selectById(id);
        return R.ok().put("data", user);
    }

}
