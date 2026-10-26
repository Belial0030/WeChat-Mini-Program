package com.service.importing;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.entity.YonghuEntity;
import com.service.YonghuService;
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
public class YonghuImportService {
    @Autowired
    private YonghuService yonghuService;

    /** 批量导入。 */
    public R save( String fileName, HttpServletRequest request){
        Integer yonghuId = Integer.valueOf(String.valueOf(request.getSession().getAttribute("userId")));
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        try {
            List<YonghuEntity> yonghuList = new ArrayList<>();//上传的东西
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
                            YonghuEntity yonghuEntity = new YonghuEntity();
//                            yonghuEntity.setUsername(data.get(0));                    //账户 要改的
//                            //yonghuEntity.setPassword("123456");//密码
//                            yonghuEntity.setYonghuName(data.get(0));                    //用户姓名 要改的
//                            yonghuEntity.setYonghuPhone(data.get(0));                    //用户手机号 要改的
//                            yonghuEntity.setYonghuIdNumber(data.get(0));                    //用户身份证号 要改的
//                            yonghuEntity.setYonghuPhoto("");//详情和图片
//                            yonghuEntity.setSexTypes(Integer.valueOf(data.get(0)));   //性别 要改的
//                            yonghuEntity.setXuexiNumber(Integer.valueOf(data.get(0)));   //学习时长 要改的
//                            yonghuEntity.setYonghuEmail(data.get(0));                    //电子邮箱 要改的
//                            yonghuEntity.setCreateTime(date);//时间
                            yonghuList.add(yonghuEntity);

                            //把要查询是否重复的字段放入map中
                                //账户
                                if(seachFields.containsKey("username")){
                                    List<String> username = seachFields.get("username");
                                    username.add(data.get(0));//要改的
                                }else{
                                    List<String> username = new ArrayList<>();
                                    username.add(data.get(0));//要改的
                                    seachFields.put("username",username);
                                }
                                //用户手机号
                                if(seachFields.containsKey("yonghuPhone")){
                                    List<String> yonghuPhone = seachFields.get("yonghuPhone");
                                    yonghuPhone.add(data.get(0));//要改的
                                }else{
                                    List<String> yonghuPhone = new ArrayList<>();
                                    yonghuPhone.add(data.get(0));//要改的
                                    seachFields.put("yonghuPhone",yonghuPhone);
                                }
                                //用户身份证号
                                if(seachFields.containsKey("yonghuIdNumber")){
                                    List<String> yonghuIdNumber = seachFields.get("yonghuIdNumber");
                                    yonghuIdNumber.add(data.get(0));//要改的
                                }else{
                                    List<String> yonghuIdNumber = new ArrayList<>();
                                    yonghuIdNumber.add(data.get(0));//要改的
                                    seachFields.put("yonghuIdNumber",yonghuIdNumber);
                                }
                        }

                        //查询是否重复
                         //账户
                        List<YonghuEntity> yonghuEntities_username = yonghuService.selectList(new EntityWrapper<YonghuEntity>().in("username", seachFields.get("username")));
                        if(yonghuEntities_username.size() >0 ){
                            ArrayList<String> repeatFields = new ArrayList<>();
                            for(YonghuEntity s:yonghuEntities_username){
                                repeatFields.add(s.getUsername());
                            }
                            return R.error(511,"数据库的该表中的 [账户] 字段已经存在 存在数据为:"+repeatFields.toString());
                        }
                         //用户手机号
                        List<YonghuEntity> yonghuEntities_yonghuPhone = yonghuService.selectList(new EntityWrapper<YonghuEntity>().in("yonghu_phone", seachFields.get("yonghuPhone")));
                        if(yonghuEntities_yonghuPhone.size() >0 ){
                            ArrayList<String> repeatFields = new ArrayList<>();
                            for(YonghuEntity s:yonghuEntities_yonghuPhone){
                                repeatFields.add(s.getYonghuPhone());
                            }
                            return R.error(511,"数据库的该表中的 [用户手机号] 字段已经存在 存在数据为:"+repeatFields.toString());
                        }
                         //用户身份证号
                        List<YonghuEntity> yonghuEntities_yonghuIdNumber = yonghuService.selectList(new EntityWrapper<YonghuEntity>().in("yonghu_id_number", seachFields.get("yonghuIdNumber")));
                        if(yonghuEntities_yonghuIdNumber.size() >0 ){
                            ArrayList<String> repeatFields = new ArrayList<>();
                            for(YonghuEntity s:yonghuEntities_yonghuIdNumber){
                                repeatFields.add(s.getYonghuIdNumber());
                            }
                            return R.error(511,"数据库的该表中的 [用户身份证号] 字段已经存在 存在数据为:"+repeatFields.toString());
                        }
                        yonghuService.insertBatch(yonghuList);
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
