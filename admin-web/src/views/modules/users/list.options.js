import createState from './list.state.js';
import pagePresentation from '@/presentation/list';
import pageActions from './list.actions.js';

import AddOrUpdate from './add-or-update.vue';
import styleJs from '../../../utils/style.js';
export default {
    data: createState,
    created() {
        this.contents = styleJs.listStyle();
        this.init();
        this.getDataList();
        this.contentStyleChange();
    },
    mounted() {},
    filters: {
        htmlfilter: function (val) {
            return val.replace(/<[^>]*>/g).replace(/undefined/g, '');
        },
    },
    components: {
        AddOrUpdate,
    },
    methods: {
        contentStyleChange: pagePresentation.contentStyleChange,
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
    },
};
