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
        examquestionTypesSelectSearch: [],
        form: {
            id: null,
            examquestionName: null,
            kemuTypes: null,
            examquestionOptions: null,
            examquestionAnswer: null,
            examquestionAnalysis: null,
            examquestionTypes: null,
            examquestionSequence: null,
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
            试题名称: 'examquestionName',
            科目: 'kemuTypes',
            '选项，json字符串': 'examquestionOptions',
            正确答案: 'examquestionAnswer',
            答案解析: 'examquestionAnalysis',
            试题类型: 'examquestionTypes',
        },
    };
}
