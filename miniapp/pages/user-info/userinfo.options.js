import pageActions from './userinfo.actions.js';
import viewStyles from './userinfo.inline-styles.js';

export default {
    data() {
        return {
            ruleForm: {},
            tableName: '',
            sexTypesOptions: [],
            sexTypesIndex: 0,
        };
    },
    computed: {
        viewStyles() {
            return viewStyles;
        },
        baseUrl() {
            return this.$base.url;
        },
    },
    async onLoad() {
        let table = uni.getStorageSync('nowTable');
        let res = await this.$api.session(table);
        this.ruleForm = res.data;
        this.tableName = table;
        // 自定义下拉框值

        if (this.tableName == 'yonghu') {
            let sex_typesParams = {
                page: 1,
                limit: 100,
                dicCode: 'sex_types',
            };
            let sex_typesRes = await this.$api.page(`dictionary`, sex_typesParams);

            this.sexTypesOptions = sex_typesRes.data.list;
        }
        // this.styleChange()
    },
    methods: {
        yonghusexTypesChange: pageActions.yonghusexTypesChange,
        createTimeConfirm: pageActions.createTimeConfirm,
        getUUID: pageActions.getUUID,
        logout: pageActions.logout,
        update: pageActions.update,
        yonghuPhotoTap: pageActions.yonghuPhotoTap,
        toggleTab: pageActions.toggleTab,
    },
};
