package com.service.application;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.entity.ExampaperEntity;
import com.entity.ExampapertopicEntity;
import com.entity.ExamquestionEntity;
import com.entity.view.ExampapertopicView;
import com.service.DictionaryService;
import com.service.ExampaperService;
import com.service.ExampapertopicService;
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
public class ExampapertopicApplicationService {
    private static final Logger logger = LoggerFactory.getLogger("com.controller.ExampapertopicController");

    @Autowired
    private ExampapertopicService exampapertopicService;

    @Autowired
    private DictionaryService dictionaryService;

    @Autowired
    private ExampaperService exampaperService;

    @Autowired
    private ExamquestionService examquestionService;

    /** 后台分页查询。 */
    public R page(Map<String, Object> params, HttpServletRequest request){
        String role = String.valueOf(request.getSession().getAttribute("role"));
        if(false)
            return R.error(511,"永不会进入");
        else if("用户".equals(role))
            params.put("yonghuId",request.getSession().getAttribute("userId"));
        CommonUtil.checkMap(params);
        PageUtils page = exampapertopicService.queryPage(params);

        //字典表数据转换
        List<ExampapertopicView> list =(List<ExampapertopicView>)page.getList();
        for(ExampapertopicView c:list){
            //修改对应字典表字段
            dictionaryService.dictionaryConvert(c, request);
        }
        return R.ok().put("data", page);
    }

    /** 后台详情查询。 */
    public R info(Long id, HttpServletRequest request){
        ExampapertopicEntity exampapertopic = exampapertopicService.selectById(id);
        if(exampapertopic !=null){
            //entity转view
            ExampapertopicView view = new ExampapertopicView();
            BeanUtils.copyProperties( exampapertopic , view );//把实体数据重构到view中
            //级联表 试题表
            //级联表
            ExamquestionEntity examquestion = examquestionService.selectById(exampapertopic.getExamquestionId());
            if(examquestion != null){
            BeanUtils.copyProperties( examquestion , view ,new String[]{ "id", "createTime", "insertTime", "updateTime"});//把级联的数据添加到view中,并排除id和创建时间字段,当前表的级联注册表
            view.setExamquestionId(examquestion.getId());
            }
            //级联表 试卷表
            //级联表
            ExampaperEntity exampaper = exampaperService.selectById(exampapertopic.getExampaperId());
            if(exampaper != null){
            BeanUtils.copyProperties( exampaper , view ,new String[]{ "id", "createTime", "insertTime", "updateTime"});//把级联的数据添加到view中,并排除id和创建时间字段,当前表的级联注册表
            view.setExampaperId(exampaper.getId());
            }
            //修改对应字典表字段
            dictionaryService.dictionaryConvert(view, request);
            return R.ok().put("data", view);
        }else {
            return R.error(511,"查不到数据");
        }

    }

    /** 保存数据。 */
    public R save(ExampapertopicEntity exampapertopic, HttpServletRequest request){

        String role = String.valueOf(request.getSession().getAttribute("role"));
        if(false)
            return R.error(511,"永远不会进入");

        Wrapper<ExampapertopicEntity> queryWrapper = new EntityWrapper<ExampapertopicEntity>()
            .eq("exampaper_id", exampapertopic.getExampaperId())
            .eq("examquestion_id", exampapertopic.getExamquestionId())
            .eq("exampapertopic_number", exampapertopic.getExampapertopicNumber())
            ;

        logger.info("sql语句:"+queryWrapper.getSqlSegment());
        ExampapertopicEntity exampapertopicEntity = exampapertopicService.selectOne(queryWrapper);
        if(exampapertopicEntity==null){
            exampapertopic.setCreateTime(new Date());
            exampapertopicService.insert(exampapertopic);
            return R.ok();
        }else {
            return R.error(511,"表中有相同数据");
        }
    }

    /** 更新数据。 */
    public R update(ExampapertopicEntity exampapertopic, HttpServletRequest request) throws NoSuchFieldException, ClassNotFoundException, IllegalAccessException, InstantiationException{
        ExampapertopicEntity oldExampapertopicEntity = exampapertopicService.selectById(exampapertopic.getId());//查询原先数据

        String role = String.valueOf(request.getSession().getAttribute("role"));
//        if(false)
//            return R.error(511,"永远不会进入");
        //根据字段查询是否有相同数据
        Wrapper<ExampapertopicEntity> queryWrapper = new EntityWrapper<ExampapertopicEntity>()
            .notIn("id",exampapertopic.getId())
            .andNew()
            .eq("exampaper_id", exampapertopic.getExampaperId())
            .eq("examquestion_id", exampapertopic.getExamquestionId())
            .eq("exampapertopic_number", exampapertopic.getExampapertopicNumber())
            ;

        logger.info("sql语句:"+queryWrapper.getSqlSegment());
        ExampapertopicEntity exampapertopicEntity = exampapertopicService.selectOne(queryWrapper);
        if(exampapertopicEntity==null){
            exampapertopicService.updateById(exampapertopic);//根据id更新
            return R.ok();
        }else {
            return R.error(511,"表中有相同数据");
        }
    }

    /** 删除数据。 */
    public R delete(Integer[] ids, HttpServletRequest request){
        List<ExampapertopicEntity> oldExampapertopicList =exampapertopicService.selectBatchIds(Arrays.asList(ids));//要删除的数据
        exampapertopicService.deleteBatchIds(Arrays.asList(ids));

        return R.ok();
    }

    /** 前台列表查询。 */
    public R list(Map<String, Object> params, HttpServletRequest request){

        CommonUtil.checkMap(params);
        PageUtils page = exampapertopicService.queryPage(params);

        //字典表数据转换
        List<ExampapertopicView> list =(List<ExampapertopicView>)page.getList();
        for(ExampapertopicView c:list)
            dictionaryService.dictionaryConvert(c, request); //修改对应字典表字段

        return R.ok().put("data", page);
    }

    /** 前台详情查询。 */
    public R detail(Long id, HttpServletRequest request){
        ExampapertopicEntity exampapertopic = exampapertopicService.selectById(id);
            if(exampapertopic !=null){

                //entity转view
                ExampapertopicView view = new ExampapertopicView();
                BeanUtils.copyProperties( exampapertopic , view );//把实体数据重构到view中

                //级联表
                    ExamquestionEntity examquestion = examquestionService.selectById(exampapertopic.getExamquestionId());
                if(examquestion != null){
                    BeanUtils.copyProperties( examquestion , view ,new String[]{ "id", "createDate"});//把级联的数据添加到view中,并排除id和创建时间字段
                    view.setExamquestionId(examquestion.getId());
                }
                //级联表
                    ExampaperEntity exampaper = exampaperService.selectById(exampapertopic.getExampaperId());
                if(exampaper != null){
                    BeanUtils.copyProperties( exampaper , view ,new String[]{ "id", "createDate"});//把级联的数据添加到view中,并排除id和创建时间字段
                    view.setExampaperId(exampaper.getId());
                }
                //修改对应字典表字段
                dictionaryService.dictionaryConvert(view, request);
                return R.ok().put("data", view);
            }else {
                return R.error(511,"查不到数据");
            }
    }

    /** 前台新增数据。 */
    public R add(ExampapertopicEntity exampapertopic, HttpServletRequest request){
        Wrapper<ExampapertopicEntity> queryWrapper = new EntityWrapper<ExampapertopicEntity>()
            .eq("exampaper_id", exampapertopic.getExampaperId())
            .eq("examquestion_id", exampapertopic.getExamquestionId())
            .eq("exampapertopic_number", exampapertopic.getExampapertopicNumber())
            ;
        logger.info("sql语句:"+queryWrapper.getSqlSegment());
        ExampapertopicEntity exampapertopicEntity = exampapertopicService.selectOne(queryWrapper);
        if(exampapertopicEntity==null){
            exampapertopic.setCreateTime(new Date());
        exampapertopicService.insert(exampapertopic);

            return R.ok();
        }else {
            return R.error(511,"表中有相同数据");
        }
    }

}
