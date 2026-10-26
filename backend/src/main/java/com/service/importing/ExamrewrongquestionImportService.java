package com.service.importing;

import com.entity.ExamrewrongquestionEntity;
import com.service.ExamrewrongquestionService;
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
public class ExamrewrongquestionImportService {
    @Autowired
    private ExamrewrongquestionService examrewrongquestionService;

    /** 批量导入。 */
    public R save( String fileName, HttpServletRequest request){
        Integer yonghuId = Integer.valueOf(String.valueOf(request.getSession().getAttribute("userId")));
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        try {
            List<ExamrewrongquestionEntity> examrewrongquestionList = new ArrayList<>();//上传的东西
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
                            ExamrewrongquestionEntity examrewrongquestionEntity = new ExamrewrongquestionEntity();
//                            examrewrongquestionEntity.setYonghuId(Integer.valueOf(data.get(0)));   //用户id 要改的
//                            examrewrongquestionEntity.setExampaperId(Integer.valueOf(data.get(0)));   //试卷（外键） 要改的
//                            examrewrongquestionEntity.setExamquestionId(Integer.valueOf(data.get(0)));   //试题id（外键） 要改的
//                            examrewrongquestionEntity.setExamredetailsMyanswer(data.get(0));                    //考生作答 要改的
//                            examrewrongquestionEntity.setInsertTime(date);//时间
//                            examrewrongquestionEntity.setCreateTime(date);//时间
                            examrewrongquestionList.add(examrewrongquestionEntity);

                            //把要查询是否重复的字段放入map中
                        }

                        //查询是否重复
                        examrewrongquestionService.insertBatch(examrewrongquestionList);
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
