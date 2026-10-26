package com.service.importing;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.entity.ExamrecordEntity;
import com.service.ExamrecordService;
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
public class ExamrecordImportService {
    @Autowired
    private ExamrecordService examrecordService;

    /** 批量导入。 */
    public R save( String fileName, HttpServletRequest request){
        Integer yonghuId = Integer.valueOf(String.valueOf(request.getSession().getAttribute("userId")));
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        try {
            List<ExamrecordEntity> examrecordList = new ArrayList<>();//上传的东西
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
                            ExamrecordEntity examrecordEntity = new ExamrecordEntity();
//                            examrecordEntity.setExamrecordUuidNumber(data.get(0));                    //考试编号 要改的
//                            examrecordEntity.setYonghuId(Integer.valueOf(data.get(0)));   //考试用户 要改的
//                            examrecordEntity.setExampaperId(Integer.valueOf(data.get(0)));   //所属试卷id（外键） 要改的
//                            examrecordEntity.setTotalScore(Integer.valueOf(data.get(0)));   //所得总分 要改的
//                            examrecordEntity.setInsertTime(date);//时间
//                            examrecordEntity.setCreateTime(date);//时间
                            examrecordList.add(examrecordEntity);

                            //把要查询是否重复的字段放入map中
                                //考试编号
                                if(seachFields.containsKey("examrecordUuidNumber")){
                                    List<String> examrecordUuidNumber = seachFields.get("examrecordUuidNumber");
                                    examrecordUuidNumber.add(data.get(0));//要改的
                                }else{
                                    List<String> examrecordUuidNumber = new ArrayList<>();
                                    examrecordUuidNumber.add(data.get(0));//要改的
                                    seachFields.put("examrecordUuidNumber",examrecordUuidNumber);
                                }
                        }

                        //查询是否重复
                         //考试编号
                        List<ExamrecordEntity> examrecordEntities_examrecordUuidNumber = examrecordService.selectList(new EntityWrapper<ExamrecordEntity>().in("examrecord_uuid_number", seachFields.get("examrecordUuidNumber")));
                        if(examrecordEntities_examrecordUuidNumber.size() >0 ){
                            ArrayList<String> repeatFields = new ArrayList<>();
                            for(ExamrecordEntity s:examrecordEntities_examrecordUuidNumber){
                                repeatFields.add(s.getExamrecordUuidNumber());
                            }
                            return R.error(511,"数据库的该表中的 [考试编号] 字段已经存在 存在数据为:"+repeatFields.toString());
                        }
                        examrecordService.insertBatch(examrecordList);
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
