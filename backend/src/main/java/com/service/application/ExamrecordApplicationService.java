package com.service.application;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.entity.ExampaperEntity;
import com.entity.ExamrecordEntity;
import com.entity.YonghuEntity;
import com.entity.view.ExamrecordView;
import com.service.DictionaryService;
import com.service.ExampaperService;
import com.service.ExamrecordService;
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
public class ExamrecordApplicationService {
    private static final Logger logger = LoggerFactory.getLogger("com.controller.ExamrecordController");

    @Autowired
    private ExamrecordService examrecordService;

    @Autowired
    private DictionaryService dictionaryService;

    @Autowired
    private ExampaperService exampaperService;

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
        PageUtils page = examrecordService.queryPage(params);

        //字典表数据转换
        List<ExamrecordView> list =(List<ExamrecordView>)page.getList();
        for(ExamrecordView c:list){
            //修改对应字典表字段
            dictionaryService.dictionaryConvert(c, request);
        }
        return R.ok().put("data", page);
    }

    /** 后台详情查询。 */
    public R info(Long id, HttpServletRequest request){
        ExamrecordEntity examrecord = examrecordService.selectById(id);
        if(examrecord !=null){
            //entity转view
            ExamrecordView view = new ExamrecordView();
            BeanUtils.copyProperties( examrecord , view );//把实体数据重构到view中
            //级联表 用户
            //级联表
            YonghuEntity yonghu = yonghuService.selectById(examrecord.getYonghuId());
            if(yonghu != null){
            BeanUtils.copyProperties( yonghu , view ,new String[]{ "id", "createTime", "insertTime", "updateTime", "yonghuId"});//把级联的数据添加到view中,并排除id和创建时间字段,当前表的级联注册表
            view.setYonghuId(yonghu.getId());
            }
            //级联表 试卷表
            //级联表
            ExampaperEntity exampaper = exampaperService.selectById(examrecord.getExampaperId());
            if(exampaper != null){
            BeanUtils.copyProperties( exampaper , view ,new String[]{ "id", "createTime", "insertTime", "updateTime", "yonghuId"});//把级联的数据添加到view中,并排除id和创建时间字段,当前表的级联注册表
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
    public R save(ExamrecordEntity examrecord, HttpServletRequest request){

        String role = String.valueOf(request.getSession().getAttribute("role"));
        if(false)
            return R.error(511,"永远不会进入");
        else if("用户".equals(role))
            examrecord.setYonghuId(Integer.valueOf(String.valueOf(request.getSession().getAttribute("userId"))));

        Wrapper<ExamrecordEntity> queryWrapper = new EntityWrapper<ExamrecordEntity>()
            .eq("yonghu_id", examrecord.getYonghuId())
            .eq("exampaper_id", examrecord.getExampaperId())
            .eq("total_score", examrecord.getTotalScore())
            ;

        logger.info("sql语句:"+queryWrapper.getSqlSegment());
        ExamrecordEntity examrecordEntity = examrecordService.selectOne(queryWrapper);
        if(examrecordEntity==null){
            examrecord.setInsertTime(new Date());
            examrecord.setCreateTime(new Date());
            examrecordService.insert(examrecord);
            return R.ok();
        }else {
            return R.error(511,"表中有相同数据");
        }
    }

    /** 更新数据。 */
    public R update(ExamrecordEntity examrecord, HttpServletRequest request) throws NoSuchFieldException, ClassNotFoundException, IllegalAccessException, InstantiationException{
        ExamrecordEntity oldExamrecordEntity = examrecordService.selectById(examrecord.getId());//查询原先数据

        String role = String.valueOf(request.getSession().getAttribute("role"));
//        if(false)
//            return R.error(511,"永远不会进入");
//        else if("用户".equals(role))
//            examrecord.setYonghuId(Integer.valueOf(String.valueOf(request.getSession().getAttribute("userId"))));
        //根据字段查询是否有相同数据
        Wrapper<ExamrecordEntity> queryWrapper = new EntityWrapper<ExamrecordEntity>()
            .notIn("id",examrecord.getId())
            .andNew()
            .eq("yonghu_id", examrecord.getYonghuId())
            .eq("exampaper_id", examrecord.getExampaperId())
            .eq("total_score", examrecord.getTotalScore())
            ;

        logger.info("sql语句:"+queryWrapper.getSqlSegment());
        ExamrecordEntity examrecordEntity = examrecordService.selectOne(queryWrapper);
        if(examrecordEntity==null){
            examrecordService.updateById(examrecord);//根据id更新
            return R.ok();
        }else {
            return R.error(511,"表中有相同数据");
        }
    }

    /** 删除数据。 */
    public R delete(Integer[] ids, HttpServletRequest request){
        List<ExamrecordEntity> oldExamrecordList =examrecordService.selectBatchIds(Arrays.asList(ids));//要删除的数据
        examrecordService.deleteBatchIds(Arrays.asList(ids));

        return R.ok();
    }

    /** 前台列表查询。 */
    public R list(Map<String, Object> params, HttpServletRequest request){

        CommonUtil.checkMap(params);
        PageUtils page = examrecordService.queryPage(params);

        //字典表数据转换
        List<ExamrecordView> list =(List<ExamrecordView>)page.getList();
        for(ExamrecordView c:list)
            dictionaryService.dictionaryConvert(c, request); //修改对应字典表字段

        return R.ok().put("data", page);
    }

    /** 前台详情查询。 */
    public R detail(Long id, HttpServletRequest request){
        ExamrecordEntity examrecord = examrecordService.selectById(id);
            if(examrecord !=null){

                //entity转view
                ExamrecordView view = new ExamrecordView();
                BeanUtils.copyProperties( examrecord , view );//把实体数据重构到view中

                //级联表
                    YonghuEntity yonghu = yonghuService.selectById(examrecord.getYonghuId());
                if(yonghu != null){
                    BeanUtils.copyProperties( yonghu , view ,new String[]{ "id", "createDate"});//把级联的数据添加到view中,并排除id和创建时间字段
                    view.setYonghuId(yonghu.getId());
                }
                //级联表
                    ExampaperEntity exampaper = exampaperService.selectById(examrecord.getExampaperId());
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
    public R add(ExamrecordEntity examrecord, HttpServletRequest request){
        Wrapper<ExamrecordEntity> queryWrapper = new EntityWrapper<ExamrecordEntity>()
            .eq("examrecord_uuid_number", examrecord.getExamrecordUuidNumber())
            .eq("yonghu_id", examrecord.getYonghuId())
            .eq("exampaper_id", examrecord.getExampaperId())
            .eq("total_score", examrecord.getTotalScore())
            ;
        logger.info("sql语句:"+queryWrapper.getSqlSegment());
        ExamrecordEntity examrecordEntity = examrecordService.selectOne(queryWrapper);
        if(examrecordEntity==null){
            examrecord.setInsertTime(new Date());
            examrecord.setCreateTime(new Date());
        examrecordService.insert(examrecord);

            return R.ok();
        }else {
            return R.error(511,"表中有相同数据");
        }
    }

}
