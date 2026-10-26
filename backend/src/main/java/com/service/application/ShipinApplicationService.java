package com.service.application;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.entity.ShipinEntity;
import com.entity.view.ShipinView;
import com.service.DictionaryService;
import com.service.ShipinService;
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
public class ShipinApplicationService {
    private static final Logger logger = LoggerFactory.getLogger("com.controller.ShipinController");

    @Autowired
    private ShipinService shipinService;

    @Autowired
    private DictionaryService dictionaryService;

    /** 后台分页查询。 */
    public R page(Map<String, Object> params, HttpServletRequest request){
        String role = String.valueOf(request.getSession().getAttribute("role"));
        if(false)
            return R.error(511,"永不会进入");
        else if("用户".equals(role))
            params.put("yonghuId",request.getSession().getAttribute("userId"));
        params.put("shipinDeleteStart",1);params.put("shipinDeleteEnd",1);
        CommonUtil.checkMap(params);
        PageUtils page = shipinService.queryPage(params);

        //字典表数据转换
        List<ShipinView> list =(List<ShipinView>)page.getList();
        for(ShipinView c:list){
            //修改对应字典表字段
            dictionaryService.dictionaryConvert(c, request);
        }
        return R.ok().put("data", page);
    }

    /** 后台详情查询。 */
    public R info(Long id, HttpServletRequest request){
        ShipinEntity shipin = shipinService.selectById(id);
        if(shipin !=null){
            //entity转view
            ShipinView view = new ShipinView();
            BeanUtils.copyProperties( shipin , view );//把实体数据重构到view中
            //修改对应字典表字段
            dictionaryService.dictionaryConvert(view, request);
            return R.ok().put("data", view);
        }else {
            return R.error(511,"查不到数据");
        }

    }

    /** 保存数据。 */
    public R save(ShipinEntity shipin, HttpServletRequest request){

        String role = String.valueOf(request.getSession().getAttribute("role"));
        if(false)
            return R.error(511,"永远不会进入");

        Wrapper<ShipinEntity> queryWrapper = new EntityWrapper<ShipinEntity>()
            .eq("shipin_name", shipin.getShipinName())
            .eq("shipin_video", shipin.getShipinVideo())
            .eq("shipin_types", shipin.getShipinTypes())
            .eq("shipin_delete", shipin.getShipinDelete())
            ;

        logger.info("sql语句:"+queryWrapper.getSqlSegment());
        ShipinEntity shipinEntity = shipinService.selectOne(queryWrapper);
        if(shipinEntity==null){
            shipin.setInsertTime(new Date());
            shipin.setShipinDelete(1);
            shipin.setCreateTime(new Date());
            shipinService.insert(shipin);
            return R.ok();
        }else {
            return R.error(511,"表中有相同数据");
        }
    }

    /** 更新数据。 */
    public R update(ShipinEntity shipin, HttpServletRequest request) throws NoSuchFieldException, ClassNotFoundException, IllegalAccessException, InstantiationException{
        ShipinEntity oldShipinEntity = shipinService.selectById(shipin.getId());//查询原先数据

        String role = String.valueOf(request.getSession().getAttribute("role"));
//        if(false)
//            return R.error(511,"永远不会进入");
        //根据字段查询是否有相同数据
        Wrapper<ShipinEntity> queryWrapper = new EntityWrapper<ShipinEntity>()
            .notIn("id",shipin.getId())
            .andNew()
            .eq("shipin_name", shipin.getShipinName())
            .eq("shipin_video", shipin.getShipinVideo())
            .eq("shipin_types", shipin.getShipinTypes())
            .eq("shipin_delete", shipin.getShipinDelete())
            ;

        logger.info("sql语句:"+queryWrapper.getSqlSegment());
        ShipinEntity shipinEntity = shipinService.selectOne(queryWrapper);
        if("".equals(shipin.getShipinPhoto()) || "null".equals(shipin.getShipinPhoto())){
                shipin.setShipinPhoto(null);
        }
        if("".equals(shipin.getShipinVideo()) || "null".equals(shipin.getShipinVideo())){
                shipin.setShipinVideo(null);
        }
        if(shipinEntity==null){
            shipinService.updateById(shipin);//根据id更新
            return R.ok();
        }else {
            return R.error(511,"表中有相同数据");
        }
    }

    /** 删除数据。 */
    public R delete(Integer[] ids, HttpServletRequest request){
        List<ShipinEntity> oldShipinList =shipinService.selectBatchIds(Arrays.asList(ids));//要删除的数据
        ArrayList<ShipinEntity> list = new ArrayList<>();
        for(Integer id:ids){
            ShipinEntity shipinEntity = new ShipinEntity();
            shipinEntity.setId(id);
            shipinEntity.setShipinDelete(2);
            list.add(shipinEntity);
        }
        if(list != null && list.size() >0){
            shipinService.updateBatchById(list);
        }

        return R.ok();
    }

    /** 前台列表查询。 */
    public R list(Map<String, Object> params, HttpServletRequest request){

        CommonUtil.checkMap(params);
        PageUtils page = shipinService.queryPage(params);

        //字典表数据转换
        List<ShipinView> list =(List<ShipinView>)page.getList();
        for(ShipinView c:list)
            dictionaryService.dictionaryConvert(c, request); //修改对应字典表字段

        return R.ok().put("data", page);
    }

    /** 前台详情查询。 */
    public R detail(Long id, HttpServletRequest request){
        ShipinEntity shipin = shipinService.selectById(id);
            if(shipin !=null){

                //entity转view
                ShipinView view = new ShipinView();
                BeanUtils.copyProperties( shipin , view );//把实体数据重构到view中

                //修改对应字典表字段
                dictionaryService.dictionaryConvert(view, request);
                return R.ok().put("data", view);
            }else {
                return R.error(511,"查不到数据");
            }
    }

    /** 前台新增数据。 */
    public R add(ShipinEntity shipin, HttpServletRequest request){
        Wrapper<ShipinEntity> queryWrapper = new EntityWrapper<ShipinEntity>()
            .eq("shipin_name", shipin.getShipinName())
            .eq("shipin_video", shipin.getShipinVideo())
            .eq("shipin_types", shipin.getShipinTypes())
            .eq("shipin_delete", shipin.getShipinDelete())
            ;
        logger.info("sql语句:"+queryWrapper.getSqlSegment());
        ShipinEntity shipinEntity = shipinService.selectOne(queryWrapper);
        if(shipinEntity==null){
            shipin.setInsertTime(new Date());
            shipin.setShipinDelete(1);
            shipin.setCreateTime(new Date());
        shipinService.insert(shipin);

            return R.ok();
        }else {
            return R.error(511,"表中有相同数据");
        }
    }

}
