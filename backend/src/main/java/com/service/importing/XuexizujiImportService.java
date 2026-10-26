package com.service.importing;

import com.entity.XuexizujiEntity;
import com.service.XuexizujiService;
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
public class XuexizujiImportService {
    @Autowired
    private XuexizujiService xuexizujiService;

    /** 批量导入。 */
    public R save( String fileName, HttpServletRequest request){
        Integer yonghuId = Integer.valueOf(String.valueOf(request.getSession().getAttribute("userId")));
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        try {
            List<XuexizujiEntity> xuexizujiList = new ArrayList<>();//上传的东西
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
                            XuexizujiEntity xuexizujiEntity = new XuexizujiEntity();
//                            xuexizujiEntity.setShipinId(Integer.valueOf(data.get(0)));   //视频 要改的
//                            xuexizujiEntity.setYonghuId(Integer.valueOf(data.get(0)));   //用户 要改的
//                            xuexizujiEntity.setXuexizujiTime(sdf.parse(data.get(0)));          //开始时间 要改的
//                            xuexizujiEntity.setXuexizujiTypes(Integer.valueOf(data.get(0)));   //学习状态 要改的
//                            xuexizujiEntity.setInsertTime(date);//时间
//                            xuexizujiEntity.setCreateTime(date);//时间
                            xuexizujiList.add(xuexizujiEntity);

                            //把要查询是否重复的字段放入map中
                        }

                        //查询是否重复
                        xuexizujiService.insertBatch(xuexizujiList);
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
