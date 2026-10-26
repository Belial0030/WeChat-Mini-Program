package com.controller;

import com.alibaba.fastjson.JSONObject;
import com.annotation.IgnoreAuth;
import com.entity.DictionaryEntity;
import com.service.application.DictionaryApplicationService;
import com.service.importing.DictionaryImportService;
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
 * 字典
 * 后端接口
 * @author
 * @email
*/
@RestController
@Controller
@RequestMapping("/dictionary")
public class DictionaryController {
    @Autowired
    private DictionaryApplicationService dictionaryApplicationService;

    @Autowired
    private DictionaryImportService dictionaryImportService;

    private static final Logger logger = LoggerFactory.getLogger(DictionaryController.class);

    /**
    * 后端列表
    */
    @RequestMapping("/page")
    @IgnoreAuth
    public R page(@RequestParam Map<String, Object> params, HttpServletRequest request){
        logger.debug("page方法:,,Controller:{},,params:{}",this.getClass().getName(),JSONObject.toJSONString(params));
        return dictionaryApplicationService.page(params, request);
    }

    /**
    * 后端详情
    */
    @RequestMapping("/info/{id}")
    public R info(@PathVariable("id") Long id, HttpServletRequest request){
        logger.debug("info方法:,,Controller:{},,id:{}",this.getClass().getName(),id);
        return dictionaryApplicationService.info(id, request);
    }

    /**
    * 后端保存
    */
    @RequestMapping("/save")
    public R save(@RequestBody DictionaryEntity dictionary, HttpServletRequest request){
        logger.debug("save方法:,,Controller:{},,dictionary:{}",this.getClass().getName(),dictionary.toString());
        return dictionaryApplicationService.save(dictionary, request);
    }

    /**
    * 后端修改
    */
    @RequestMapping("/update")
    public R update(@RequestBody DictionaryEntity dictionary, HttpServletRequest request) throws NoSuchFieldException, ClassNotFoundException, IllegalAccessException, InstantiationException{
        logger.debug("update方法:,,Controller:{},,dictionary:{}",this.getClass().getName(),dictionary.toString());
        return dictionaryApplicationService.update(dictionary, request);
    }

    /**
    * 删除
    */
    @RequestMapping("/delete")
    public R delete(@RequestBody Integer[] ids, HttpServletRequest request){
        logger.debug("delete:,,Controller:{},,ids:{}",this.getClass().getName(),ids.toString());
        return dictionaryApplicationService.delete(ids, request);
    }

    /**
     * 最大值
     */
    @RequestMapping("/maxCodeIndex")
    public R maxCodeIndex(@RequestBody DictionaryEntity dictionary){
        logger.debug("maxCodeIndex:,,Controller:{},,dictionary:{}",this.getClass().getName(),dictionary.toString());
        return dictionaryApplicationService.maxCodeIndex(dictionary);
    }

    /**
     * 批量上传
     */
    @RequestMapping("/batchInsert")
    public R save( String fileName, HttpServletRequest request){
        logger.debug("batchInsert方法:,,Controller:{},,fileName:{}",this.getClass().getName(),fileName);
        return dictionaryImportService.save(fileName, request);
    }

}
