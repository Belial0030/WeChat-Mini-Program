export default function data() {
    return {
        searchForm: {
            key: '',
        },
        sessionTable: '', //登录账户所在表名
        role: '', //权限
        userId: '', //当前登录人的id
        //级联表下拉框搜索条件
        shipinTypesSelectSearch: [],
        //当前表下拉框搜索条件
        xuexizujiTypesSelectSearch: [],
        form: {
            id: null,
            shipinId: null,
            yonghuId: null,
            xuexizujiTime: null,
            xuexizujiTypes: null,
            insertTime: null,
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
            视频标题: 'shipinName',
            视频照片: 'shipinPhoto',
            视频: 'shipinVideo',
            视频类型: 'shipinTypes',
            用户姓名: 'yonghuName',
            用户手机号: 'yonghuPhone',
            用户身份证号: 'yonghuIdNumber',
            用户头像: 'yonghuPhoto',
            学习时长: 'xuexiNumber',
            电子邮箱: 'yonghuEmail',
            //本表字段
            开始时间: 'xuexizujiTime',
            学习状态: 'xuexizujiValue',
            添加时间: 'insertTime',
        },
    };
}
