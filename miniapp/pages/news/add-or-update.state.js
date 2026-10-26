export default function data() {
    return {
        cross: '',
        ro: {
            newsName: false,
            newsTypes: false,
            newsPhoto: false,
            insertTime: false,
            newsContent: false,
            createTime: false,
        },
        ruleForm: {
            newsName: '',
            newsTypes: '', //数字
            newsValue: '', //数字对应的值
            newsPhoto: '',
            insertTime: '',
            newsContent: '',
            createTime: '',
        },
        // 登陆用户信息
        user: {},
        newsTypesOptions: [],
        newsTypesIndex: 0,
    };
}
