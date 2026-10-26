package com.service.exam;

import com.alibaba.fastjson.JSON;
import com.entity.ExamrecordEntity;
import com.entity.ExamredetailsEntity;
import com.entity.ExamrewrongquestionEntity;
import com.entity.view.ExampapertopicView;
import com.service.ExampapertopicService;
import com.service.ExamrecordService;
import com.service.ExamredetailsService;
import com.service.ExamrewrongquestionService;
import com.utils.CommonUtil;
import com.utils.PageUtils;
import com.utils.R;
import com.utils.StringUtil;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 考试业务。
 */
@Service
public class ExamSubmissionService {
    @Autowired
    private ExampapertopicService exampapertopicService;

    @Autowired
    private ExamrecordService examrecordService;

    @Autowired
    private ExamredetailsService examredetailsService;

    @Autowired
    private ExamrewrongquestionService examrewrongquestionService;

    /** 保存考试记录、答题详情和错题。 */
    public R submitQuestions(Map<String, Object> params, HttpServletRequest request){
        //答题编号
        String uuid = String.valueOf(new Date().getTime());
        //答题用户
        Integer yonghuId = Integer.valueOf(String.valueOf(params.get("yonghuId")));
        //试卷id
        Integer exampaperId = Integer.valueOf(String.valueOf(params.get("exampaperId")));
        //考试记录表信息
        ExamrecordEntity examrecordEntity = new ExamrecordEntity();
        examrecordEntity.setExamrecordUuidNumber(uuid);
        examrecordEntity.setTotalScore(0);//总分数
        examrecordEntity.setExampaperId(exampaperId);//试卷id
        examrecordEntity.setYonghuId(yonghuId);//考试用户
        examrecordEntity.setInsertTime(new Date());//时间
        examrecordEntity.setCreateTime(new Date());//时间
        //答题信息
        List<Map<String,String>> answerList = (List<Map<String,String>>)JSON.parse(String.valueOf(params.get("answerList")));
        //答题map
        HashMap<String, String> answerMap = new HashMap<>();
        for (Map<String,String> map:answerList) {
            answerMap.put(map.get("examquestionId"),map.get("answer"));
        }
        //试题信息
        HashMap<String, Object> map = new HashMap<>();
        map.put("limit","9999");
        map.put("exampaperId", exampaperId);
        CommonUtil.checkMap(map);
        PageUtils page = exampapertopicService.queryPage(map);
        List<ExampapertopicView> exampapertopicList =(List<ExampapertopicView>)page.getList();

        //答题详情
        List<ExamredetailsEntity> examredetailsList = new ArrayList<>();
        //错题详情
        List<ExamrewrongquestionEntity> examrewrongquestionList = new ArrayList<>();

        if(exampapertopicList != null && exampapertopicList.size()>0){
            boolean insert = examrecordService.insert(examrecordEntity);
            if(!insert){
                return R.error();
            }
        }
        //判断用户的答案
        for (ExampapertopicView exampapertopic:exampapertopicList) {
            boolean cuoti = false;
            //答题信息
            ExamredetailsEntity examredetailsEntity = new ExamredetailsEntity();
                //答题数据补充
                examredetailsEntity.setExamredetailsUuidNumber(uuid);
                examredetailsEntity.setYonghuId(yonghuId);
                examredetailsEntity.setExamquestionId(exampapertopic.getExamquestionId());
                examredetailsEntity.setCreateTime(new Date());
                //错题信息
                ExamrewrongquestionEntity examrewrongquestionEntity = new ExamrewrongquestionEntity();
                examrewrongquestionEntity.setYonghuId(yonghuId);
                examrewrongquestionEntity.setInsertTime(new Date());
                examrewrongquestionEntity.setCreateTime(new Date());
                examrewrongquestionEntity.setExampaperId(exampaperId);
                examrewrongquestionEntity.setExamquestionId(exampapertopic.getExamquestionId());
            //判断是否答题
            if(StringUtil.isNotEmpty(answerMap.get(exampapertopic.getExamquestionId()))){
                examredetailsEntity.setExamredetailsMyanswer(answerMap.get(exampapertopic.getExamquestionId()));
                examrewrongquestionEntity.setExamredetailsMyanswer(answerMap.get(exampapertopic.getExamquestionId()));
                //多选题判断对错
                if(exampapertopic.getExamquestionTypes() == 2){
                    //正确答案
                    List<String> split = Arrays.asList(exampapertopic.getExamquestionAnswer().split(","));
                    ArrayList<String> splitLs = new ArrayList<>();
                    splitLs.addAll(split);
                    //用户答案
                    List<String> answer = Arrays.asList(answerMap.get(exampapertopic.getExamquestionId()).split(","));
                    List<String> answerLs = new ArrayList<>();
                    answerLs.addAll(answer);
                    //判断用户是否回答正确
                    if(splitLs.size() == answerLs.size()){//判断用户回答信息的长度是否正确答案的长度一样
                        splitLs.retainAll(answerLs);
                        if(splitLs.size() == answerLs.size()){//判断内容是否正确
                            examrecordEntity.setTotalScore(examrecordEntity.getTotalScore()+exampapertopic.getExampapertopicNumber());
                            examredetailsEntity.setExamredetailsMyscore(exampapertopic.getExampapertopicNumber());
                        }else{//错误
                            cuoti = true;
                            examredetailsEntity.setExamredetailsMyscore(0);
                        }
                    }else{//错误
                        cuoti = true;
                        examredetailsEntity.setExamredetailsMyscore(0);
                    }
                }else{
                    //其他题判断对错
                    if(answerMap.get(exampapertopic.getExamquestionId()).equals(exampapertopic.getExamquestionAnswer())){//正确
                        examredetailsEntity.setExamredetailsMyscore(exampapertopic.getExampapertopicNumber());
                        examrecordEntity.setTotalScore(examrecordEntity.getTotalScore()+exampapertopic.getExampapertopicNumber());
                    }else{//错误
                        cuoti = true;
                        examredetailsEntity.setExamredetailsMyscore(0);
                    }
                }
            }else{//未作答
                cuoti = true;
                examrewrongquestionEntity.setExamredetailsMyanswer("未作答");
                examredetailsEntity.setExamredetailsMyanswer("未作答");
                examredetailsEntity.setExamredetailsMyscore(0);
            }
            if(cuoti){
                examrewrongquestionList.add(examrewrongquestionEntity);
                cuoti = false;
            }
            examredetailsList.add(examredetailsEntity);
        }

        examredetailsService.insertBatch(examredetailsList);
        examrewrongquestionService.insertBatch(examrewrongquestionList);
        examrecordService.updateById(examrecordEntity);
        return R.ok();
    }

}
