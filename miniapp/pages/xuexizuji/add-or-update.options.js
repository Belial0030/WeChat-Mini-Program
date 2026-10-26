import createState from './add-or-update.state.js';
import pageActions from './add-or-update.actions.js';

import wPicker from '@/components/w-picker/w-picker.vue';

export default {
    data: createState,
    components: {
        wPicker,
    },
    computed: {
        baseUrl() {
            return this.$base.url;
        },
    },
    async onLoad(options) {
        /*下拉框*/
        let xuexizujiTypesParams = {
            page: 1,
            limit: 100,
            dicCode: 'xuexizuji_types',
        };
        let xuexizujiTypes = await this.$api.page(`dictionary`, xuexizujiTypesParams);
        this.xuexizujiTypesOptions = xuexizujiTypes.data.list;

        // 如果是更新操作
        if (options.id) {
            this.ruleForm.id = options.id;
            // 获取信息
            let res = await this.$api.info(`xuexizuji`, this.ruleForm.id);
            this.ruleForm = res.data;
        }
        if (options.xuexizujiId) {
            this.ruleForm.xuexizujiId = options.xuexizujiId;
        }
        // 跨表
        // this.styleChange()
    },
    methods: {
        xuexizujiTypesChange: pageActions.xuexizujiTypesChange,
        xuexizujiTimeConfirm: pageActions.xuexizujiTimeConfirm,
        insertTimeConfirm: pageActions.insertTimeConfirm,
        createTimeConfirm: pageActions.createTimeConfirm,
        getUUID: pageActions.getUUID,
        onSubmitTap: pageActions.onSubmitTap,
        getDate: pageActions.getDate,
        toggleTab: pageActions.toggleTab,
    },
};
