package com.service.application;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.entity.NewsEntity;
import com.entity.view.NewsView;
import com.service.DictionaryService;
import com.service.NewsService;
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
public class NewsApplicationService {
    private static final Logger logger = LoggerFactory.getLogger("com.controller.NewsController");

    @Autowired
    private NewsService newsService;

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
        PageUtils page = newsService.queryPage(params);

        //字典表数据转换
        List<NewsView> list =(List<NewsView>)page.getList();
        for(NewsView c:list){
            //修改对应字典表字段
            dictionaryService.dictionaryConvert(c, request);
        }
        return R.ok().put("data", page);
    }

    /** 后台详情查询。 */
    public R info(Long id, HttpServletRequest request){
        NewsEntity news = newsService.selectById(id);
        if(news !=null){
            //entity转view
            NewsView view = new NewsView();
            BeanUtils.copyProperties( news , view );//把实体数据重构到view中
            //修改对应字典表字段
            dictionaryService.dictionaryConvert(view, request);
            return R.ok().put("data", view);
        }else {
            return R.error(511,"查不到数据");
        }

    }

    /** 保存数据。 */
    public R save(NewsEntity news, HttpServletRequest request){

        String role = String.valueOf(request.getSession().getAttribute("role"));
        if(false)
            return R.error(511,"永远不会进入");

        Wrapper<NewsEntity> queryWrapper = new EntityWrapper<NewsEntity>()
            .eq("news_name", news.getNewsName())
            .eq("news_types", news.getNewsTypes())
            ;

        logger.info("sql语句:"+queryWrapper.getSqlSegment());
        NewsEntity newsEntity = newsService.selectOne(queryWrapper);
        if(newsEntity==null){
            news.setInsertTime(new Date());
            news.setCreateTime(new Date());
            newsService.insert(news);
            return R.ok();
        }else {
            return R.error(511,"表中有相同数据");
        }
    }

    /** 更新数据。 */
    public R update(NewsEntity news, HttpServletRequest request) throws NoSuchFieldException, ClassNotFoundException, IllegalAccessException, InstantiationException{
        NewsEntity oldNewsEntity = newsService.selectById(news.getId());//查询原先数据

        String role = String.valueOf(request.getSession().getAttribute("role"));
//        if(false)
//            return R.error(511,"永远不会进入");
        //根据字段查询是否有相同数据
        Wrapper<NewsEntity> queryWrapper = new EntityWrapper<NewsEntity>()
            .notIn("id",news.getId())
            .andNew()
            .eq("news_name", news.getNewsName())
            .eq("news_types", news.getNewsTypes())
            ;

        logger.info("sql语句:"+queryWrapper.getSqlSegment());
        NewsEntity newsEntity = newsService.selectOne(queryWrapper);
        if("".equals(news.getNewsPhoto()) || "null".equals(news.getNewsPhoto())){
                news.setNewsPhoto(null);
        }
        if(newsEntity==null){
            newsService.updateById(news);//根据id更新
            return R.ok();
        }else {
            return R.error(511,"表中有相同数据");
        }
    }

    /** 删除数据。 */
    public R delete(Integer[] ids, HttpServletRequest request){
        List<NewsEntity> oldNewsList =newsService.selectBatchIds(Arrays.asList(ids));//要删除的数据
        newsService.deleteBatchIds(Arrays.asList(ids));

        return R.ok();
    }

    /** 前台列表查询。 */
    public R list(Map<String, Object> params, HttpServletRequest request){

        CommonUtil.checkMap(params);
        PageUtils page = newsService.queryPage(params);

        //字典表数据转换
        List<NewsView> list =(List<NewsView>)page.getList();
        for(NewsView c:list)
            dictionaryService.dictionaryConvert(c, request); //修改对应字典表字段

        return R.ok().put("data", page);
    }

    /** 前台详情查询。 */
    public R detail(Long id, HttpServletRequest request){
        NewsEntity news = newsService.selectById(id);
            if(news !=null){

                //entity转view
                NewsView view = new NewsView();
                BeanUtils.copyProperties( news , view );//把实体数据重构到view中

                //修改对应字典表字段
                dictionaryService.dictionaryConvert(view, request);
                return R.ok().put("data", view);
            }else {
                return R.error(511,"查不到数据");
            }
    }

    /** 前台新增数据。 */
    public R add(NewsEntity news, HttpServletRequest request){
        Wrapper<NewsEntity> queryWrapper = new EntityWrapper<NewsEntity>()
            .eq("news_name", news.getNewsName())
            .eq("news_types", news.getNewsTypes())
            ;
        logger.info("sql语句:"+queryWrapper.getSqlSegment());
        NewsEntity newsEntity = newsService.selectOne(queryWrapper);
        if(newsEntity==null){
            news.setInsertTime(new Date());
            news.setCreateTime(new Date());
        newsService.insert(news);

            return R.ok();
        }else {
            return R.error(511,"表中有相同数据");
        }
    }

}
