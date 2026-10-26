package com.service.application;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.entity.UsersEntity;
import com.service.UsersService;
import com.utils.MPUtil;
import com.utils.PageUtils;
import com.utils.R;
import java.util.Arrays;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 领域数据操作与字典转换。
 */
@Service
public class UsersApplicationService {
	@Autowired
	private UsersService usersService;

    /** 后台分页查询。 */
    public R page(Map<String, Object> params,UsersEntity user){
        EntityWrapper<UsersEntity> ew = new EntityWrapper<UsersEntity>();
    	PageUtils page = usersService.queryPage(params, MPUtil.sort(MPUtil.between(MPUtil.allLike(ew, user), params), params));
        return R.ok().put("data", page);
    }

    /** 前台列表查询。 */
    public R list( UsersEntity user){
       	EntityWrapper<UsersEntity> ew = new EntityWrapper<UsersEntity>();
      	ew.allEq(MPUtil.allEQMapPre( user, "user")); 
        return R.ok().put("data", usersService.selectListView(ew));
    }

    /** 后台详情查询。 */
    public R info(String id){
        UsersEntity user = usersService.selectById(id);
        return R.ok().put("data", user);
    }

    /** 保存数据。 */
    public R save(UsersEntity user){
    	if(usersService.selectOne(new EntityWrapper<UsersEntity>().eq("username", user.getUsername())) !=null) {
    		return R.error("用户已存在");
    	}
        usersService.insert(user);
        return R.ok();
    }

    /** 更新数据。 */
    public R update(UsersEntity user){
        usersService.updateById(user);//全部更新
        return R.ok();
    }

    /** 删除数据。 */
    public R delete(Long[] ids){
        usersService.deleteBatchIds(Arrays.asList(ids));
        return R.ok();
    }

}
