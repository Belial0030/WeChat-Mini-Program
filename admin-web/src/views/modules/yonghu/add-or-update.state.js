export default function data() {
    return {
        addEditForm: null,
        id: '',
        type: '',
        sessionTable: '', //登录账户所在表名
        role: '', //权限
        userId: '', //当前登录人的id
        ro: {
            username: false,
            password: false,
            yonghuName: false,
            yonghuPhone: false,
            yonghuIdNumber: false,
            yonghuPhoto: false,
            sexTypes: false,
            xuexiNumber: false,
            yonghuEmail: false,
        },
        ruleForm: {
            username: '',
            password: '',
            yonghuName: '',
            yonghuPhone: '',
            yonghuIdNumber: '',
            yonghuPhoto: '',
            sexTypes: '',
            xuexiNumber: '',
            yonghuEmail: '',
        },
        sexTypesOptions: [],
        rules: {
            username: [{ required: true, message: '账户不能为空', trigger: 'blur' }],
            password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
            yonghuName: [{ required: true, message: '用户姓名不能为空', trigger: 'blur' }],
            yonghuPhone: [
                { required: true, message: '用户手机号不能为空', trigger: 'blur' },
                {
                    pattern:
                        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
                    message: '用户手机号格式不对',
                    trigger: 'blur',
                },
            ],
            yonghuIdNumber: [
                { required: true, message: '用户身份证号不能为空', trigger: 'blur' },
                {
                    pattern:
                        /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
                    message: '用户身份证号格式有误！',
                    trigger: 'blur',
                },
            ],
            yonghuPhoto: [{ required: true, message: '用户头像不能为空', trigger: 'blur' }],
            sexTypes: [
                { required: true, message: '性别不能为空', trigger: 'blur' },
                { pattern: /^[0-9]*$/, message: '只允许输入整数', trigger: 'blur' },
            ],
            xuexiNumber: [
                { required: true, message: '学习时长不能为空', trigger: 'blur' },
                { pattern: /^[0-9]*$/, message: '只允许输入整数', trigger: 'blur' },
            ],
            yonghuEmail: [
                { required: true, message: '电子邮箱不能为空', trigger: 'blur' },
                {
                    pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
                    message: '电子邮箱只能是邮箱格式',
                    trigger: 'blur',
                },
            ],
        },
    };
}
