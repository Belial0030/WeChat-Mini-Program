package com.service.statistics;

import com.alibaba.fastjson.JSON;
import com.service.CommonService;
import com.utils.R;
import com.utils.StringUtil;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 统计查询与结果组装。
 */
@Service
public class BarStatisticsApplicationService {
	@Autowired
	private CommonService commonService;

    /** barSum。 */
    public R barSum(Map<String,Object> params){
        Boolean isJoinTableFlag =  false;//是否有级联表相关
        String one =  "";//第一优先
        String two =  "";//第二优先

		//处理thisTable和joinTable 处理内容是把json字符串转为Map并把带有,的切割为数组
			//当前表
			Map<String,Object> thisTable = JSON.parseObject(String.valueOf(params.get("thisTable")),Map.class);
			params.put("thisTable",thisTable);

			//级联表
			String joinTableString = String.valueOf(params.get("joinTable"));
			if(StringUtil.isNotEmpty(joinTableString)) {
				Map<String, Object> joinTable = JSON.parseObject(joinTableString, Map.class);
				params.put("joinTable", joinTable);
				isJoinTableFlag = true;
			}

		if(StringUtil.isNotEmpty(String.valueOf(thisTable.get("date")))){//当前表日期
			thisTable.put("date",String.valueOf(thisTable.get("date")).split(","));
			one = "thisDate0";
		}
		if(isJoinTableFlag){//级联表日期
			Map<String, Object> joinTable = (Map<String, Object>) params.get("joinTable");
			if(StringUtil.isNotEmpty(String.valueOf(joinTable.get("date")))){
				joinTable.put("date",String.valueOf(joinTable.get("date")).split(","));
				if(StringUtil.isEmpty(one)){
					one ="joinDate0";
				}else{
					if(StringUtil.isEmpty(two)){
						two ="joinDate0";
					}
				}
			}
		}
		if(StringUtil.isNotEmpty(String.valueOf(thisTable.get("string")))){//当前表字符串
			thisTable.put("string",String.valueOf(thisTable.get("string")).split(","));
			if(StringUtil.isEmpty(one)){
				one ="thisString0";
			}else{
				if(StringUtil.isEmpty(two)){
					two ="thisString0";
				}
			}
		}
		if(isJoinTableFlag){//级联表字符串
			Map<String, Object> joinTable = (Map<String, Object>) params.get("joinTable");
			if(StringUtil.isNotEmpty(String.valueOf(joinTable.get("string")))){
				joinTable.put("string",String.valueOf(joinTable.get("string")).split(","));
				if(StringUtil.isEmpty(one)){
					one ="joinString0";
				}else{
					if(StringUtil.isEmpty(two)){
						two ="joinString0";
					}
				}
			}
		}
		if(StringUtil.isNotEmpty(String.valueOf(thisTable.get("types")))){//当前表类型
			thisTable.put("types",String.valueOf(thisTable.get("types")).split(","));
			if(StringUtil.isEmpty(one)){
				one ="thisTypes0";
			}else{
				if(StringUtil.isEmpty(two)){
					two ="thisTypes0";
				}
			}
		}
		if(isJoinTableFlag){//级联表类型
			Map<String, Object> joinTable = (Map<String, Object>) params.get("joinTable");
			if(StringUtil.isNotEmpty(String.valueOf(joinTable.get("types")))){
				joinTable.put("types",String.valueOf(joinTable.get("types")).split(","));
				if(StringUtil.isEmpty(one)){
					one ="joinTypes0";
				}else{
					if(StringUtil.isEmpty(two)){
						two ="joinTypes0";
					}
				}

			}
		}

		List<Map<String, Object>> result = commonService.barSum(params);

		List<String> xAxis = new ArrayList<>();//报表x轴
		List<List<String>> yAxis = new ArrayList<>();//y轴
		List<String> legend = new ArrayList<>();//标题

		if(StringUtil.isEmpty(two)){//不包含第二列
			List<String> yAxis0 = new ArrayList<>();
			yAxis.add(yAxis0);
			legend.add("数值");
			for(Map<String, Object> map :result){
				String oneValue = String.valueOf(map.get(one));
				String value = String.valueOf(map.get("value"));
				xAxis.add(oneValue);
				yAxis0.add(value);
			}
		}else{//包含第二列
			Map<String, HashMap<String, String>> dataMap = new LinkedHashMap<>();
			if(StringUtil.isNotEmpty(two)){
				for(Map<String, Object> map :result){
					String oneValue = String.valueOf(map.get(one));
					String twoValue = String.valueOf(map.get(two));
					String value = String.valueOf(map.get("value"));
					if(!legend.contains(twoValue)){
						legend.add(twoValue);//添加完成后 就是最全的第二列的类型
					}
					if(dataMap.containsKey(oneValue)){
						dataMap.get(oneValue).put(twoValue,value);
					}else{
						HashMap<String, String> oneData = new HashMap<>();
						oneData.put(twoValue,value);
						dataMap.put(oneValue,oneData);
					}

				}
			}

			for(int i =0; i<legend.size(); i++){
				yAxis.add(new ArrayList<String>());
			}

			Set<String> keys = dataMap.keySet();
			for(String key:keys){
				xAxis.add(key);
				HashMap<String, String> map = dataMap.get(key);
				for(int i =0; i<legend.size(); i++){
					List<String> data = yAxis.get(i);
					if(StringUtil.isNotEmpty(map.get(legend.get(i)))){
						data.add(map.get(legend.get(i)));
					}else{
						data.add("0");
					}
				}
			}
			System.out.println();
		}

		Map<String, Object> resultMap = new HashMap<>();
		resultMap.put("xAxis",xAxis);
		resultMap.put("yAxis",yAxis);
		resultMap.put("legend",legend);
		return R.ok().put("data", resultMap);
    }

    /** barCount。 */
    public R barCount(Map<String,Object> params){
        Boolean isJoinTableFlag =  false;//是否有级联表相关
        String one =  "";//第一优先
        String two =  "";//第二优先

		//处理thisTable和joinTable 处理内容是把json字符串转为Map并把带有,的切割为数组
			//当前表
			Map<String,Object> thisTable = JSON.parseObject(String.valueOf(params.get("thisTable")),Map.class);
			params.put("thisTable",thisTable);

			//级联表
			String joinTableString = String.valueOf(params.get("joinTable"));
			if(StringUtil.isNotEmpty(joinTableString)) {
				Map<String, Object> joinTable = JSON.parseObject(joinTableString, Map.class);
				params.put("joinTable", joinTable);
				isJoinTableFlag = true;
			}

		if(StringUtil.isNotEmpty(String.valueOf(thisTable.get("date")))){//当前表日期
			thisTable.put("date",String.valueOf(thisTable.get("date")).split(","));
			one = "thisDate0";
		}
		if(isJoinTableFlag){//级联表日期
			Map<String, Object> joinTable = (Map<String, Object>) params.get("joinTable");
			if(StringUtil.isNotEmpty(String.valueOf(joinTable.get("date")))){
				joinTable.put("date",String.valueOf(joinTable.get("date")).split(","));
				if(StringUtil.isEmpty(one)){
					one ="joinDate0";
				}else{
					if(StringUtil.isEmpty(two)){
						two ="joinDate0";
					}
				}
			}
		}
		if(StringUtil.isNotEmpty(String.valueOf(thisTable.get("string")))){//当前表字符串
			thisTable.put("string",String.valueOf(thisTable.get("string")).split(","));
			if(StringUtil.isEmpty(one)){
				one ="thisString0";
			}else{
				if(StringUtil.isEmpty(two)){
					two ="thisString0";
				}
			}
		}
		if(isJoinTableFlag){//级联表字符串
			Map<String, Object> joinTable = (Map<String, Object>) params.get("joinTable");
			if(StringUtil.isNotEmpty(String.valueOf(joinTable.get("string")))){
				joinTable.put("string",String.valueOf(joinTable.get("string")).split(","));
				if(StringUtil.isEmpty(one)){
					one ="joinString0";
				}else{
					if(StringUtil.isEmpty(two)){
						two ="joinString0";
					}
				}
			}
		}
		if(StringUtil.isNotEmpty(String.valueOf(thisTable.get("types")))){//当前表类型
			thisTable.put("types",String.valueOf(thisTable.get("types")).split(","));
			if(StringUtil.isEmpty(one)){
				one ="thisTypes0";
			}else{
				if(StringUtil.isEmpty(two)){
					two ="thisTypes0";
				}
			}
		}
		if(isJoinTableFlag){//级联表类型
			Map<String, Object> joinTable = (Map<String, Object>) params.get("joinTable");
			if(StringUtil.isNotEmpty(String.valueOf(joinTable.get("types")))){
				joinTable.put("types",String.valueOf(joinTable.get("types")).split(","));
				if(StringUtil.isEmpty(one)){
					one ="joinTypes0";
				}else{
					if(StringUtil.isEmpty(two)){
						two ="joinTypes0";
					}
				}

			}
		}

		List<Map<String, Object>> result = commonService.barCount(params);

		List<String> xAxis = new ArrayList<>();//报表x轴
		List<List<String>> yAxis = new ArrayList<>();//y轴
		List<String> legend = new ArrayList<>();//标题

		if(StringUtil.isEmpty(two)){//不包含第二列
			List<String> yAxis0 = new ArrayList<>();
			yAxis.add(yAxis0);
			legend.add("数值");
			for(Map<String, Object> map :result){
				String oneValue = String.valueOf(map.get(one));
				String value = String.valueOf(map.get("value"));
				xAxis.add(oneValue);
				yAxis0.add(value);
			}
		}else{//包含第二列
			Map<String, HashMap<String, String>> dataMap = new LinkedHashMap<>();
			if(StringUtil.isNotEmpty(two)){
				for(Map<String, Object> map :result){
					String oneValue = String.valueOf(map.get(one));
					String twoValue = String.valueOf(map.get(two));
					String value = String.valueOf(map.get("value"));
					if(!legend.contains(twoValue)){
						legend.add(twoValue);//添加完成后 就是最全的第二列的类型
					}
					if(dataMap.containsKey(oneValue)){
						dataMap.get(oneValue).put(twoValue,value);
					}else{
						HashMap<String, String> oneData = new HashMap<>();
						oneData.put(twoValue,value);
						dataMap.put(oneValue,oneData);
					}

				}
			}

			for(int i =0; i<legend.size(); i++){
				yAxis.add(new ArrayList<String>());
			}

			Set<String> keys = dataMap.keySet();
			for(String key:keys){
				xAxis.add(key);
				HashMap<String, String> map = dataMap.get(key);
				for(int i =0; i<legend.size(); i++){
					List<String> data = yAxis.get(i);
					if(StringUtil.isNotEmpty(map.get(legend.get(i)))){
						data.add(map.get(legend.get(i)));
					}else{
						data.add("0");
					}
				}
			}
			System.out.println();
		}

		Map<String, Object> resultMap = new HashMap<>();
		resultMap.put("xAxis",xAxis);
		resultMap.put("yAxis",yAxis);
		resultMap.put("legend",legend);
		return R.ok().put("data", resultMap);
    }

}
