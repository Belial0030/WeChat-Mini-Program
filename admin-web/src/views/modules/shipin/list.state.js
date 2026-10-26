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
        shipinTypesSelectSearch: [],
        form: {
            id: null,
            shipinName: null,
            shipinPhoto: null,
            shipinVideo: null,
            shipinTypes: null,
            shipinContent: null,
            insertTime: null,
            shipinDelete: null,
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
            视频标题: 'shipinName',
            视频照片: 'shipinPhoto',
            视频: 'shipinVideo',
            视频类型: 'shipinValue',
            添加时间: 'insertTime',
        },
    };
}
