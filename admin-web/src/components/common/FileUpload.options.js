import pageActions from './FileUpload.actions.js';
import viewStyles from './FileUpload.inline-styles.js';

import storage from '@/utils/storage';

export default {
    data() {
        return {
            // 查看大图
            dialogVisible: false,
            // 查看大图
            dialogImageUrl: '',
            // 组件渲染图片的数组字段，有特殊格式要求
            fileList: [],
            fileUrlList: [],
            myHeaders: {},
        };
    },
    props: ['tip', 'action', 'limit', 'multiple', 'fileUrls'],
    mounted() {
        this.init();
        this.myHeaders = {
            Token: storage.get('Token'),
        };
    },
    watch: {
        fileUrls: function (val, oldVal) {
            //   console.log("new: %s, old: %s", val, oldVal);
            this.init();
        },
    },
    computed: {
        viewStyles() {
            return viewStyles;
        },
        // 计算属性的 getter
        getActionUrl: function () {
            // return base.url + this.action + "?token=" + storage.get("token");
            return `/${this.$base.name}/` + this.action;
        },
    },
    methods: {
        init: pageActions.init,
        handleBeforeUpload: pageActions.handleBeforeUpload,
        handleUploadSuccess: pageActions.handleUploadSuccess,
        handleUploadErr: pageActions.handleUploadErr,
        handleRemove: pageActions.handleRemove,
        handleUploadPreview: pageActions.handleUploadPreview,
        handleExceed: pageActions.handleExceed,
        setFileList: pageActions.setFileList,
    },
};
