package com.service.application;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.entity.ExamquestionEntity;
import com.entity.ExamredetailsEntity;
import com.entity.YonghuEntity;
import com.entity.view.ExamredetailsView;
import com.service.DictionaryService;
import com.service.ExamquestionService;
import com.service.ExamredetailsService;
import com.service.YonghuService;
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
public class ExamredetailsApplicationService {
    private static final Logger logger = LoggerFactory.getLogger("com.controller.ExamredetailsController");

    @Autowired
    private ExamredetailsService examredetailsService;

    @Autowired
    private DictionaryService dictionaryService;

    @Autowired
    private ExamquestionService examquestionService;

    @Autowired
    private YonghuService yonghuService;

    /** 后台分页查询。 */
    public R page(Map<String, Object> params, HttpServletRequest request){
        String role = String.valueOf(request.getSession().getAttribute("role"));
        if(false)
            return R.error(511,"永不会进入");
        else if("用户".equals(role))
            params.put("yonghuId",request.getSession().getAttribute("userId"));
        CommonUtil.checkMap(params);
        PageUtils page = examredetailsService.queryPage(params);

        //字典表数据转换
        List<ExamredetailsView> list =(List<ExamredetailsView>)page.getList();
        for(ExamredetailsView c:list){
            //修改对应字典表字段
            dictionaryService.dictionaryConvert(c, request);
        }
        return R.ok().put("data", page);
    }

    /** 后台详情查询。 */
    public R info(Long id, HttpServletRequest request){
        ExamredetailsEntity examredetails = examredetailsService.selectById(id);
        if(examredetails !=null){
            //entity转view
            ExamredetailsView view = new ExamredetailsView();
            BeanUtils.copyProperties( examredetails , view );//把实体数据重构到view中
            //级联表 用户
            //级联表
            YonghuEntity yonghu = yonghuService.selectById(examredetails.getYonghuId());
            if(yonghu != null){
            BeanUtils.copyProperties( yonghu , view ,new String[]{ "id", "createTime", "insertTime", "updateTime", "yonghuId"});//把级联的数据添加到view中,并排除id和创建时间字段,当前表的级联注册表
            view.setYonghuId(yonghu.getId());
            }
            //级联表 试题表
            //级联表
            ExamquestionEntity examquestion = examquestionService.selectById(examredetails.getExamquestionId());
            if(examquestion != null){
            BeanUtils.copyProperties( examquestion , view ,new String[]{ "id", "createTime", "insertTime", "updateTime", "yonghuId"});//把级联的数据添加到view中,并排除id和创建时间字段,当前表的级联注册表
            view.setExamquestionId(examquestion.getId());
            }
            //修改对应字典表字段
            dictionaryService.dictionaryConvert(view, request);
            return R.ok().put("data", view);
        }else {
            return R.error(511,"查不到数据");
        }

    }

    /** 保存数据。 */
    public R save(ExamredetailsEntity examredetails, HttpServletRequest request){

        String role = String.valueOf(request.getSession().getAttribute("role"));
        if(false)
            return R.error(511,"永远不会进入");
        else if("用户".equals(role))
            examredetails.setYonghuId(Integer.valueOf(String.valueOf(request.getSession().getAttribute("userId"))));

        Wrapper<ExamredetailsEntity> queryWrapper = new EntityWrapper<ExamredetailsEntity>()
            .eq("yonghu_id", examredetails.getYonghuId())
            .eq("examquestion_id", examredetails.getExamquestionId())
            .eq("examredetails_myanswer", examredetails.getExamredetailsMyanswer())
            .eq("examredetails_myscore", examredetails.getExamredetailsMyscore())
            ;

        logger.info("sql语句:"+queryWrapper.getSqlSegment());
        ExamredetailsEntity examredetailsEntity = examredetailsService.selectOne(queryWrapper);
        if(examredetailsEntity==null){
            examredetails.setCreateTime(new Date());
            examredetailsService.insert(examredetails);
            return R.ok();
        }else {
            return R.error(511,"表中有相同数据");
        }
    }

    /** 更新数据。 */
    public R update(ExamredetailsEntity examredetails, HttpServletRequest request) throws NoSuchFieldException, ClassNotFoundException, IllegalAccessException, InstantiationException{
        ExamredetailsEntity oldExamredetailsEntity = examredetailsService.selectById(examredetails.getId());//查询原先数据

        String role = String.valueOf(request.getSession().getAttribute("role"));
//        if(false)
//            return R.error(511,"永远不会进入");
//        else if("用户".equals(role))
//            examredetails.setYonghuId(Integer.valueOf(String.valueOf(request.getSession().getAttribute("userId"))));
        //根据字段查询是否有相同数据
        Wrapper<ExamredetailsEntity> queryWrapper = new EntityWrapper<ExamredetailsEntity>()
            .notIn("id",examredetails.getId())
            .andNew()
            .eq("yonghu_id", examredetails.getYonghuId())
            .eq("examquestion_id", examredetails.getExamquestionId())
            .eq("examredetails_myanswer", examredetails.getExamredetailsMyanswer())
            .eq("examredetails_myscore", examredetails.getExamredetailsMyscore())
            ;

        logger.info("sql语句:"+queryWrapper.getSqlSegment());
        ExamredetailsEntity examredetailsEntity = examredetailsService.selectOne(queryWrapper);
        if(examredetailsEntity==null){
            examredetailsService.updateById(examredetails);//根据id更新
            return R.ok();
        }else {
            return R.error(511,"表中有相同数据");
        }
    }

    /** 删除数据。 */
    public R delete(Integer[] ids, HttpServletRequest request){
        List<ExamredetailsEntity> oldExamredetailsList =examredetailsService.selectBatchIds(Arrays.asList(ids));//要删除的数据
        examredetailsService.deleteBatchIds(Arrays.asList(ids));

        return R.ok();
    }

    /** 前台列表查询。 */
    public R list(Map<String, Object> params, HttpServletRequest request){

        CommonUtil.checkMap(params);
        PageUtils page = examredetailsService.queryPage(params);

        //字典表数据转换
        List<ExamredetailsView> list =(List<ExamredetailsView>)page.getList();
        for(ExamredetailsView c:list)
            dictionaryService.dictionaryConvert(c, request); //修改对应字典表字段

        return R.ok().put("data", page);
    }

    /** 前台详情查询。 */
    public R detail(Long id, HttpServletRequest request){
        ExamredetailsEntity examredetails = examredetailsService.selectById(id);
            if(examredetails !=null){

                //entity转view
                ExamredetailsView view = new ExamredetailsView();
                BeanUtils.copyProperties( examredetails , view );//把实体数据重构到view中

                //级联表
                    YonghuEntity yonghu = yonghuService.selectById(examredetails.getYonghuId());
                if(yonghu != null){
                    BeanUtils.copyProperties( yonghu , view ,new String[]{ "id", "createDate"});//把级联的数据添加到view中,并排除id和创建时间字段
                    view.setYonghuId(yonghu.getId());
                }
                //级联表
                    ExamquestionEntity examquestion = examquestionService.selectById(examredetails.getExamquestionId());
                if(examquestion != null){
                    BeanUtils.copyProperties( examquestion , view ,new String[]{ "id", "createDate"});//把级联的数据添加到view中,并排除id和创建时间字段
                    view.setExamquestionId(examquestion.getId());
                }
                //修改对应字典表字段
                dictionaryService.dictionaryConvert(view, request);
                return R.ok().put("data", view);
            }else {
                return R.error(511,"查不到数据");
            }
    }

    /** 前台新增数据。 */
    public R add(ExamredetailsEntity examredetails, HttpServletRequest request){
        Wrapper<ExamredetailsEntity> queryWrapper = new EntityWrapper<ExamredetailsEntity>()
            .eq("examredetails_uuid_number", examredetails.getExamredetailsUuidNumber())
            .eq("yonghu_id", examredetails.getYonghuId())
            .eq("examquestion_id", examredetails.getExamquestionId())
            .eq("examredetails_myanswer", examredetails.getExamredetailsMyanswer())
            .eq("examredetails_myscore", examredetails.getExamredetailsMyscore())
            ;
        logger.info("sql语句:"+queryWrapper.getSqlSegment());
        ExamredetailsEntity examredetailsEntity = examredetailsService.selectOne(queryWrapper);
        if(examredetailsEntity==null){
            examredetails.setCreateTime(new Date());
        examredetailsService.insert(examredetails);

            return R.ok();
        }else {
            return R.error(511,"表中有相同数据");
        }
    }

}
