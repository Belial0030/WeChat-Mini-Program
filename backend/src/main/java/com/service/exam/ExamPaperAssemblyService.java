package com.service.exam;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.entity.ExampaperEntity;
import com.entity.ExampapertopicEntity;
import com.entity.ExamquestionEntity;
import com.service.ExampaperService;
import com.service.ExampapertopicService;
import com.service.ExamquestionService;
import com.utils.R;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Random;
import javax.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 考试业务。
 */
@Service
public class ExamPaperAssemblyService {
    private static final Logger logger = LoggerFactory.getLogger("com.controller.ExampapertopicController");

    @Autowired
    private ExampapertopicService exampapertopicService;

    @Autowired
    private ExampaperService exampaperService;

    @Autowired
    private ExamquestionService examquestionService;

    /** 更新选题并同步试卷总分。 */
    public R examinationUpdate(ExampapertopicEntity exampapertopic, HttpServletRequest request){

        String role = String.valueOf(request.getSession().getAttribute("role"));

        //根据字段查询是否有相同数据
        Wrapper<ExampapertopicEntity> queryWrapper = new EntityWrapper<ExampapertopicEntity>()
            .notIn("id",exampapertopic.getId())
            .andNew()
            .eq("exampaper_id", exampapertopic.getExampaperId())
            .eq("examquestion_id", exampapertopic.getExamquestionId())
            .eq("exampapertopic_number", exampapertopic.getExampapertopicNumber())
            ;
        logger.info("sql语句:"+queryWrapper.getSqlSegment());
        ExampapertopicEntity exampapertopicEntity = exampapertopicService.selectOne(queryWrapper);
        if(exampapertopicEntity==null){
            ExampapertopicEntity exampapertopicEntity1 = exampapertopicService.selectById(exampapertopic.getId());
            if(exampapertopic.getExampaperId() == null){
              return R.error("修改时数据未获取到");
            }
            if(exampapertopicEntity1.getExampapertopicNumber()!=exampapertopic.getExampapertopicNumber()){
                ExampaperEntity exampaperEntity = exampaperService.selectById(exampapertopic.getExampaperId());
                exampaperEntity.setExampaperMyscore((exampaperEntity.getExampaperMyscore()-exampapertopicEntity1.getExampapertopicNumber())+exampapertopic.getExampapertopicNumber());
                exampaperService.updateById(exampaperEntity);
            }
            exampapertopicService.updateById(exampapertopic);//根据id更新
            return R.ok();
        }else {
            return R.error(511,"表中有相同数据");
        }
    }

    /** 删除选题并同步试卷总分。 */
    public R examinationDelete(Integer[] ids){
        List<ExampapertopicEntity> exampapertopicEntities = exampapertopicService.selectBatchIds(Arrays.asList(ids));
        ExampaperEntity exampaperEntity1 = exampaperService.selectById(exampapertopicEntities.get(0).getExampaperId());
        for (ExampapertopicEntity topic:exampapertopicEntities) {
            exampaperEntity1.setExampaperMyscore(exampaperEntity1.getExampaperMyscore()-topic.getExampapertopicNumber());
        }
        exampaperService.updateById(exampaperEntity1);
        exampapertopicService.deleteBatchIds(Arrays.asList(ids));
        return R.ok();
    }

    /** 按现有配置自动组卷。 */
    public R zidongzujuan(Map<String, Object> params, HttpServletRequest request){
        //试卷科目
        Integer kemuTypes = Integer.valueOf(String.valueOf(params.get("kemuTypes")));
        //试卷数据信息
        ExampaperEntity exampaperEntity = new ExampaperEntity();
        exampaperEntity.setId(Integer.valueOf(String.valueOf(params.get("exampaperId"))));
        exampaperEntity.setExampaperMyscore(0);
        //单选数量和分数
        Integer danNum = Integer.valueOf(String.valueOf(params.get("danNum")));
        Integer danFen = Integer.valueOf(String.valueOf(params.get("danFen")));
        ArrayList<ExamquestionEntity> danList = new ArrayList<>();
        //多选数量和分数
        Integer duoNum = Integer.valueOf(String.valueOf(params.get("duoNum")));
        Integer duoFen = Integer.valueOf(String.valueOf(params.get("duoFen")));
        ArrayList<ExamquestionEntity> duoList = new ArrayList<>();
        //判断数量和分数
        Integer panNum = Integer.valueOf(String.valueOf(params.get("panNum")));
        Integer panFen = Integer.valueOf(String.valueOf(params.get("panFen")));
        ArrayList<ExamquestionEntity> panList = new ArrayList<>();
        //填空数量和分数
        Integer tianNum = Integer.valueOf(String.valueOf(params.get("tianNum")));
        Integer tianFen = Integer.valueOf(String.valueOf(params.get("tianFen")));
        ArrayList<ExamquestionEntity> tianList = new ArrayList<>();
        //存储已经筛选的数据
        ArrayList<ExampapertopicEntity> exampapertopicEntities = new ArrayList<>();
        //随机数
        Random random = new Random();

        //查询全部试题信息
        Wrapper<ExamquestionEntity> queryWrapper = new EntityWrapper<ExamquestionEntity>().eq("kemu_types", kemuTypes);
        logger.info("sql语句:"+queryWrapper.getSqlSegment());
        List<ExamquestionEntity> exampapertopicLists = examquestionService.selectList(null);
        for (ExamquestionEntity examquestion: exampapertopicLists) {
            //将对应类型数据放入对应的list集合中
            if(examquestion.getExamquestionTypes() == 1){//单选题
                danList.add(examquestion);
            }else if(examquestion.getExamquestionTypes() == 2){//多选题
                duoList.add(examquestion);
            }else if(examquestion.getExamquestionTypes() == 3){//判断题
                panList.add(examquestion);
            }else{//填空题
                tianList.add(examquestion);
            }
        }

        //判断前台传来的题数值是否为空
        if(danNum!=null && danNum>0 && danFen != null && danFen >0){//单选
            if(danList.size()<danNum)
                return R.error("单选题数量"+danNum+"超过数据库中存在的最大数量"+danList.size());
            for (int i = 0 ;i<danNum;i++){
                ExampapertopicEntity exampapertopicEntity = new ExampapertopicEntity();
                int intRandom = random.nextInt(danList.size());
                exampaperEntity.setExampaperMyscore(exampaperEntity.getExampaperMyscore()+danFen);
                exampapertopicEntity.setExamquestionId(danList.get(intRandom).getId());
                exampapertopicEntity.setExampapertopicNumber(danFen);
                exampapertopicEntity.setExampaperId(exampaperEntity.getId());
                exampapertopicEntities.add(exampapertopicEntity);
                danList.remove(intRandom);
            }
        }
        if(duoNum!=null && duoNum>0 && duoFen != null && duoFen >0){//多选
            if(duoList.size()<duoNum)
                return R.error("多选题数量"+duoNum+"超过数据库中存在的最大数量"+duoList.size());
            for (int i = 0 ;i<duoNum;i++){
                ExampapertopicEntity exampapertopicEntity = new ExampapertopicEntity();
                int intRandom = random.nextInt(duoList.size() );
                exampaperEntity.setExampaperMyscore(exampaperEntity.getExampaperMyscore()+duoFen);
                exampapertopicEntity.setExamquestionId(duoList.get(intRandom).getId());
                exampapertopicEntity.setExampapertopicNumber(duoFen);
                exampapertopicEntity.setExampaperId(exampaperEntity.getId());
                exampapertopicEntities.add(exampapertopicEntity);
                duoList.remove(intRandom);
            }
        }
        if(panNum!=null && panNum>0 && panFen != null && panFen >0){//判断
            if(panList.size()<panNum)
                return R.error("判断题数量"+panNum+"超过数据库中存在的最大数量"+panList.size());
            for (int i = 0 ;i<panNum;i++){
                ExampapertopicEntity exampapertopicEntity = new ExampapertopicEntity();
                int intRandom = random.nextInt(panList.size());
                exampaperEntity.setExampaperMyscore(exampaperEntity.getExampaperMyscore()+panFen);
                exampapertopicEntity.setExamquestionId(panList.get(intRandom).getId());
                exampapertopicEntity.setExampapertopicNumber(panFen);
                exampapertopicEntity.setExampaperId(exampaperEntity.getId());
                exampapertopicEntities.add(exampapertopicEntity);
                panList.remove(intRandom);
            }
        }
        if(tianNum!=null && tianNum>0 && tianFen != null && tianFen >0){//填空
            if(tianList.size()<tianNum)
                return R.error("填空题数量"+tianNum+"超过数据库中存在的最大数量"+tianList.size());
            for (int i = 0 ;i<tianNum;i++){
                ExampapertopicEntity exampapertopicEntity = new ExampapertopicEntity();
                int intRandom = random.nextInt(tianList.size());
                exampaperEntity.setExampaperMyscore(exampaperEntity.getExampaperMyscore()+tianFen);
                exampapertopicEntity.setExamquestionId(tianList.get(intRandom).getId());
                exampapertopicEntity.setExampapertopicNumber(tianFen);
                exampapertopicEntity.setExampaperId(exampaperEntity.getId());
                exampapertopicEntities.add(exampapertopicEntity);
                tianList.remove(intRandom);
            }
        }

        exampaperService.updateById(exampaperEntity);
        exampapertopicService.insertBatch(exampapertopicEntities);
        return R.ok();
    }

    /** 计算试卷题目总分。 */
    public R sumExampapertopicNumber(Integer exampaperId, HttpServletRequest request){
        if(exampaperId==null || exampaperId<=0)
            return R.error("试卷id不能为空");
        List<ExampapertopicEntity> list = exampapertopicService.selectList(
            new EntityWrapper<ExampapertopicEntity>()
                .eq("exampaper_id", exampaperId)
        );
        Integer exampapertopicNumber=0;
        if(!(list == null || list.size()==0)){
            for(ExampapertopicEntity exampapertopicEntity:list){
                exampapertopicNumber=exampapertopicNumber+exampapertopicEntity.getExampapertopicNumber();
            }
        }
        return R.ok().put("exampapertopicNumber",exampapertopicNumber);
    }

}
