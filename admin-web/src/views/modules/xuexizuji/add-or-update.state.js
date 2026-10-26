export default function data() {
    return {
        addEditForm: null,
        id: '',
        type: '',
        sessionTable: '', //登录账户所在表名
        role: '', //权限
        userId: '', //当前登录人的id
        shipinForm: {},
        yonghuForm: {},
        ro: {
            shipinId: false,
            yonghuId: false,
            xuexizujiTime: false,
            xuexizujiTypes: false,
            insertTime: false,
        },
        ruleForm: {
            shipinId: '',
            yonghuId: '',
            xuexizujiTime: '',
            xuexizujiTypes: '',
            insertTime: '',
        },
        xuexizujiTypesOptions: [],
        shipinOptions: [],
        yonghuOptions: [],
        rules: {
            shipinId: [
                { required: true, message: '视频不能为空', trigger: 'blur' },
                { pattern: /^[0-9]*$/, message: '只允许输入整数', trigger: 'blur' },
            ],
            yonghuId: [
                { required: true, message: '用户不能为空', trigger: 'blur' },
                { pattern: /^[0-9]*$/, message: '只允许输入整数', trigger: 'blur' },
            ],
            xuexizujiTime: [{ required: true, message: '开始时间不能为空', trigger: 'blur' }],
            xuexizujiTypes: [
                { required: true, message: '学习状态不能为空', trigger: 'blur' },
                { pattern: /^[0-9]*$/, message: '只允许输入整数', trigger: 'blur' },
            ],
            insertTime: [{ required: true, message: '添加时间不能为空', trigger: 'blur' }],
        },
    };
}
