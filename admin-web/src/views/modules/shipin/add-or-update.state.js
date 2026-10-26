export default function data() {
    return {
        addEditForm: null,
        id: '',
        type: '',
        sessionTable: '', //登录账户所在表名
        role: '', //权限
        userId: '', //当前登录人的id
        ro: {
            shipinName: false,
            shipinPhoto: false,
            shipinVideo: false,
            shipinTypes: false,
            shipinContent: false,
            insertTime: false,
            shipinDelete: false,
        },
        ruleForm: {
            shipinName: '',
            shipinPhoto: '',
            shipinVideo: '',
            shipinTypes: '',
            shipinContent: '',
            insertTime: '',
            shipinDelete: '',
        },
        shipinTypesOptions: [],
        rules: {
            shipinName: [{ required: true, message: '视频标题不能为空', trigger: 'blur' }],
            shipinPhoto: [{ required: true, message: '视频照片不能为空', trigger: 'blur' }],
            shipinVideo: [{ required: true, message: '视频不能为空', trigger: 'blur' }],
            shipinTypes: [
                { required: true, message: '视频类型不能为空', trigger: 'blur' },
                { pattern: /^[0-9]*$/, message: '只允许输入整数', trigger: 'blur' },
            ],
            shipinContent: [{ required: true, message: '视频详情不能为空', trigger: 'blur' }],
            insertTime: [{ required: true, message: '添加时间不能为空', trigger: 'blur' }],
            shipinDelete: [
                { required: true, message: '逻辑删除不能为空', trigger: 'blur' },
                { pattern: /^[0-9]*$/, message: '只允许输入整数', trigger: 'blur' },
            ],
        },
    };
}
