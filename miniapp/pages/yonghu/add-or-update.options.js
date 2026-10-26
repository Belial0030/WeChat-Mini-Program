import createState from './add-or-update.state.js';
import pageActions from './add-or-update.actions.js';
import viewStyles from './add-or-update.inline-styles.js';

import wPicker from '@/components/w-picker/w-picker.vue';

export default {
    data: createState,
    components: {
        wPicker,
    },
    computed: {
        viewStyles() {
            return viewStyles;
        },
        baseUrl() {
            return this.$base.url;
        },
    },
    async onLoad(options) {
        /*下拉框*/
        let sexTypesParams = {
            page: 1,
            limit: 100,
            dicCode: 'sex_types',
        };
        let sexTypes = await this.$api.page(`dictionary`, sexTypesParams);
        this.sexTypesOptions = sexTypes.data.list;

        // 如果是更新操作
        if (options.id) {
            this.ruleForm.id = options.id;
            // 获取信息
            let res = await this.$api.info(`yonghu`, this.ruleForm.id);
            this.ruleForm = res.data;
        }
        if (options.yonghuId) {
            this.ruleForm.yonghuId = options.yonghuId;
        }
        // 跨表
        // this.styleChange()
    },
    methods: {
        sexTypesChange: pageActions.sexTypesChange,
        yonghuPhotoTap: pageActions.yonghuPhotoTap,
        createTimeConfirm: pageActions.createTimeConfirm,
        getUUID: pageActions.getUUID,
        onSubmitTap: pageActions.onSubmitTap,
        getDate: pageActions.getDate,
        toggleTab: pageActions.toggleTab,
    },
};
