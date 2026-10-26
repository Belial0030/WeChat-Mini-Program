import createState from './add-or-update.state.js';
import pageActions from './add-or-update.actions.js';
import viewStyles from './add-or-update.inline-styles.js';

import styleJs from '../../../utils/style.js';
export default {
    data: createState,
    props: ['parent'],
    computed: {
        viewStyles() {
            return viewStyles;
        },
    },
    created() {
        //获取当前登录用户的信息
        this.sessionTable = this.$storage.get('sessionTable');
        this.role = this.$storage.get('role');
        this.userId = this.$storage.get('userId');

        this.addEditForm = styleJs.addStyle();
        //获取下拉框信息
        this.$http({
            url: `dictionary/page?page=1&limit=100&sort=&order=&dicCode=examquestion_types`,
            method: 'get',
        }).then(({ data }) => {
            if (data && data.code === 0) {
                this.examquestionTypesOptions = data.data.list;
            }
        });

        this.$http({
            url: `dictionary/page?page=1&limit=100&sort=&order=&dicCode=kemu_types`,
            method: 'get',
        }).then(({ data }) => {
            if (data && data.code === 0) {
                this.kemuTypesOptions = data.data.list;
            }
        });
    },
    methods: {
        addOptions: pageActions.addOptions,
        addOptionsDialog: pageActions.addOptionsDialog,
        deleteOptions: pageActions.deleteOptions,
        typeChange: pageActions.typeChange,
        download: pageActions.download,
        init: pageActions.init,
        exampaperChange: pageActions.exampaperChange,
        info: pageActions.info,
        onSubmit: pageActions.onSubmit,
        getUUID: pageActions.getUUID,
        back: pageActions.back,
    },
};
