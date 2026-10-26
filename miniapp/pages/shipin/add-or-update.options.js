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
        let shipinTypesParams = {
            page: 1,
            limit: 100,
            dicCode: 'shipin_types',
        };
        let shipinTypes = await this.$api.page(`dictionary`, shipinTypesParams);
        this.shipinTypesOptions = shipinTypes.data.list;

        // 如果是更新操作
        if (options.id) {
            this.ruleForm.id = options.id;
            // 获取信息
            let res = await this.$api.info(`shipin`, this.ruleForm.id);
            this.ruleForm = res.data;
        }
        if (options.shipinId) {
            this.ruleForm.shipinId = options.shipinId;
        }
        // 跨表
        // this.styleChange()
    },
    methods: {
        shipinTypesChange: pageActions.shipinTypesChange,
        shipinPhotoTap: pageActions.shipinPhotoTap,
        shipinVideoTap: pageActions.shipinVideoTap,
        insertTimeConfirm: pageActions.insertTimeConfirm,
        createTimeConfirm: pageActions.createTimeConfirm,
        getUUID: pageActions.getUUID,
        onSubmitTap: pageActions.onSubmitTap,
        getDate: pageActions.getDate,
        toggleTab: pageActions.toggleTab,
    },
};
