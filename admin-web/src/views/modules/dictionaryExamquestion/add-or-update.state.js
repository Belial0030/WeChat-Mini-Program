export default function data() {
    let self = this;
    return {
        addEditForm: null,
        id: '',
        type: '',
        ro: {
            codeIndex: true,
            indexName: false,
            superId: false,
            beizhu: false,
        },
        ruleForm: {
            codeIndex: '',
            indexName: '',
            superId: '',
            beizhu: '',
        },
        rules: {
            /*beizhu: [
                    { required: true, message: '备注不能为空', trigger: 'blur' },
                    {  pattern: /^[1-9]\d*$/,
                        message: '备注只能为正整数',
                        trigger: 'blur'
                    }
                ],*/
        },
    };
}
