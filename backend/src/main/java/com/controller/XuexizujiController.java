package com.controller;

import com.alibaba.fastjson.JSONObject;
import com.annotation.IgnoreAuth;
import com.entity.XuexizujiEntity;
import com.service.application.XuexizujiApplicationService;
import com.service.importing.XuexizujiImportService;
import com.service.learning.LearningProgressService;
import com.utils.R;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * 学习足迹
 * 后端接口
 * @author
 * @email
*/
@RestController
@Controller
@RequestMapping("/xuexizuji")
public class XuexizujiController {
    @Autowired
    private XuexizujiApplicationService xuexizujiApplicationService;

    @Autowired
    private LearningProgressService learningProgressService;

    @Autowired
    private XuexizujiImportService xuexizujiImportService;

    private static final Logger logger = LoggerFactory.getLogger(XuexizujiController.class);

    /**
    * 后端列表
    */
    @RequestMapping("/page")
    public R page(@RequestParam Map<String, Object> params, HttpServletRequest request){
        logger.debug("page方法:,,Controller:{},,params:{}",this.getClass().getName(),JSONObject.toJSONString(params));
        return xuexizujiApplicationService.page(params, request);
    }

    /**
    * 后端详情
    */
    @RequestMapping("/info/{id}")
    public R info(@PathVariable("id") Long id, HttpServletRequest request){
        logger.debug("info方法:,,Controller:{},,id:{}",this.getClass().getName(),id);
        return xuexizujiApplicationService.info(id, request);
    }

    /**
    * 后端保存
    */
    @RequestMapping("/save")
    public R save(@RequestBody XuexizujiEntity xuexizuji, HttpServletRequest request){
        logger.debug("save方法:,,Controller:{},,xuexizuji:{}",this.getClass().getName(),xuexizuji.toString());
        return xuexizujiApplicationService.save(xuexizuji, request);
    }

    /**
    * 后端修改
    */
    @RequestMapping("/update")
    public R update(@RequestBody XuexizujiEntity xuexizuji, HttpServletRequest request) throws NoSuchFieldException, ClassNotFoundException, IllegalAccessException, InstantiationException{
        logger.debug("update方法:,,Controller:{},,xuexizuji:{}",this.getClass().getName(),xuexizuji.toString());
        return xuexizujiApplicationService.update(xuexizuji, request);
    }

    /**
    * 删除
    */
    @RequestMapping("/delete")
    public R delete(@RequestBody Integer[] ids, HttpServletRequest request){
        logger.debug("delete:,,Controller:{},,ids:{}",this.getClass().getName(),ids.toString());
        return xuexizujiApplicationService.delete(ids, request);
    }

    /**
     * 结束学习
     */
    @RequestMapping("/jieshuxuexi")
    public R jieshuxuexi(Integer shipinId, HttpServletRequest request){
        return learningProgressService.jieshuxuexi(shipinId, request);
    }

    /**
     * 批量上传
     */
    @RequestMapping("/batchInsert")
    public R save( String fileName, HttpServletRequest request){
        logger.debug("batchInsert方法:,,Controller:{},,fileName:{}",this.getClass().getName(),fileName);
        return xuexizujiImportService.save(fileName, request);
    }

    /**
    * 前端列表
    */
    @IgnoreAuth
    @RequestMapping("/list")
    public R list(@RequestParam Map<String, Object> params, HttpServletRequest request){
        logger.debug("list方法:,,Controller:{},,params:{}",this.getClass().getName(),JSONObject.toJSONString(params));
        return xuexizujiApplicationService.list(params, request);
    }

    /**
    * 前端详情
    */
    @RequestMapping("/detail/{id}")
    public R detail(@PathVariable("id") Long id, HttpServletRequest request){
        logger.debug("detail方法:,,Controller:{},,id:{}",this.getClass().getName(),id);
        return xuexizujiApplicationService.detail(id, request);
    }

    /**
    * 前端保存
    */
    @RequestMapping("/add")
    public R add(@RequestBody XuexizujiEntity xuexizuji, HttpServletRequest request){
        logger.debug("add方法:,,Controller:{},,xuexizuji:{}",this.getClass().getName(),xuexizuji.toString());
        return xuexizujiApplicationService.add(xuexizuji, request);
    }

}
