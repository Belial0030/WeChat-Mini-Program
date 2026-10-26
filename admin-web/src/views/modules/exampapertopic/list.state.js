export default function data() {
    return {
        //试卷id
        exampaperId: null,
        //组卷类型
        zujuanTypes: null,
        // manualOrAutomatic: false, //手动自动组卷
        //自动选题设置题目数量 题目分数
        danNum: 0, //单选数量
        danFen: 0, //单选分数
        danXisting: 0, //现有数量
        duoNum: 0, //多选数量
        duoFen: 0, //多选分数
        duoXisting: 0, //现有数量
        panNum: 0, //判断数量
        panFen: 0, //判断分数
        panXisting: 0, //现有数量
        tianNum: 0, //填空数量
        tianFen: 0, //填空分数
        tianXisting: 0, //现有数量

        questionsTableVisible: false, //手动添加试题弹框
        questionsList: [], //试题数据集合
        //试题数据集合分页信息
        questionsPageIndex: 1,
        questionsPageSize: 10,
        questionsPageTotalPage: 0,
        //试题数据集合条件查询
        questionsSearchForm: {
            key: '',
        },
        //试题类型数据
        examquestionTypesSelectSearch: [],
        //总分数
        exampapertopicNumber: 0,

        searchForm: {
            key: '',
        },
        sessionTable: '', //登录账户所在表名
        role: '', //权限
        userId: '', //当前登录人的id
        //级联表下拉框搜索条件
        exampaperTypesSelectSearch: [],
        kemuTypesSelectSearch: [],
        //当前表下拉框搜索条件
        form: {
            id: null,
            exampaperId: null,
            examquestionId: null,
            exampapertopicNumber: null,
            createTime: null,
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        showFlag: true,
        sfshVisiable: false,
        shForm: {},
        
         //echarts的时间查询字段
        addOrUpdateFlag: false,
        contents: null,
        layouts: '',
        //导出excel
        json_fields: {
            //级联表字段
            试卷名称: 'exampaperName',
            '考试时长(分钟)': 'exampaperDate',
            试卷总分数: 'exampaperMyscore',
            科目: 'kemuTypes',
            单选题数量: 'danNum',
            单选题每题分数: 'danFen',
            多选题数量: 'duoNum',
            多选题每题分数: 'duoFen',
            判断题数量: 'panNum',
            判断题每题分数: 'panFen',
            填空题数量: 'tianNum',
            填空题每题分数: 'tianFen',
            试卷状态: 'exampaperTypes',
            试题名称: 'examquestionName',
            科目: 'kemuTypes',
            '选项，json字符串': 'examquestionOptions',
            正确答案: 'examquestionAnswer',
            答案解析: 'examquestionAnalysis',
            试题类型: 'examquestionTypes',
            //本表字段
            试题分数: 'exampapertopicNumber',
        },
    };
}
