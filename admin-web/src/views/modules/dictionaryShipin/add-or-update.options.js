import createState from './add-or-update.state.js';
import pageActions from './add-or-update.actions.js';

import styleJs from '../../../utils/style.js';
// 数字，邮件，手机，url，身份证校验

export default {
    data: createState,
    props: ['parent'],
    computed: {},
    created() {
        this.addEditForm = styleJs.addStyle();
    },
    methods: {
        init: pageActions.init,
        info: pageActions.info,
        onSubmit: pageActions.onSubmit,
        back: pageActions.back,
    },
};
