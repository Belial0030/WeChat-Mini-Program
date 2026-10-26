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
        form: {
            id: null,
            forumName: null,
            yonghuId: null,
            usersId: null,
            forumContent: null,
            superIds: null,
            forumStateTypes: null,
            insertTime: null,
            updateTime: null,
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

        forumReplyDialogVisible: false, //论坛回复模态框
        forumReplyInfoDialogVisible: false, //论坛回复详情模态框
        superIds: '', //帖子id
        forumTitle: '', //帖子标题
        forumContent: '', //帖子内容
        forumReplyContent: '', //帖子回复内容
        forumReplyInfoContent: '', //帖子某个回复详情 全
        forumData: [], //论坛回复数据集合

        //导出excel
        json_fields: {
            //级联表字段
            用户姓名: 'yonghuName',
            用户手机号: 'yonghuPhone',
            用户身份证号: 'yonghuIdNumber',
            用户头像: 'yonghuPhoto',
            学习时长: 'xuexiNumber',
            电子邮箱: 'yonghuEmail',
            用户名: 'username',
            角色: 'role',
            新增时间: 'addtime',
            //本表字段
            帖子标题: 'forumName',
            父id: 'superIds',
            帖子状态: 'forumStateValue',
            发帖时间: 'insertTime',
            修改时间: 'updateTime',
        },
    };
}
