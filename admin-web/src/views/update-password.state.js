export default function data() {
    return {
        dialogVisible: false,
        ruleForm: {},
        user: {},
        rules: {
            password: [
                {
                    required: true,
                    message: '密码不能为空',
                    trigger: 'blur',
                },
            ],
            newpassword: [
                {
                    required: true,
                    message: '新密码不能为空',
                    trigger: 'blur',
                },
            ],
            repassword: [
                {
                    required: true,
                    message: '确认密码不能为空',
                    trigger: 'blur',
                },
            ],
        },
    };
}
