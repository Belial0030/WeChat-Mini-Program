package com.service.learning;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.entity.XuexizujiEntity;
import com.entity.YonghuEntity;
import com.service.XuexizujiService;
import com.service.YonghuService;
import com.utils.R;
import java.util.Date;
import javax.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 学习进度。
 */
@Service
public class LearningProgressService {
    private static final Logger logger = LoggerFactory.getLogger("com.controller.XuexizujiController");

    @Autowired
    private XuexizujiService xuexizujiService;

    @Autowired
    private YonghuService yonghuService;

    /** 结束学习并累计学习时长。 */
    public R jieshuxuexi(Integer shipinId, HttpServletRequest request){
        Wrapper<XuexizujiEntity> queryWrapper = new EntityWrapper<XuexizujiEntity>()
                .eq("shipin_id", shipinId)
                .eq("yonghu_id", request.getSession().getAttribute("userId"))
                .eq("xuexizuji_types", 1);
        logger.info("sql语句:"+queryWrapper.getSqlSegment());
        XuexizujiEntity xuexizujiEntity = xuexizujiService.selectOne(queryWrapper);
        YonghuEntity yonghuEntity = yonghuService.selectById(xuexizujiEntity.getYonghuId());
        if(xuexizujiEntity == null){
            return R.error("未查找到数据");
        }
        long time = (new Date().getTime() - xuexizujiEntity.getXuexizujiTime().getTime())/1000/60;
        if(time>0){
            yonghuEntity.setXuexiNumber(yonghuEntity.getXuexiNumber()+Integer.valueOf(String.valueOf(time)));
        }
        xuexizujiEntity.setXuexizujiTypes(3);
        yonghuService.updateById(yonghuEntity);
        xuexizujiService.updateById(xuexizujiEntity);
        return R.ok();
    }

}
