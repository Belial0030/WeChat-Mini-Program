import createState from './list.state.js';
import pagePresentation from '@/presentation/list';
import pageActions from './list.actions.js';
import viewStyles from './list.inline-styles.js';

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
    mounted() {
        //获取当前登录用户的信息
        this.sessionTable = this.$storage.get('sessionTable');
        this.role = this.$storage.get('role');
        this.userId = this.$storage.get('userId');

        if (this.$route.query.exampaperId != null && this.$route.query.zujuanTypes != null) {
            this.exampaperId = this.$route.query.exampaperId;
            this.zujuanTypes = this.$route.query.zujuanTypes;
        }

        //查询现有全部试题
        this.selectQuestions();

        //填充下拉框选项
        this.$http({
            url: 'dictionary/page?dicCode=examquestion_types&page=1&limit=100',
            method: 'get',
        }).then(({ data }) => {
            if (data && data.code === 0) {
                this.examquestionTypesSelectSearch = data.data.list;
            }
        });
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
        questionsSizeChangeHandle: pageActions.questionsSizeChangeHandle,
        questionsCurrentChangeHandle: pageActions.questionsCurrentChangeHandle,
        questionsSearch: pageActions.questionsSearch,
        addshiti: pageActions.addshiti,
        selectQuestions: pageActions.selectQuestions,
        addQuestions: pageActions.addQuestions,
        deleteHandler: pageActions.deleteHandler,
        exampapertopicUploadSuccess: pageActions.exampapertopicUploadSuccess,
        exampapertopicUploadError: pageActions.exampapertopicUploadError,
    },
};
