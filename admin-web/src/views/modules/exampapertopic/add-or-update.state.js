export default function data() {
    return {
        //选项
        options: [],
        addEditForm: null,
        id: '',
        type: '',
        sessionTable: '', //登录账户所在表名
        role: '', //权限
        userId: '', //当前登录人的id
        exampaperForm: {},
        examquestionForm: {},
        ro: {
            exampaperId: false,
            examquestionId: false,
            exampapertopicNumber: false,
        },
        ruleForm: {
            exampaperId: '',
            examquestionId: '',
            exampapertopicNumber: '',
        },
        exampaperOptions: [],
        examquestionOptions: [],
        rules: {
            exampaperId: [
                {
                    required: true,
                    message: '试卷不能为空',
                    trigger: 'blur',
                },
                {
                    pattern: /^[0-9]*$/,
                    message: '只允许输入整数',
                    trigger: 'blur',
                },
            ],
            examquestionId: [
                {
                    required: true,
                    message: '试题不能为空',
                    trigger: 'blur',
                },
                {
                    pattern: /^[0-9]*$/,
                    message: '只允许输入整数',
                    trigger: 'blur',
                },
            ],
            exampapertopicNumber: [
                {
                    required: true,
                    message: '试题分数不能为空',
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
