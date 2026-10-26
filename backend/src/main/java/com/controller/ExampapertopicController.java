package com.controller;

import com.alibaba.fastjson.JSONObject;
import com.annotation.IgnoreAuth;
import com.entity.ExampapertopicEntity;
import com.service.application.ExampapertopicApplicationService;
import com.service.exam.ExamPaperAssemblyService;
import com.service.exam.ExamQuestionAcquisitionService;
import com.service.exam.ExamSubmissionService;
import com.service.importing.ExampapertopicImportService;
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
 * 试卷选题
 * 后端接口
 * @author
 * @email
*/
@RestController
@Controller
@RequestMapping("/exampapertopic")
public class ExampapertopicController {
    @Autowired
    private ExampapertopicApplicationService exampapertopicApplicationService;

    @Autowired
    private ExampapertopicImportService exampapertopicImportService;

    @Autowired
    private ExamPaperAssemblyService examPaperAssemblyService;

    @Autowired
    private ExamQuestionAcquisitionService examQuestionAcquisitionService;

    @Autowired
    private ExamSubmissionService examSubmissionService;

    private static final Logger logger = LoggerFactory.getLogger(ExampapertopicController.class);

    /**
    * 后端列表
    */
    @RequestMapping("/page")
    public R page(@RequestParam Map<String, Object> params, HttpServletRequest request){
        logger.debug("page方法:,,Controller:{},,params:{}",this.getClass().getName(),JSONObject.toJSONString(params));
        return exampapertopicApplicationService.page(params, request);
    }

    /**
    * 后端详情
    */
    @RequestMapping("/info/{id}")
    public R info(@PathVariable("id") Long id, HttpServletRequest request){
        logger.debug("info方法:,,Controller:{},,id:{}",this.getClass().getName(),id);
        return exampapertopicApplicationService.info(id, request);
    }

    /**
    * 后端保存
    */
    @RequestMapping("/save")
    public R save(@RequestBody ExampapertopicEntity exampapertopic, HttpServletRequest request){
        logger.debug("save方法:,,Controller:{},,exampapertopic:{}",this.getClass().getName(),exampapertopic.toString());
        return exampapertopicApplicationService.save(exampapertopic, request);
    }

    /**
    * 后端修改
    */
    @RequestMapping("/update")
    public R update(@RequestBody ExampapertopicEntity exampapertopic, HttpServletRequest request) throws NoSuchFieldException, ClassNotFoundException, IllegalAccessException, InstantiationException{
        logger.debug("update方法:,,Controller:{},,exampapertopic:{}",this.getClass().getName(),exampapertopic.toString());
        return exampapertopicApplicationService.update(exampapertopic, request);
    }

    /**
    * 删除
    */
    @RequestMapping("/delete")
    public R delete(@RequestBody Integer[] ids, HttpServletRequest request){
        logger.debug("delete:,,Controller:{},,ids:{}",this.getClass().getName(),ids.toString());
        return exampapertopicApplicationService.delete(ids, request);
    }

    /**
     * 批量上传
     */
    @RequestMapping("/batchInsert")
    public R save( String fileName, HttpServletRequest request){
        logger.debug("batchInsert方法:,,Controller:{},,fileName:{}",this.getClass().getName(),fileName);
        return exampapertopicImportService.save(fileName, request);
    }

    /**
    * 前端列表
    */
    @IgnoreAuth
    @RequestMapping("/list")
    public R list(@RequestParam Map<String, Object> params, HttpServletRequest request){
        logger.debug("list方法:,,Controller:{},,params:{}",this.getClass().getName(),JSONObject.toJSONString(params));
        return exampapertopicApplicationService.list(params, request);
    }

    /**
    * 前端详情
    */
    @RequestMapping("/detail/{id}")
    public R detail(@PathVariable("id") Long id, HttpServletRequest request){
        logger.debug("detail方法:,,Controller:{},,id:{}",this.getClass().getName(),id);
        return exampapertopicApplicationService.detail(id, request);
    }

    /**
    * 前端保存
    */
    @RequestMapping("/add")
    public R add(@RequestBody ExampapertopicEntity exampapertopic, HttpServletRequest request){
        logger.debug("add方法:,,Controller:{},,exampapertopic:{}",this.getClass().getName(),exampapertopic.toString());
        return exampapertopicApplicationService.add(exampapertopic, request);
    }

    /**
    * 后端修改
    */
    @RequestMapping("/examinationUpdate")
    public R examinationUpdate(@RequestBody ExampapertopicEntity exampapertopic, HttpServletRequest request){
        logger.debug("update方法:,,Controller:{},,exampapertopic:{}",this.getClass().getName(),exampapertopic.toString());
        return examPaperAssemblyService.examinationUpdate(exampapertopic, request);
    }

    /**
    * 删除
    */
    @RequestMapping("/examinationDelete")
    public R examinationDelete(@RequestBody Integer[] ids){
        logger.debug("delete:,,Controller:{},,ids:{}",this.getClass().getName(),ids.toString());
        return examPaperAssemblyService.examinationDelete(ids);
    }

    /**
    * 自动组卷
    */
    @RequestMapping("/zidongzujuan")
    public R zidongzujuan(@RequestParam Map<String, Object> params, HttpServletRequest request){
        return examPaperAssemblyService.zidongzujuan(params, request);
    }

    /**
    * 获取当前试卷的总分数
    */
    @RequestMapping("/sumExampapertopicNumber")
    public R sumExampapertopicNumber(Integer exampaperId, HttpServletRequest request){
        return examPaperAssemblyService.sumExampapertopicNumber(exampaperId, request);
    }

    /**
     * 考试题目获取
     */
    @RequestMapping("/questionAcquisition")
    public R questionAcquisition(Integer exampaperId, HttpServletRequest request){
        return examQuestionAcquisitionService.questionAcquisition(exampaperId, request);
    }

    /**
     * 提交试卷
     */
    @RequestMapping("/submitQuestions")
    public R submitQuestions(@RequestParam Map<String, Object> params, HttpServletRequest request){
        return examSubmissionService.submitQuestions(params, request);
    }
}
