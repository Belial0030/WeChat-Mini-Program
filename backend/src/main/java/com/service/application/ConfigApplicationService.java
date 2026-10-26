package com.service.application;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.entity.ConfigEntity;
import com.service.ConfigService;
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
public class ConfigApplicationService {
	@Autowired
	private ConfigService configService;

    /** 后台分页查询。 */
    public R page(Map<String, Object> params,ConfigEntity config){
        EntityWrapper<ConfigEntity> ew = new EntityWrapper<ConfigEntity>();
    	PageUtils page = configService.queryPage(params);
        return R.ok().put("data", page);
    }

    /** 前台列表查询。 */
    public R list(Map<String, Object> params,ConfigEntity config){
        EntityWrapper<ConfigEntity> ew = new EntityWrapper<ConfigEntity>();
    	PageUtils page = configService.queryPage(params);
        return R.ok().put("data", page);
    }

    /** 后台详情查询。 */
    public R info(String id){
        ConfigEntity config = configService.selectById(id);
        return R.ok().put("data", config);
    }

    /** 前台详情查询。 */
    public R detail(String id){
        ConfigEntity config = configService.selectById(id);
        return R.ok().put("data", config);
    }

    /** infoByName。 */
    public R infoByName(String name){
        ConfigEntity config = configService.selectOne(new EntityWrapper<ConfigEntity>().eq("name", "faceFile"));
        return R.ok().put("data", config);
    }

    /** 保存数据。 */
    public R save(ConfigEntity config){
    	configService.insert(config);
        return R.ok();
    }

    /** 更新数据。 */
    public R update(ConfigEntity config){
        configService.updateById(config);//全部更新
        return R.ok();
    }

    /** 删除数据。 */
    public R delete(Long[] ids){
    	configService.deleteBatchIds(Arrays.asList(ids));
        return R.ok();
    }

}
