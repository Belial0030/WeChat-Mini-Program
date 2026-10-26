export default function data() {
    return {
        addEditForm: null,
        id: '',
        type: '',
        sessionTable: '', //登录账户所在表名
        role: '', //权限
        userId: '', //当前登录人的id
        ro: {
            newsName: false,
            newsTypes: false,
            newsPhoto: false,
            insertTime: false,
            newsContent: false,
        },
        ruleForm: {
            newsName: '',
            newsTypes: '',
            newsPhoto: '',
            insertTime: '',
            newsContent: '',
        },
        newsTypesOptions: [],
        rules: {
            newsName: [{ required: true, message: '公告信息标题不能为空', trigger: 'blur' }],
            newsTypes: [
                { required: true, message: '公告类型不能为空', trigger: 'blur' },
                { pattern: /^[0-9]*$/, message: '只允许输入整数', trigger: 'blur' },
            ],
            newsPhoto: [{ required: true, message: '公告信息图片不能为空', trigger: 'blur' }],
            insertTime: [{ required: true, message: '添加时间不能为空', trigger: 'blur' }],
            newsContent: [{ required: true, message: '公告信息详情不能为空', trigger: 'blur' }],
        },
    };
}
