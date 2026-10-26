export default function data() {
    return {
        cross: '',
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
            createTime: false,
        },
        ruleForm: {
            username: '',
            password: '',
            yonghuName: '',
            yonghuPhone: '',
            yonghuIdNumber: '',
            yonghuPhoto: '',
            sexTypes: '', //数字
            sexValue: '', //数字对应的值
            xuexiNumber: '',
            yonghuEmail: '',
            createTime: '',
        },
        // 登陆用户信息
        user: {},
        sexTypesOptions: [],
        sexTypesIndex: 0,
    };
}
