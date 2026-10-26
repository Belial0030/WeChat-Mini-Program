import createState from './list.state.js';
import pagePresentation from '@/presentation/list';
import pageActions from './list.actions.js';
import viewStyles from './list.inline-styles.js';

import AddOrUpdate from './add-or-update';
import styleJs from '../../../utils/style.js';

export default {
    data: createState,
    created() {
        this.contents = styleJs.listStyle();
        this.init();
        this.getDataList();
        this.contentStyleChange();
    },
    mounted() {
        //获取当前登录用户的信息
        this.sessionTable = this.$storage.get('sessionTable');
        this.role = this.$storage.get('role');
        this.userId = this.$storage.get('userId');
    },
    filters: {
        htmlfilter: function (val) {
            return val.replace(/<[^>]*>/g).replace(/undefined/g, '');
        },
    },
    components: {
        AddOrUpdate,
    },
    computed: {
        viewStyles() {
            return viewStyles;
        },
        getActionUrl: function () {
            return `/` + this.$base.name + `/file/upload`;
        },
    },
    methods: {        contentStyleChange: pagePresentation.contentStyleChange,
        contentPageStyleChange: pagePresentation.contentPageStyleChange,
        init: pageActions.init,
        search: pageActions.search,
        getDataList: pageActions.getDataList,
        sizeChangeHandle: pageActions.sizeChangeHandle,
        currentChangeHandle: pageActions.currentChangeHandle,
        selectionChangeHandler: pageActions.selectionChangeHandler,
        addOrUpdateHandler: pageActions.addOrUpdateHandler,
        download: pageActions.download,
        deleteHandler: pageActions.deleteHandler,
        dictionaryUploadSuccess: pageActions.dictionaryUploadSuccess,
        dictionaryUploadError: pageActions.dictionaryUploadError,
    },
};
