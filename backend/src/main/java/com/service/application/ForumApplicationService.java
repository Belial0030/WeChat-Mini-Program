package com.service.application;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.entity.ForumEntity;
import com.entity.UsersEntity;
import com.entity.YonghuEntity;
import com.entity.view.ForumView;
import com.service.DictionaryService;
import com.service.ForumService;
import com.service.UsersService;
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
public class ForumApplicationService {
    private static final Logger logger = LoggerFactory.getLogger("com.controller.ForumController");

    @Autowired
    private ForumService forumService;

    @Autowired
    private DictionaryService dictionaryService;

    @Autowired
    private UsersService usersService;

    @Autowired
    private YonghuService yonghuService;

    /** 后台分页查询。 */
    public R page(Map<String, Object> params, HttpServletRequest request){
        CommonUtil.checkMap(params);
        PageUtils page = forumService.queryPage(params);

        //字典表数据转换
        List<ForumView> list =(List<ForumView>)page.getList();
        for(ForumView c:list){
            //修改对应字典表字段
            dictionaryService.dictionaryConvert(c, request);
        }
        return R.ok().put("data", page);
    }

    /** 后台详情查询。 */
    public R info(Long id, HttpServletRequest request){
        ForumEntity forum = forumService.selectById(id);
        if(forum !=null){
            //entity转view
            ForumView view = new ForumView();
            BeanUtils.copyProperties( forum , view );//把实体数据重构到view中
            //级联表 用户
            //级联表
            YonghuEntity yonghu = yonghuService.selectById(forum.getYonghuId());
            if(yonghu != null){
            BeanUtils.copyProperties( yonghu , view ,new String[]{ "id", "createTime", "insertTime", "updateTime", "yonghuId"
, "usersId"});//把级联的数据添加到view中,并排除id和创建时间字段,当前表的级联注册表
            view.setYonghuId(yonghu.getId());
            }
            //级联表 管理员
            //管理员表做额外的处理
            UsersEntity users = usersService.selectById(forum.getUsersId());
            if(users != null){
                view.setUsersId(users.getId());
                view.setUusername(users.getUsername());
                view.setUpassword(users.getPassword());
                view.setUrole(users.getRole());
                view.setUaddtime(users.getAddtime());
            }
            //修改对应字典表字段
            dictionaryService.dictionaryConvert(view, request);
            return R.ok().put("data", view);
        }else {
            return R.error(511,"查不到数据");
        }

    }

    /** 保存数据。 */
    public R save(ForumEntity forum, HttpServletRequest request){

        String role = String.valueOf(request.getSession().getAttribute("role"));
        if(false)
            return R.error(511,"永远不会进入");
        else if("用户".equals(role))
            forum.setYonghuId(Integer.valueOf(String.valueOf(request.getSession().getAttribute("userId"))));
        else if("管理员".equals(role))
            forum.setUsersId(Integer.valueOf(String.valueOf(request.getSession().getAttribute("userId"))));

        Wrapper<ForumEntity> queryWrapper = new EntityWrapper<ForumEntity>()
            .eq("forum_name", forum.getForumName())
            .eq("yonghu_id", forum.getYonghuId())
            .eq("users_id", forum.getUsersId())
            .eq("super_ids", forum.getSuperIds())
            .eq("forum_state_types", forum.getForumStateTypes())
            ;

        logger.info("sql语句:"+queryWrapper.getSqlSegment());
        ForumEntity forumEntity = forumService.selectOne(queryWrapper);
        if(forumEntity==null){
            forum.setInsertTime(new Date());
            forum.setCreateTime(new Date());
            forumService.insert(forum);
            return R.ok();
        }else {
            return R.error(511,"表中有相同数据");
        }
    }

    /** 更新数据。 */
    public R update(ForumEntity forum, HttpServletRequest request) throws NoSuchFieldException, ClassNotFoundException, IllegalAccessException, InstantiationException{
        ForumEntity oldForumEntity = forumService.selectById(forum.getId());//查询原先数据

        String role = String.valueOf(request.getSession().getAttribute("role"));
//        if(false)
//            return R.error(511,"永远不会进入");
//        else if("用户".equals(role))
//            forum.setYonghuId(Integer.valueOf(String.valueOf(request.getSession().getAttribute("userId"))));
//        else if("管理员".equals(role))
//            forum.setUsersId(Integer.valueOf(String.valueOf(request.getSession().getAttribute("userId"))));
        //根据字段查询是否有相同数据
        Wrapper<ForumEntity> queryWrapper = new EntityWrapper<ForumEntity>()
            .notIn("id",forum.getId())
            .andNew()
            .eq("forum_name", forum.getForumName())
            .eq("yonghu_id", forum.getYonghuId())
            .eq("users_id", forum.getUsersId())
            .eq("super_ids", forum.getSuperIds())
            .eq("forum_state_types", forum.getForumStateTypes())
            ;

        logger.info("sql语句:"+queryWrapper.getSqlSegment());
        ForumEntity forumEntity = forumService.selectOne(queryWrapper);
        forum.setUpdateTime(new Date());
        if(forumEntity==null){
            forumService.updateById(forum);//根据id更新
            return R.ok();
        }else {
            return R.error(511,"表中有相同数据");
        }
    }

    /** 删除数据。 */
    public R delete(Integer[] ids, HttpServletRequest request){
        List<ForumEntity> oldForumList =forumService.selectBatchIds(Arrays.asList(ids));//要删除的数据
        forumService.deleteBatchIds(Arrays.asList(ids));

        return R.ok();
    }

    /** 前台列表查询。 */
    public R list(Map<String, Object> params, HttpServletRequest request){

        CommonUtil.checkMap(params);
        PageUtils page = forumService.queryPage(params);

        //字典表数据转换
        List<ForumView> list =(List<ForumView>)page.getList();
        for(ForumView c:list)
            dictionaryService.dictionaryConvert(c, request); //修改对应字典表字段

        return R.ok().put("data", page);
    }

    /** 前台详情查询。 */
    public R detail(Long id, HttpServletRequest request){
        ForumEntity forum = forumService.selectById(id);
            if(forum !=null){

                //entity转view
                ForumView view = new ForumView();
                BeanUtils.copyProperties( forum , view );//把实体数据重构到view中

                //级联表
                    YonghuEntity yonghu = yonghuService.selectById(forum.getYonghuId());
                if(yonghu != null){
                    BeanUtils.copyProperties( yonghu , view ,new String[]{ "id", "createDate"});//把级联的数据添加到view中,并排除id和创建时间字段
                    view.setYonghuId(yonghu.getId());
                }
                    UsersEntity users = usersService.selectById(forum.getUsersId());
                if(users != null){
                    view.setUsersId(users.getId());
                    view.setUusername(users.getUsername());
                    view.setUpassword(users.getPassword());
                    view.setUrole(users.getRole());
                    view.setUaddtime(users.getAddtime());
                }
                //修改对应字典表字段
                dictionaryService.dictionaryConvert(view, request);
                return R.ok().put("data", view);
            }else {
                return R.error(511,"查不到数据");
            }
    }

    /** 前台新增数据。 */
    public R add(ForumEntity forum, HttpServletRequest request){
        Wrapper<ForumEntity> queryWrapper = new EntityWrapper<ForumEntity>()
            .eq("forum_name", forum.getForumName())
            .eq("yonghu_id", forum.getYonghuId())
            .eq("users_id", forum.getUsersId())
            .eq("super_ids", forum.getSuperIds())
            .eq("forum_state_types", forum.getForumStateTypes())
            ;
        logger.info("sql语句:"+queryWrapper.getSqlSegment());
        ForumEntity forumEntity = forumService.selectOne(queryWrapper);
        if(forumEntity==null){
            forum.setInsertTime(new Date());
            forum.setCreateTime(new Date());
        forumService.insert(forum);

            return R.ok();
        }else {
            return R.error(511,"表中有相同数据");
        }
    }

}
