import createState from './add-or-update.state.js';
import pageActions from './add-or-update.actions.js';
import viewStyles from './add-or-update.inline-styles.js';

// 数字，邮件，手机，url，身份证校验

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
        this.addEditForm = styleJs.addStyle();
    },
    methods: {
        download: pageActions.download,
        init: pageActions.init,
        info: pageActions.info,
        onSubmit: pageActions.onSubmit,
        getUUID: pageActions.getUUID,
        back: pageActions.back,
        valueUploadChange: pageActions.valueUploadChange,
    },
};
