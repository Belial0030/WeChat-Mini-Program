import createState from './list.state.js';
import pageActions from './list.actions.js';
import pagePresentation from '@/presentation/list';

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
        viewExamDetails: pageActions.viewExamDetails,
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
