package com.service.application;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.entity.ExamquestionEntity;
import com.entity.view.ExamquestionView;
import com.service.DictionaryService;
import com.service.ExamquestionService;
import com.utils.CommonUtil;
import com.utils.PageUtils;
import com.utils.R;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 领域数据操作与字典转换。
 */
@Service
public class ExamquestionApplicationService {
    private static final Logger logger = LoggerFactory.getLogger("com.controller.ExamquestionController");

    @Autowired
    private ExamquestionService examquestionService;

    @Autowired
    private DictionaryService dictionaryService;

    /** 后台分页查询。 */
    public R page(Map<String, Object> params, HttpServletRequest request){
        String role = String.valueOf(request.getSession().getAttribute("role"));
        if(false)
            return R.error(511,"永不会进入");
        else if("用户".equals(role))
            params.put("yonghuId",request.getSession().getAttribute("userId"));
        CommonUtil.checkMap(params);
        PageUtils page = examquestionService.queryPage(params);

        //字典表数据转换
        List<ExamquestionView> list =(List<ExamquestionView>)page.getList();
        for(ExamquestionView c:list){
            //修改对应字典表字段
            dictionaryService.dictionaryConvert(c, request);
        }
        return R.ok().put("data", page);
    }

    /** 后台详情查询。 */
    public R info(Long id, HttpServletRequest request){
        ExamquestionEntity examquestion = examquestionService.selectById(id);
        if(examquestion !=null){
            //entity转view
            ExamquestionView view = new ExamquestionView();
            BeanUtils.copyProperties( examquestion , view );//把实体数据重构到view中
            //修改对应字典表字段
            dictionaryService.dictionaryConvert(view, request);
            return R.ok().put("data", view);
        }else {
            return R.error(511,"查不到数据");
        }

    }

    /** 保存数据。 */
    public R save(ExamquestionEntity examquestion, HttpServletRequest request){

        String role = String.valueOf(request.getSession().getAttribute("role"));
        if(false)
            return R.error(511,"永远不会进入");

        Wrapper<ExamquestionEntity> queryWrapper = new EntityWrapper<ExamquestionEntity>()
            .eq("examquestion_name", examquestion.getExamquestionName())
            .eq("kemu_types", examquestion.getKemuTypes())
            .eq("examquestion_options", examquestion.getExamquestionOptions())
            .eq("examquestion_answer", examquestion.getExamquestionAnswer())
            .eq("examquestion_analysis", examquestion.getExamquestionAnalysis())
            .eq("examquestion_types", examquestion.getExamquestionTypes())
            .eq("examquestion_sequence", examquestion.getExamquestionSequence())
            ;

        logger.info("sql语句:"+queryWrapper.getSqlSegment());
        ExamquestionEntity examquestionEntity = examquestionService.selectOne(queryWrapper);
        if(examquestionEntity==null){
            examquestion.setCreateTime(new Date());
            examquestionService.insert(examquestion);
            return R.ok();
        }else {
            return R.error(511,"表中有相同数据");
        }
    }

    /** 更新数据。 */
    public R update(ExamquestionEntity examquestion, HttpServletRequest request) throws NoSuchFieldException, ClassNotFoundException, IllegalAccessException, InstantiationException{
        ExamquestionEntity oldExamquestionEntity = examquestionService.selectById(examquestion.getId());//查询原先数据

        String role = String.valueOf(request.getSession().getAttribute("role"));
//        if(false)
//            return R.error(511,"永远不会进入");
        //根据字段查询是否有相同数据
        Wrapper<ExamquestionEntity> queryWrapper = new EntityWrapper<ExamquestionEntity>()
            .notIn("id",examquestion.getId())
            .andNew()
            .eq("examquestion_name", examquestion.getExamquestionName())
            .eq("kemu_types", examquestion.getKemuTypes())
            .eq("examquestion_options", examquestion.getExamquestionOptions())
            .eq("examquestion_answer", examquestion.getExamquestionAnswer())
            .eq("examquestion_analysis", examquestion.getExamquestionAnalysis())
            .eq("examquestion_types", examquestion.getExamquestionTypes())
            .eq("examquestion_sequence", examquestion.getExamquestionSequence())
            ;

        logger.info("sql语句:"+queryWrapper.getSqlSegment());
        ExamquestionEntity examquestionEntity = examquestionService.selectOne(queryWrapper);
        if(examquestionEntity==null){
            examquestionService.updateById(examquestion);//根据id更新
            return R.ok();
        }else {
            return R.error(511,"表中有相同数据");
        }
    }

    /** 删除数据。 */
    public R delete(Integer[] ids, HttpServletRequest request){
        List<ExamquestionEntity> oldExamquestionList =examquestionService.selectBatchIds(Arrays.asList(ids));//要删除的数据
        examquestionService.deleteBatchIds(Arrays.asList(ids));

        return R.ok();
    }

    /** 前台列表查询。 */
    public R list(Map<String, Object> params, HttpServletRequest request){

        CommonUtil.checkMap(params);
        PageUtils page = examquestionService.queryPage(params);

        //字典表数据转换
        List<ExamquestionView> list =(List<ExamquestionView>)page.getList();
        for(ExamquestionView c:list)
            dictionaryService.dictionaryConvert(c, request); //修改对应字典表字段

        return R.ok().put("data", page);
    }

    /** 前台详情查询。 */
    public R detail(Long id, HttpServletRequest request){
        ExamquestionEntity examquestion = examquestionService.selectById(id);
            if(examquestion !=null){

                //entity转view
                ExamquestionView view = new ExamquestionView();
                BeanUtils.copyProperties( examquestion , view );//把实体数据重构到view中

                //修改对应字典表字段
                dictionaryService.dictionaryConvert(view, request);
                return R.ok().put("data", view);
            }else {
                return R.error(511,"查不到数据");
            }
    }

    /** 前台新增数据。 */
    public R add(ExamquestionEntity examquestion, HttpServletRequest request){
        Wrapper<ExamquestionEntity> queryWrapper = new EntityWrapper<ExamquestionEntity>()
            .eq("examquestion_name", examquestion.getExamquestionName())
            .eq("kemu_types", examquestion.getKemuTypes())
            .eq("examquestion_options", examquestion.getExamquestionOptions())
            .eq("examquestion_answer", examquestion.getExamquestionAnswer())
            .eq("examquestion_analysis", examquestion.getExamquestionAnalysis())
            .eq("examquestion_types", examquestion.getExamquestionTypes())
            .eq("examquestion_sequence", examquestion.getExamquestionSequence())
            ;
        logger.info("sql语句:"+queryWrapper.getSqlSegment());
        ExamquestionEntity examquestionEntity = examquestionService.selectOne(queryWrapper);
        if(examquestionEntity==null){
            examquestion.setCreateTime(new Date());
        examquestionService.insert(examquestion);

            return R.ok();
        }else {
            return R.error(511,"表中有相同数据");
        }
    }

}
