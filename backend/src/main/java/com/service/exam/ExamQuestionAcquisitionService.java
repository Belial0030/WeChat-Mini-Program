package com.service.exam;

import com.entity.ExampapertopicEntity;
import com.entity.ExamquestionEntity;
import com.entity.view.ExampapertopicView;
import com.service.DictionaryService;
import com.service.ExampapertopicService;
import com.service.ExamquestionService;
import com.utils.CommonUtil;
import com.utils.PageUtils;
import com.utils.R;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 考试业务。
 */
@Service
public class ExamQuestionAcquisitionService {
    @Autowired
    private ExampapertopicService exampapertopicService;

    @Autowired
    private DictionaryService dictionaryService;

    @Autowired
    private ExamquestionService examquestionService;

    /** 读取并转换试卷题目。 */
    public R questionAcquisition(Integer exampaperId, HttpServletRequest request){
        //获取当前试卷的选题信息
        HashMap<String, Object> params = new HashMap<>();
        params.put("limit","9999");
        params.put("exampaperId", exampaperId);
        CommonUtil.checkMap(params);
        PageUtils page = exampapertopicService.queryPage(params);
        List<ExampapertopicView> exampapertopicView =(List<ExampapertopicView>)page.getList();

        //试题id存放list
        List<Integer> exampapertopicId = new ArrayList<>();
        //循环选题信息获取试题id并存放起来
        for (ExampapertopicEntity papertopic:exampapertopicView) {
            exampapertopicId.add(papertopic.getExamquestionId());
        }
        //查询试题数据
        List<ExamquestionEntity> examquestionEntity = examquestionService.selectBatchIds(exampapertopicId);
        //试题数据存放到选题view中
        examquestionEntity.forEach(item -> {
            BeanUtils.copyProperties(item, exampapertopicView);
        });
        //字典表数据转换
        for(ExampapertopicView c:exampapertopicView){
            //修改对应字典表字段
            dictionaryService.dictionaryConvert(c, request);
        }
        return R.ok().put("data",exampapertopicView);
    }

}
