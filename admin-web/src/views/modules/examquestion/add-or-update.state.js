export default function data() {
    return {
        addEditForm: null,
        id: '',
        type: '',
        sessionTable: '', //登录账户所在表名
        role: '', //权限
        userId: '', //当前登录人的id

        //选项
        options: [],
        //选项 添加选项、删除选项 弹出框
        addOptionsDialogVisiable: false,
        //弹出框内输入的数据
        dialogForm: {},
        //弹出框验证输入信息
        dialogRules: {
            text: [
                {
                    required: true,
                    message: '请填写内容',
                    trigger: 'blur',
                },
            ],
            code: [
                {
                    required: true,
                    message: '请选择选项',
                    trigger: 'blur',
                },
            ],
        },
        exampaperForm: {},
        ro: {
            examquestionName: false,
            kemuTypes: false,
            examquestionOptions: false,
            examquestionAnswer: false,
            examquestionAnalysis: false,
            examquestionTypes: false,
            examquestionSequence: false,
        },
        ruleForm: {
            examquestionName: '',
            kemuTypes: '',
            examquestionOptions: '',
            examquestionAnswer: '',
            examquestionAnalysis: '',
            examquestionTypes: '',
            examquestionSequence: '',
        },
        kemuTypesOptions: [],
        examquestionTypesOptions: [],
        rules: {
            examquestionName: [
                {
                    required: true,
                    message: '试题名称不能为空',
                    trigger: 'blur',
                },
            ],
            kemuTypes: [
                {
                    required: true,
                    message: '科目不能为空',
                    trigger: 'blur',
                },
                {
                    pattern: /^[0-9]*$/,
                    message: '只允许输入整数',
                    trigger: 'blur',
                },
            ],
            examquestionOptions: [
                {
                    required: true,
                    message: '选项，json字符串不能为空',
                    trigger: 'blur',
                },
            ],
            examquestionAnswer: [
                {
                    required: true,
                    message: '正确答案不能为空',
                    trigger: 'blur',
                },
            ],
            examquestionAnalysis: [
                {
                    required: true,
                    message: '答案解析不能为空',
                    trigger: 'blur',
                },
            ],
            examquestionTypes: [
                {
                    required: true,
                    message: '试题类型不能为空',
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
