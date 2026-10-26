import pageActions from './register.actions.js';
import pagePresentation from './register.presentation.js';

export default {
    data() {
        return {
            yonghusexTypesOptions: [],
            yonghusexTypesIndex: 0,
            ruleForm: {},
            tableName: '',
        };
    },
    async onLoad() {
        let res = [];
        let table = uni.getStorageSync('loginTable');
        this.tableName = table;

        // 自定义下拉框值
        if (this.tableName == 'yonghu') {
            let params = {
                page: 1,
                limit: 100,
                dicCode: 'sex_types',
            };
            let res = await this.$api.page(`dictionary`, params);
            this.yonghusexTypesOptions = res.data.list;
        }

        this.styleChange();
    },
    methods: {
        yonghusexTypesChange: pageActions.yonghusexTypesChange,
        styleChange: pagePresentation.styleChange,
        getUUID: pageActions.getUUID,
        register: pageActions.register,
    },
};
