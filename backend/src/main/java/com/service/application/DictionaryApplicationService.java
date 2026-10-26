package com.service.application;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.entity.DictionaryEntity;
import com.entity.view.DictionaryView;
import com.service.DictionaryService;
import com.utils.CommonUtil;
import com.utils.PageUtils;
import com.utils.R;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.ServletContext;
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
public class DictionaryApplicationService {
    private static final Logger logger = LoggerFactory.getLogger("com.controller.DictionaryController");

    @Autowired
    private DictionaryService dictionaryService;

    /** 后台分页查询。 */
    public R page(Map<String, Object> params, HttpServletRequest request){
        CommonUtil.checkMap(params);
        PageUtils page = dictionaryService.queryPage(params);

        //字典表数据转换
        List<DictionaryView> list =(List<DictionaryView>)page.getList();
        for(DictionaryView c:list){
            //修改对应字典表字段
            dictionaryService.dictionaryConvert(c, request);
        }
        return R.ok().put("data", page);
    }

    /** 后台详情查询。 */
    public R info(Long id, HttpServletRequest request){
        DictionaryEntity dictionary = dictionaryService.selectById(id);
        if(dictionary !=null){
            //entity转view
            DictionaryView view = new DictionaryView();
            BeanUtils.copyProperties( dictionary , view );//把实体数据重构到view中
            //修改对应字典表字段
            dictionaryService.dictionaryConvert(view, request);
            return R.ok().put("data", view);
        }else {
            return R.error(511,"查不到数据");
        }

    }

    /** 保存数据。 */
    public R save(DictionaryEntity dictionary, HttpServletRequest request){

        String role = String.valueOf(request.getSession().getAttribute("role"));
        if(false)
            return R.error(511,"永远不会进入");

        Wrapper<DictionaryEntity> queryWrapper = new EntityWrapper<DictionaryEntity>()
            .eq("dic_code", dictionary.getDicCode())
            .eq("index_name", dictionary.getIndexName())
            ;
        if(dictionary.getDicCode().contains("_erji_types")){
            queryWrapper.eq("super_id",dictionary.getSuperId());
        }

        logger.info("sql语句:"+queryWrapper.getSqlSegment());
        DictionaryEntity dictionaryEntity = dictionaryService.selectOne(queryWrapper);
        if(dictionaryEntity==null){
            dictionary.setCreateTime(new Date());
            dictionaryService.insert(dictionary);
            //字典表新增数据,把数据再重新查出,放入监听器中
            List<DictionaryEntity> dictionaryEntities = dictionaryService.selectList(new EntityWrapper<DictionaryEntity>());
            ServletContext servletContext = request.getServletContext();
            Map<String, Map<Integer,String>> map = new HashMap<>();
            for(DictionaryEntity d :dictionaryEntities){
                Map<Integer, String> m = map.get(d.getDicCode());
                if(m ==null || m.isEmpty()){
                    m = new HashMap<>();
                }
                m.put(d.getCodeIndex(),d.getIndexName());
                map.put(d.getDicCode(),m);
            }
            servletContext.setAttribute("dictionaryMap",map);
            return R.ok();
        }else {
            return R.error(511,"表中有相同数据");
        }
    }

    /** 更新数据。 */
    public R update(DictionaryEntity dictionary, HttpServletRequest request) throws NoSuchFieldException, ClassNotFoundException, IllegalAccessException, InstantiationException{
        DictionaryEntity oldDictionaryEntity = dictionaryService.selectById(dictionary.getId());//查询原先数据

        String role = String.valueOf(request.getSession().getAttribute("role"));
//        if(false)
//            return R.error(511,"永远不会进入");
        //根据字段查询是否有相同数据
        Wrapper<DictionaryEntity> queryWrapper = new EntityWrapper<DictionaryEntity>()
            .notIn("id",dictionary.getId())
            .eq("dic_code", dictionary.getDicCode())
            .eq("index_name", dictionary.getIndexName())
            ;

        if(dictionary.getDicCode().contains("_erji_types")){
            queryWrapper.eq("super_id",dictionary.getSuperId());
        }
        logger.info("sql语句:"+queryWrapper.getSqlSegment());
        DictionaryEntity dictionaryEntity = dictionaryService.selectOne(queryWrapper);
        if(dictionaryEntity==null){
            dictionaryService.updateById(dictionary);//根据id更新
            //如果字典表修改数据的话,把数据再重新查出,放入监听器中
            List<DictionaryEntity> dictionaryEntities = dictionaryService.selectList(new EntityWrapper<DictionaryEntity>());
            ServletContext servletContext = request.getServletContext();
            Map<String, Map<Integer,String>> map = new HashMap<>();
            for(DictionaryEntity d :dictionaryEntities){
                Map<Integer, String> m = map.get(d.getDicCode());
                if(m ==null || m.isEmpty()){
                    m = new HashMap<>();
                }
                m.put(d.getCodeIndex(),d.getIndexName());
                map.put(d.getDicCode(),m);
            }
            servletContext.setAttribute("dictionaryMap",map);
            return R.ok();
        }else {
            return R.error(511,"表中有相同数据");
        }
    }

    /** 删除数据。 */
    public R delete(Integer[] ids, HttpServletRequest request){
        List<DictionaryEntity> oldDictionaryList =dictionaryService.selectBatchIds(Arrays.asList(ids));//要删除的数据
        dictionaryService.deleteBatchIds(Arrays.asList(ids));

        return R.ok();
    }

    /** 查询字典最大编码。 */
    public R maxCodeIndex(DictionaryEntity dictionary){
        List<String> descs = new ArrayList<>();
        descs.add("code_index");
        Wrapper<DictionaryEntity> queryWrapper = new EntityWrapper<DictionaryEntity>()
                .eq("dic_code", dictionary.getDicCode())
                .orderDesc(descs);
        logger.info("sql语句:"+queryWrapper.getSqlSegment());
        List<DictionaryEntity> dictionaryEntityList = dictionaryService.selectList(queryWrapper);
        if(dictionaryEntityList.size()>0 ){
            return R.ok().put("maxCodeIndex",dictionaryEntityList.get(0).getCodeIndex()+1);
        }else{
            return R.ok().put("maxCodeIndex",1);
        }
    }

}
