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
        sexTypesSelectSearch: [],
        form: {
            id: null,
            username: null,
            password: null,
            yonghuName: null,
            yonghuPhone: null,
            yonghuIdNumber: null,
            yonghuPhoto: null,
            sexTypes: null,
            xuexiNumber: null,
            yonghuEmail: null,
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
            账户: 'username',
            用户姓名: 'yonghuName',
            用户手机号: 'yonghuPhone',
            用户身份证号: 'yonghuIdNumber',
            用户头像: 'yonghuPhoto',
            性别: 'sexValue',
            学习时长: 'xuexiNumber',
            电子邮箱: 'yonghuEmail',
        },
    };
}
