export default function data() {
    return {
        addEditForm: null,
        id: '',
        type: '',
        sessionTable: '', //登录账户所在表名
        role: '', //权限
        userId: '', //当前登录人的id
        yonghuForm: {},
        ro: {
            forumName: false,
            yonghuId: false,
            usersId: false,
            forumContent: false,
            superIds: false,
            forumStateTypes: false,
            insertTime: false,
            updateTime: false,
        },
        ruleForm: {
            forumName: '',
            yonghuId: '',
            usersId: '',
            forumContent: '',
            superIds: '',
            forumStateTypes: 1,
            insertTime: '',
            updateTime: '',
        },
        forumStateTypesOptions: [],
        yonghuOptions: [],
        usersOptions: [],
        rules: {
            forumName: [{ required: true, message: '帖子标题不能为空', trigger: 'blur' }],
            yonghuId: [
                { required: true, message: '用户不能为空', trigger: 'blur' },
                { pattern: /^[0-9]*$/, message: '只允许输入整数', trigger: 'blur' },
            ],
            usersId: [
                { required: true, message: '管理员不能为空', trigger: 'blur' },
                { pattern: /^[0-9]*$/, message: '只允许输入整数', trigger: 'blur' },
            ],
            forumContent: [{ required: true, message: '发布内容不能为空', trigger: 'blur' }],
            superIds: [
                { required: true, message: '父id不能为空', trigger: 'blur' },
                { pattern: /^[0-9]*$/, message: '只允许输入整数', trigger: 'blur' },
            ],
            forumStateTypes: [
                { required: true, message: '帖子状态不能为空', trigger: 'blur' },
                { pattern: /^[0-9]*$/, message: '只允许输入整数', trigger: 'blur' },
            ],
            insertTime: [{ required: true, message: '发帖时间不能为空', trigger: 'blur' }],
            updateTime: [{ required: true, message: '修改时间不能为空', trigger: 'blur' }],
        },
    };
}
