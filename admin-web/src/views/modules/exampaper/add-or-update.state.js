export default function data() {
    return {
        addEditForm: null,
        id: '',
        type: '',
        sessionTable: '', //登录账户所在表名
        role: '', //权限
        userId: '', //当前登录人的id
        ro: {
            exampaperName: false,
            exampaperDate: false,
            exampaperMyscore: true,
            kemuTypes: false,
            exampaperTypes: false,
            zujuanTypes: false,
            exampaperDelete: false,
        },
        ruleForm: {
            exampaperName: '',
            exampaperDate: '',
            exampaperMyscore: 0.0,
            kemuTypes: '',
            exampaperTypes: '',
            zujuanTypes: '',
            exampaperDelete: '',
        },
        kemuTypesOptions: [],
        exampaperTypesOptions: [],
        zujuanTypesOptions: [],
        rules: {
            exampaperName: [{ required: true, message: '试卷名称不能为空', trigger: 'blur' }],
            exampaperDate: [
                { required: true, message: '考试时长(分钟)不能为空', trigger: 'blur' },
                {
                    pattern: /^[0-9]*$/,
                    message: '只允许输入整数',
                    trigger: 'blur',
                },
            ],
            exampaperMyscore: [
                { required: true, message: '试卷总分数不能为空', trigger: 'blur' },
                {
                    pattern: /^[0-9]*$/,
                    message: '只允许输入整数',
                    trigger: 'blur',
                },
            ],
            kemuTypes: [
                { required: true, message: '科目不能为空', trigger: 'blur' },
                {
                    pattern: /^[0-9]*$/,
                    message: '只允许输入整数',
                    trigger: 'blur',
                },
            ],
            exampaperTypes: [
                { required: true, message: '试卷状态不能为空', trigger: 'blur' },
                {
                    pattern: /^[0-9]*$/,
                    message: '只允许输入整数',
                    trigger: 'blur',
                },
            ],
            zujuanTypes: [
                { required: true, message: '组卷方式不能为空', trigger: 'blur' },
                {
                    pattern: /^[0-9]*$/,
                    message: '只允许输入整数',
                    trigger: 'blur',
                },
            ],
            exampaperDelete: [
                {
                    required: true,
                    message: '逻辑删除（1代表未删除 2代表已删除）不能为空',
                    trigger: 'blur',
                },
                {
                    pattern: /^[0-9]*$/,
                    message: '只允许输入整数',
                    trigger: 'blur',
                },
            ],
        },
    };
}
