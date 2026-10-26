package com.service.application;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.entity.ExampaperEntity;
import com.entity.view.ExampaperView;
import com.service.DictionaryService;
import com.service.ExampaperService;
import com.utils.CommonUtil;
import com.utils.PageUtils;
import com.utils.R;
import java.util.ArrayList;
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
public class ExampaperApplicationService {
    private static final Logger logger = LoggerFactory.getLogger("com.controller.ExampaperController");

    @Autowired
    private ExampaperService exampaperService;

    @Autowired
    private DictionaryService dictionaryService;

    /** 后台分页查询。 */
    public R page(Map<String, Object> params, HttpServletRequest request){
        String role = String.valueOf(request.getSession().getAttribute("role"));
        if(false)
            return R.error(511,"永不会进入");
        else if("用户".equals(role))
            params.put("yonghuId",request.getSession().getAttribute("userId"));
        params.put("exampaperDeleteStart",1);params.put("exampaperDeleteEnd",1);
        CommonUtil.checkMap(params);
        PageUtils page = exampaperService.queryPage(params);

        //字典表数据转换
        List<ExampaperView> list =(List<ExampaperView>)page.getList();
        for(ExampaperView c:list){
            //修改对应字典表字段
            dictionaryService.dictionaryConvert(c, request);
        }
        return R.ok().put("data", page);
    }

    /** 后台详情查询。 */
    public R info(Long id, HttpServletRequest request){
        ExampaperEntity exampaper = exampaperService.selectById(id);
        if(exampaper !=null){
            //entity转view
            ExampaperView view = new ExampaperView();
            BeanUtils.copyProperties( exampaper , view );//把实体数据重构到view中
            //修改对应字典表字段
            dictionaryService.dictionaryConvert(view, request);
            return R.ok().put("data", view);
        }else {
            return R.error(511,"查不到数据");
        }

    }

    /** 保存数据。 */
    public R save(ExampaperEntity exampaper, HttpServletRequest request){

        String role = String.valueOf(request.getSession().getAttribute("role"));
        if(false)
            return R.error(511,"永远不会进入");

        Wrapper<ExampaperEntity> queryWrapper = new EntityWrapper<ExampaperEntity>()
            .eq("exampaper_name", exampaper.getExampaperName())
            .eq("exampaper_date", exampaper.getExampaperDate())
            .eq("exampaper_myscore", exampaper.getExampaperMyscore())
            .eq("kemu_types", exampaper.getKemuTypes())
            .eq("exampaper_types", exampaper.getExampaperTypes())
            .eq("zujuan_types", exampaper.getZujuanTypes())
            .eq("exampaper_delete", exampaper.getExampaperDelete())
            ;

        logger.info("sql语句:"+queryWrapper.getSqlSegment());
        ExampaperEntity exampaperEntity = exampaperService.selectOne(queryWrapper);
        if(exampaperEntity==null){
            exampaper.setExampaperDelete(1);
            exampaper.setCreateTime(new Date());
            exampaperService.insert(exampaper);
            return R.ok();
        }else {
            return R.error(511,"表中有相同数据");
        }
    }

    /** 更新数据。 */
    public R update(ExampaperEntity exampaper, HttpServletRequest request) throws NoSuchFieldException, ClassNotFoundException, IllegalAccessException, InstantiationException{
        ExampaperEntity oldExampaperEntity = exampaperService.selectById(exampaper.getId());//查询原先数据

        String role = String.valueOf(request.getSession().getAttribute("role"));
//        if(false)
//            return R.error(511,"永远不会进入");
        //根据字段查询是否有相同数据
        Wrapper<ExampaperEntity> queryWrapper = new EntityWrapper<ExampaperEntity>()
            .notIn("id",exampaper.getId())
            .andNew()
            .eq("exampaper_name", exampaper.getExampaperName())
            .eq("exampaper_date", exampaper.getExampaperDate())
            .eq("exampaper_myscore", exampaper.getExampaperMyscore())
            .eq("kemu_types", exampaper.getKemuTypes())
            .eq("exampaper_types", exampaper.getExampaperTypes())
            .eq("zujuan_types", exampaper.getZujuanTypes())
            .eq("exampaper_delete", exampaper.getExampaperDelete())
            ;

        logger.info("sql语句:"+queryWrapper.getSqlSegment());
        ExampaperEntity exampaperEntity = exampaperService.selectOne(queryWrapper);
        if(exampaperEntity==null){
            exampaperService.updateById(exampaper);//根据id更新
            return R.ok();
        }else {
            return R.error(511,"表中有相同数据");
        }
    }

    /** 删除数据。 */
    public R delete(Integer[] ids, HttpServletRequest request){
        List<ExampaperEntity> oldExampaperList =exampaperService.selectBatchIds(Arrays.asList(ids));//要删除的数据
        ArrayList<ExampaperEntity> list = new ArrayList<>();
        for(Integer id:ids){
            ExampaperEntity exampaperEntity = new ExampaperEntity();
            exampaperEntity.setId(id);
            exampaperEntity.setExampaperDelete(2);
            list.add(exampaperEntity);
        }
        if(list != null && list.size() >0){
            exampaperService.updateBatchById(list);
        }

        return R.ok();
    }

    /** 前台列表查询。 */
    public R list(Map<String, Object> params, HttpServletRequest request){

        CommonUtil.checkMap(params);
        PageUtils page = exampaperService.queryPage(params);

        //字典表数据转换
        List<ExampaperView> list =(List<ExampaperView>)page.getList();
        for(ExampaperView c:list)
            dictionaryService.dictionaryConvert(c, request); //修改对应字典表字段

        return R.ok().put("data", page);
    }

    /** 前台详情查询。 */
    public R detail(Long id, HttpServletRequest request){
        ExampaperEntity exampaper = exampaperService.selectById(id);
            if(exampaper !=null){

                //entity转view
                ExampaperView view = new ExampaperView();
                BeanUtils.copyProperties( exampaper , view );//把实体数据重构到view中

                //修改对应字典表字段
                dictionaryService.dictionaryConvert(view, request);
                return R.ok().put("data", view);
            }else {
                return R.error(511,"查不到数据");
            }
    }

    /** 前台新增数据。 */
    public R add(ExampaperEntity exampaper, HttpServletRequest request){
        Wrapper<ExampaperEntity> queryWrapper = new EntityWrapper<ExampaperEntity>()
            .eq("exampaper_name", exampaper.getExampaperName())
            .eq("exampaper_date", exampaper.getExampaperDate())
            .eq("exampaper_myscore", exampaper.getExampaperMyscore())
            .eq("kemu_types", exampaper.getKemuTypes())
            .eq("exampaper_types", exampaper.getExampaperTypes())
            .eq("zujuan_types", exampaper.getZujuanTypes())
            .eq("exampaper_delete", exampaper.getExampaperDelete())
            ;
        logger.info("sql语句:"+queryWrapper.getSqlSegment());
        ExampaperEntity exampaperEntity = exampaperService.selectOne(queryWrapper);
        if(exampaperEntity==null){
            exampaper.setExampaperDelete(1);
            exampaper.setCreateTime(new Date());
        exampaperService.insert(exampaper);

            return R.ok();
        }else {
            return R.error(511,"表中有相同数据");
        }
    }

}
