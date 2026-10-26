package com.service.statistics;

import com.service.CommonService;
import com.utils.R;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 统计查询与结果组装。
 */
@Service
public class StatisticsApplicationService {
	@Autowired
	private CommonService commonService;

    /** group1。 */
    public R group1(String tableName, Map<String,Object> params){
		params.put("table1", tableName);
		List<Map<String, Object>> result = commonService.chartBoth(params);
		return R.ok().put("data", result);
	}

    /** cal。 */
    public R cal(String tableName, String columnName){
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("table", tableName);
		params.put("column", columnName);
		Map<String, Object> result = commonService.selectCal(params);
		return R.ok().put("data", result);
	}

    /** group。 */
    public R group(String tableName, String columnName){
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("table", tableName);
		params.put("column", columnName);
		List<Map<String, Object>> result = commonService.selectGroup(params);
		return R.ok().put("data", result);
	}

    /** value。 */
    public R value(String tableName, String yColumnName, String xColumnName){
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("table", tableName);
		params.put("xColumn", xColumnName);
		params.put("yColumn", yColumnName);
		List<Map<String, Object>> result = commonService.selectValue(params);
		return R.ok().put("data", result);
	}

    /** newSelectGroupSum。 */
    public R newSelectGroupSum(Map<String,Object> params){
		List<Map<String, Object>> result = commonService.newSelectGroupSum(params);
		return R.ok().put("data", result);
	}

    /** queryScore。 */
    public R queryScore(Map<String, Object> params){
        Map<String, Object> queryScore = commonService.queryScore(params);
        return R.ok().put("data", queryScore);
    }

    /** newSelectGroupCount。 */
    public R newSelectGroupCount(Map<String,Object> params){
		List<Map<String, Object>> result = commonService.newSelectGroupCount(params);
		return R.ok().put("data", result);
	}

    /** newSelectDateGroupSum。 */
    public R newSelectDateGroupSum(Map<String,Object> params){
		String dateFormatType = String.valueOf(params.get("dateFormatType"));
		if("1".equals(dateFormatType)){
			params.put("dateFormat", "%Y");
		}else if("2".equals(dateFormatType)){
			params.put("dateFormat", "%Y-%m");
		}else if("3".equals(dateFormatType)){
			params.put("dateFormat", "%Y-%m-%d");
		}else{
			R.error("日期格式化不正确");
		}
		List<Map<String, Object>> result = commonService.newSelectDateGroupSum(params);
		return R.ok().put("data", result);
	}

    /** newSelectDateGroupCount。 */
    public R newSelectDateGroupCount(Map<String,Object> params){
		String dateFormatType = String.valueOf(params.get("dateFormatType"));
		if("1".equals(dateFormatType)){
			params.put("dateFormat", "%Y");
		}else if("2".equals(dateFormatType)){
			params.put("dateFormat", "%Y-%m");
		}else if("3".equals(dateFormatType)){
			params.put("dateFormat", "%Y-%m-%d");
		}else{
			R.error("日期格式化类型不正确");
		}
		List<Map<String, Object>> result = commonService.newSelectDateGroupCount(params);
		return R.ok().put("data", result);
	}

}
