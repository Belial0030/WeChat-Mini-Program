export default function data() {
    return {
        show: true,
        //考试题目
        dataList: [],
        // 倒计时定时器
        inter: null,
        // 倒计时时间
        count: 0,
        //用户选择答案
        answerList: [],
        //试卷名称
        exampaperName: null,
        //试卷总分数
        exampaperMyscore: null,
        //用户信息
        user: {},
        table: null,
        //试卷表Id
        exampaperId: null,
    };
}
