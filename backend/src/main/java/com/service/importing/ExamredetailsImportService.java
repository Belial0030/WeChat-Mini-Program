package com.service.importing;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.entity.ExamredetailsEntity;
import com.service.ExamredetailsService;
import com.utils.PoiUtil;
import com.utils.R;
import java.io.File;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Excel 数据导入。
 */
@Service
public class ExamredetailsImportService {
    @Autowired
    private ExamredetailsService examredetailsService;

    /** 批量导入。 */
    public R save( String fileName, HttpServletRequest request){
        Integer yonghuId = Integer.valueOf(String.valueOf(request.getSession().getAttribute("userId")));
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        try {
            List<ExamredetailsEntity> examredetailsList = new ArrayList<>();//上传的东西
            Map<String, List<String>> seachFields= new HashMap<>();//要查询的字段
            Date date = new Date();
            int lastIndexOf = fileName.lastIndexOf(".");
            if(lastIndexOf == -1){
                return R.error(511,"该文件没有后缀");
            }else{
                String suffix = fileName.substring(lastIndexOf);
                if(!".xls".equals(suffix)){
                    return R.error(511,"只支持后缀为xls的excel文件");
                }else{
                    URL resource = this.getClass().getClassLoader().getResource("static/upload/" + fileName);//获取文件路径
                    File file = new File(resource.getFile());
                    if(!file.exists()){
                        return R.error(511,"找不到上传文件，请联系管理员");
                    }else{
                        List<List<String>> dataList = PoiUtil.poiImport(file.getPath());//读取xls文件
                        dataList.remove(0);//删除第一行，因为第一行是提示
                        for(List<String> data:dataList){
                            //循环
                            ExamredetailsEntity examredetailsEntity = new ExamredetailsEntity();
//                            examredetailsEntity.setExamredetailsUuidNumber(data.get(0));                    //试卷编号 要改的
//                            examredetailsEntity.setYonghuId(Integer.valueOf(data.get(0)));   //用户id 要改的
//                            examredetailsEntity.setExamquestionId(Integer.valueOf(data.get(0)));   //试题id（外键） 要改的
//                            examredetailsEntity.setExamredetailsMyanswer(data.get(0));                    //考生答案 要改的
//                            examredetailsEntity.setExamredetailsMyscore(Integer.valueOf(data.get(0)));   //试题得分 要改的
//                            examredetailsEntity.setCreateTime(date);//时间
                            examredetailsList.add(examredetailsEntity);

                            //把要查询是否重复的字段放入map中
                                //试卷编号
                                if(seachFields.containsKey("examredetailsUuidNumber")){
                                    List<String> examredetailsUuidNumber = seachFields.get("examredetailsUuidNumber");
                                    examredetailsUuidNumber.add(data.get(0));//要改的
                                }else{
                                    List<String> examredetailsUuidNumber = new ArrayList<>();
                                    examredetailsUuidNumber.add(data.get(0));//要改的
                                    seachFields.put("examredetailsUuidNumber",examredetailsUuidNumber);
                                }
                        }

                        //查询是否重复
                         //试卷编号
                        List<ExamredetailsEntity> examredetailsEntities_examredetailsUuidNumber = examredetailsService.selectList(new EntityWrapper<ExamredetailsEntity>().in("examredetails_uuid_number", seachFields.get("examredetailsUuidNumber")));
                        if(examredetailsEntities_examredetailsUuidNumber.size() >0 ){
                            ArrayList<String> repeatFields = new ArrayList<>();
                            for(ExamredetailsEntity s:examredetailsEntities_examredetailsUuidNumber){
                                repeatFields.add(s.getExamredetailsUuidNumber());
                            }
                            return R.error(511,"数据库的该表中的 [试卷编号] 字段已经存在 存在数据为:"+repeatFields.toString());
                        }
                        examredetailsService.insertBatch(examredetailsList);
                        return R.ok();
                    }
                }
            }
        }catch (Exception e){
            e.printStackTrace();
            return R.error(511,"批量插入数据异常，请联系管理员");
        }
    }

}
