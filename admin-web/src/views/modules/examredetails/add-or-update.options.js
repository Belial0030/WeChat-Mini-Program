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
        //获取下拉框信息

        this.$http({
            url: `examquestion/page?page=1&limit=100`,
            method: 'get',
        }).then(({ data }) => {
            if (data && data.code === 0) {
                this.examquestionOptions = data.data.list;
            }
        });

        this.$http({
            url: `yonghu/page?page=1&limit=100`,
            method: 'get',
        }).then(({ data }) => {
            if (data && data.code === 0) {
                this.yonghuOptions = data.data.list;
            }
        });
    },
    methods: {
        download: pageActions.download,
        init: pageActions.init,
        examquestionChange: pageActions.examquestionChange,
        yonghuChange: pageActions.yonghuChange,
        info: pageActions.info,
        onSubmit: pageActions.onSubmit,
        getUUID: pageActions.getUUID,
        back: pageActions.back,
    },
};
