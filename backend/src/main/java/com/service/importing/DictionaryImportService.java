package com.service.importing;

import com.entity.DictionaryEntity;
import com.service.DictionaryService;
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
public class DictionaryImportService {
    @Autowired
    private DictionaryService dictionaryService;

    /** 批量导入。 */
    public R save( String fileName, HttpServletRequest request){
        Integer yonghuId = Integer.valueOf(String.valueOf(request.getSession().getAttribute("userId")));
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        try {
            List<DictionaryEntity> dictionaryList = new ArrayList<>();//上传的东西
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
                            DictionaryEntity dictionaryEntity = new DictionaryEntity();
//                            dictionaryEntity.setDicCode(data.get(0));                    //字段 要改的
//                            dictionaryEntity.setDicName(data.get(0));                    //字段名 要改的
//                            dictionaryEntity.setCodeIndex(Integer.valueOf(data.get(0)));   //编码 要改的
//                            dictionaryEntity.setIndexName(data.get(0));                    //编码名字 要改的
//                            dictionaryEntity.setSuperId(Integer.valueOf(data.get(0)));   //父字段id 要改的
//                            dictionaryEntity.setBeizhu(data.get(0));                    //备注 要改的
//                            dictionaryEntity.setCreateTime(date);//时间
                            dictionaryList.add(dictionaryEntity);

                            //把要查询是否重复的字段放入map中
                        }

                        //查询是否重复
                        dictionaryService.insertBatch(dictionaryList);
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
