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
        // 如果是更新操作
        if (options.id) {
            this.ruleForm.id = options.id;
            // 获取信息
            let res = await this.$api.info(`exampapertopic`, this.ruleForm.id);
            this.ruleForm = res.data;
        }
        if (options.exampapertopicId) {
            this.ruleForm.exampapertopicId = options.exampapertopicId;
        }
        // 跨表
        // this.styleChange()
    },
    methods: {
        createTimeConfirm: pageActions.createTimeConfirm,
        getUUID: pageActions.getUUID,
        onSubmitTap: pageActions.onSubmitTap,
        getDate: pageActions.getDate,
        toggleTab: pageActions.toggleTab,
    },
};
