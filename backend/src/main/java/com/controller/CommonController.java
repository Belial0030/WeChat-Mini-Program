package com.controller;

import com.annotation.IgnoreAuth;
import com.service.application.CommonDataApplicationService;
import com.service.face.FaceMatchApplicationService;
import com.service.location.LocationApplicationService;
import com.service.statistics.BarStatisticsApplicationService;
import com.service.statistics.StatisticsApplicationService;
import com.utils.R;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * 通用接口
 */
@RestController
public class CommonController{
    @Autowired
    private LocationApplicationService locationApplicationService;

    @Autowired
    private FaceMatchApplicationService faceMatchApplicationService;

    @Autowired
    private CommonDataApplicationService commonDataApplicationService;

    @Autowired
    private StatisticsApplicationService statisticsApplicationService;

    @Autowired
    private BarStatisticsApplicationService barStatisticsApplicationService;

	private static final Logger logger = LoggerFactory.getLogger(CommonController.class);

	@RequestMapping("/location")
    public R location(String lng,String lat){
        return locationApplicationService.location(lng, lat);
    }
	
	/**
	 * 人脸比对
	 * 
	 * @param face1 人脸1
	 * @param face2 人脸2
	 * @return
	 */
	@RequestMapping("/matchFace")
    public R matchFace(String face1, String face2, HttpServletRequest request){
        return faceMatchApplicationService.matchFace(face1, face2, request);
    }
    
	/**
	 * 获取table表中的column列表(联动接口)
	 * @return
	 */
	@RequestMapping("/option/{tableName}/{columnName}")
	@IgnoreAuth
    public R getOption(@PathVariable("tableName") String tableName, @PathVariable("columnName") String columnName,String level,String parent){
        return commonDataApplicationService.getOption(tableName, columnName, level, parent);
    }
	
	/**
	 * 根据table中的column获取单条记录
	 * @return
	 */
	@RequestMapping("/follow/{tableName}/{columnName}")
	@IgnoreAuth
    public R getFollowByOption(@PathVariable("tableName") String tableName, @PathVariable("columnName") String columnName, @RequestParam String columnValue){
        return commonDataApplicationService.getFollowByOption(tableName, columnName, columnValue);
    }
	
	/**
	 * 修改table表的sfsh状态
	 * @param map
	 * @return
	 */
	@RequestMapping("/sh/{tableName}")
    public R sh(@PathVariable("tableName") String tableName, @RequestBody Map<String, Object> map){
        return commonDataApplicationService.sh(tableName, map);
    }
	
	/**
	 * 获取需要提醒的记录数
	 * @param tableName
	 * @param columnName
	 * @param type 1:数字 2:日期
	 * @param map
	 * @return
	 */
	@RequestMapping("/remind/{tableName}/{columnName}/{type}")
	@IgnoreAuth
    public R remindCount(@PathVariable("tableName") String tableName, @PathVariable("columnName") String columnName, 
						 @PathVariable("type") String type,@RequestParam Map<String, Object> map){
        return commonDataApplicationService.remindCount(tableName, columnName, type, map);
    }

	/**
	 * 圖表统计
	 */
	@IgnoreAuth
	@RequestMapping("/group/{tableName}")
    public R group1(@PathVariable("tableName") String tableName, @RequestParam Map<String,Object> params){
        return statisticsApplicationService.group1(tableName, params);
    }

	/**
	 * 单列求和
	 */
	@RequestMapping("/cal/{tableName}/{columnName}")
	@IgnoreAuth
    public R cal(@PathVariable("tableName") String tableName, @PathVariable("columnName") String columnName){
        return statisticsApplicationService.cal(tableName, columnName);
    }
	
	/**
	 * 分组统计
	 */
	@RequestMapping("/group/{tableName}/{columnName}")
	@IgnoreAuth
    public R group(@PathVariable("tableName") String tableName, @PathVariable("columnName") String columnName){
        return statisticsApplicationService.group(tableName, columnName);
    }
	
	/**
	 * （按值统计）
	 */
	@RequestMapping("/value/{tableName}/{xColumnName}/{yColumnName}")
	@IgnoreAuth
    public R value(@PathVariable("tableName") String tableName, @PathVariable("yColumnName") String yColumnName, @PathVariable("xColumnName") String xColumnName){
        return statisticsApplicationService.value(tableName, yColumnName, xColumnName);
    }

	/**
	 * 下面为新加的
	 *
	 *
	 *
	 */

	/**
	 * 查询字典表的分组求和
	 * tableName  		表名
	 * groupColumn  		分组字段
	 * sumCloum			统计字段
	 * @return
	 */
	@RequestMapping("/newSelectGroupSum")
    public R newSelectGroupSum(@RequestParam Map<String,Object> params){
        logger.debug("newSelectGroupSum:,,Controller:{},,params:{}",this.getClass().getName(),params);
        return statisticsApplicationService.newSelectGroupSum(params);
    }

    /**
     tableName 查询表
     condition1 条件1
     condition1Value 条件1值
     average 计算平均评分

     取值
        有值 Number(res.data.value.toFixed(1))
        无值 if(res.data){}
     * */
    @IgnoreAuth
    @RequestMapping("/queryScore")
    public R queryScore(@RequestParam Map<String, Object> params){
        logger.debug("queryScore:,,Controller:{},,params:{}",this.getClass().getName(),params);
        return statisticsApplicationService.queryScore(params);
    }

	/**
	 * 查询字典表的分组统计总条数
	 *  tableName  		表名
	 *	groupColumn  	分组字段
	 * @return
	 */
	@RequestMapping("/newSelectGroupCount")
    public R newSelectGroupCount(@RequestParam Map<String,Object> params){
        logger.debug("newSelectGroupCount:,,Controller:{},,params:{}",this.getClass().getName(),params);
        return statisticsApplicationService.newSelectGroupCount(params);
    }

	/**
	 * 当前表的日期分组求和
	 * tableName  		表名
	 * groupColumn  		分组字段
	 * sumCloum			统计字段
	 * dateFormatType	日期格式化类型   1:年 2:月 3:日
	 * @return
	 */
	@RequestMapping("/newSelectDateGroupSum")
    public R newSelectDateGroupSum(@RequestParam Map<String,Object> params){
        logger.debug("newSelectDateGroupSum:,,Controller:{},,params:{}",this.getClass().getName(),params);
        return statisticsApplicationService.newSelectDateGroupSum(params);
    }

	/**
	 *
	 * 查询字典表的分组统计总条数
	 * tableName  		表名
	 * groupColumn  		分组字段
	 * dateFormatType	日期格式化类型   1:年 2:月 3:日
	 * @return
	 */
	@RequestMapping("/newSelectDateGroupCount")
    public R newSelectDateGroupCount(@RequestParam Map<String,Object> params){
        logger.debug("newSelectDateGroupCount:,,Controller:{},,params:{}",this.getClass().getName(),params);
        return statisticsApplicationService.newSelectDateGroupCount(params);
    }
/**
 * 饼状图
 * -- 饼状图  查询当前表
 -- 				查询字典表【月】
 -- 				 统计   -- 查询某个月的每个类型的订单销售数量
 -- 				 求和   -- 查询某个月的每个类型的订单销售额
 -- 				查询某个字符串【月】
 -- 				 统计   -- 查询某个月的每个员工的订单销售数量
 -- 				 求和   -- 查询某个月的每个员工的订单销售额
 -- 				查询时间【年】
 -- 				 统计 	-- 查询每个月的订单销售数量
 -- 				 求和 	-- 查询每个月的订单销售额
 -- 饼状图  查询级联表
 -- 				查询字典表
 -- 				 统计  	-- 查询某个月的每个类型的订单销售数量
 -- 				 求和   -- 查询某个月的每个类型的订单销售额
 -- 				查询某个字符串
 -- 				 统计   -- 查询某个月的每个员工的订单销售数量
 -- 				 求和   -- 查询某个月的每个员工的订单销售额
 -- 				查询时间
 -- 				 统计 	-- 统计每个月的订单销售数量
 -- 				 求和 	-- 查询每个月的订单销售额
 */

/**
 * 柱状图
 -- 柱状图  查询当前表
 --             某个【年，月】
 -- 			 当前表 2 级联表 1
 -- 						统计
 --   						【日期，字符串，下拉框】
 -- 						求和
 --   						【日期，字符串，下拉框】
 -- 柱状图  查询级联表
 -- 					某个【年，月】
 -- 						统计
 --   						【日期，字符串，下拉框】
 -- 						求和
 --   						【日期，字符串，下拉框】
 */

    /**
     * 柱状图求和
     */
    @RequestMapping("/barSum")
    public R barSum(@RequestParam Map<String,Object> params){
        logger.debug("barSum方法:,,Controller:{},,params:{}",this.getClass().getName(), com.alibaba.fastjson.JSONObject.toJSONString(params));
        return barStatisticsApplicationService.barSum(params);
    }
	
	/**
     * 柱状图统计
     */
    @RequestMapping("/barCount")
    public R barCount(@RequestParam Map<String,Object> params){
        logger.debug("barCount方法:,,Controller:{},,params:{}",this.getClass().getName(), com.alibaba.fastjson.JSONObject.toJSONString(params));
        return barStatisticsApplicationService.barCount(params);
    }
}
