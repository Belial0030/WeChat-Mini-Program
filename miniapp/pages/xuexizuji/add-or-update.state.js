export default function data() {
    return {
        cross: '',
        ro: {
            shipinId: false,
            yonghuId: false,
            xuexizujiTime: false,
            xuexizujiTypes: false,
            insertTime: false,
            createTime: false,
        },
        ruleForm: {
            shipinId: '',
            yonghuId: '',
            xuexizujiTime: '',
            xuexizujiTypes: '', //数字
            xuexizujiValue: '', //数字对应的值
            insertTime: '',
            createTime: '',
        },
        // 登陆用户信息
        user: {},
        xuexizujiTypesOptions: [],
        xuexizujiTypesIndex: 0,
    };
}
