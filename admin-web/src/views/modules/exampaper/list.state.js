export default function data() {
    return {
        searchForm: {
            key: '',
        },
        sessionTable: '', //登录账户所在表名
        role: '', //权限
        userId: '', //当前登录人的id
        //级联表下拉框搜索条件
        //当前表下拉框搜索条件
        kemuTypesSelectSearch: [],
        exampaperTypesSelectSearch: [],
        form: {
            id: null,
            exampaperName: null,
            exampaperDate: null,
            exampaperMyscore: null,
            kemuTypes: null,
            exampaperTypes: null,
            exampaperDelete: null,
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
            //本表字段
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
        },
    };
}
