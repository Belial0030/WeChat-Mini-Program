export default function data() {
    return {
        addEditForm: null,
        id: '',
        type: '',
        sessionTable: '', //登录账户所在表名
        role: '', //权限
        userId: '', //当前登录人的id
        ro: {
            dicCode: false,
            dicName: false,
            codeIndex: false,
            indexName: false,
            superId: false,
            beizhu: false,
        },
        ruleForm: {
            dicCode: '',
            dicName: '',
            codeIndex: '',
            indexName: '',
            superId: '',
            beizhu: '',
        },
        rules: {
            dicCode: [{ required: true, message: '字段不能为空', trigger: 'blur' }],
            dicName: [{ required: true, message: '字段名不能为空', trigger: 'blur' }],
            codeIndex: [
                { required: true, message: '编码不能为空', trigger: 'blur' },
                { pattern: /^[0-9]*$/, message: '只允许输入整数', trigger: 'blur' },
            ],
            indexName: [{ required: true, message: '编码名字不能为空', trigger: 'blur' }],
            superId: [
                { required: true, message: '父字段id不能为空', trigger: 'blur' },
                { pattern: /^[0-9]*$/, message: '只允许输入整数', trigger: 'blur' },
            ],
            beizhu: [{ required: true, message: '备注不能为空', trigger: 'blur' }],
        },
    };
}
