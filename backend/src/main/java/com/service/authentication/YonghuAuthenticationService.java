package com.service.authentication;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.entity.YonghuEntity;
import com.entity.view.YonghuView;
import com.service.DictionaryService;
import com.service.TokenService;
import com.service.YonghuService;
import com.utils.R;
import java.util.Date;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 账户认证与会话。
 */
@Service
public class YonghuAuthenticationService {
    @Autowired
    private YonghuService yonghuService;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private DictionaryService dictionaryService;

    /** 校验登录并签发令牌。 */
    public R login(String username, String password, String captcha, HttpServletRequest request){
        YonghuEntity yonghu = yonghuService.selectOne(new EntityWrapper<YonghuEntity>().eq("username", username));
        if(yonghu==null || !yonghu.getPassword().equals(password))
            return R.error("账号或密码不正确");
        String token = tokenService.generateToken(yonghu.getId(),username, "yonghu", "用户");
        R r = R.ok();
        r.put("token", token);
        r.put("role","用户");
        r.put("username",yonghu.getYonghuName());
        r.put("tableName","yonghu");
        r.put("userId",yonghu.getId());
        return r;
    }

    /** 注册账户。 */
    public R register(YonghuEntity yonghu, HttpServletRequest request){
        Wrapper<YonghuEntity> queryWrapper = new EntityWrapper<YonghuEntity>()
            .eq("username", yonghu.getUsername())
            .or()
            .eq("yonghu_phone", yonghu.getYonghuPhone())
            .or()
            .eq("yonghu_id_number", yonghu.getYonghuIdNumber())
            ;
        YonghuEntity yonghuEntity = yonghuService.selectOne(queryWrapper);
        if(yonghuEntity != null)
            return R.error("账户或者用户手机号或者用户身份证号已经被使用");
        yonghu.setXuexiNumber(0);
        yonghu.setCreateTime(new Date());
        yonghuService.insert(yonghu);

        return R.ok();
    }

    /** 重置指定账户的密码。 */
    public R resetPassword(Integer  id, HttpServletRequest request){
        YonghuEntity yonghu = yonghuService.selectById(id);
        yonghu.setPassword("123456");
        yonghuService.updateById(yonghu);
        return R.ok();
    }

    /** 重置账户密码。 */
    public R resetPass(String username, HttpServletRequest request){
        YonghuEntity yonghu = yonghuService.selectOne(new EntityWrapper<YonghuEntity>().eq("username", username));
        if(yonghu!=null){
            yonghu.setPassword("123456");
            boolean b = yonghuService.updateById(yonghu);
            if(!b){
               return R.error();
            }
            return R.ok();
        }else{
           return R.error("账号不存在");
        }
    }

    /** 读取用户会话信息。 */
    public R getCurrYonghu(HttpServletRequest request){
        Integer id = (Integer)request.getSession().getAttribute("userId");
        YonghuEntity yonghu = yonghuService.selectById(id);
        if(yonghu !=null){
            //entity转view
            YonghuView view = new YonghuView();
            BeanUtils.copyProperties( yonghu , view );//把实体数据重构到view中

            //修改对应字典表字段
            dictionaryService.dictionaryConvert(view, request);
            return R.ok().put("data", view);
        }else {
            return R.error(511,"查不到数据");
        }
    }

    /** 结束当前会话。 */
    public R logout(HttpServletRequest request){
        request.getSession().invalidate();
        return R.ok("退出成功");
    }

}
