export default function data() {
    return {
        cross: '',
        ro: {
            shipinName: false,
            shipinPhoto: false,
            shipinVideo: false,
            shipinTypes: false,
            shipinContent: false,
            insertTime: false,
            shipinDelete: false,
            createTime: false,
        },
        ruleForm: {
            shipinName: '',
            shipinPhoto: '',
            shipinVideo: '',
            shipinTypes: '', //数字
            shipinValue: '', //数字对应的值
            shipinContent: '',
            insertTime: '',
            shipinDelete: '',
            createTime: '',
        },
        // 登陆用户信息
        user: {},
        shipinTypesOptions: [],
        shipinTypesIndex: 0,
    };
}
