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
        newsTypesSelectSearch: [],
        form: {
            id: null,
            newsName: null,
            newsTypes: null,
            newsPhoto: null,
            insertTime: null,
            newsContent: null,
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
            公告信息标题: 'newsName',
            公告类型: 'newsValue',
            公告信息图片: 'newsPhoto',
            添加时间: 'insertTime',
        },
    };
}
