import createState from './add-or-update.state.js';
import pageActions from './add-or-update.actions.js';

import styleJs from '../../../utils/style.js';
// 数字，邮件，手机，url，身份证校验

export default {
    data: createState,
    props: ['parent'],
    computed: {},
    created() {
        //获取当前登录用户的信息
        this.sessionTable = this.$storage.get('sessionTable');
        this.role = this.$storage.get('role');
        this.userId = this.$storage.get('userId');

        if (this.role != '管理员') {
        }
        this.addEditForm = styleJs.addStyle();
        //获取下拉框信息
        this.$http({
            url: `dictionary/page?page=1&limit=100&sort=&order=&dicCode=forum_state_types`,
            method: 'get',
        }).then(({ data }) => {
            if (data && data.code === 0) {
                this.forumStateTypesOptions = data.data.list;
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
    mounted() {},
    methods: {
        download: pageActions.download,
        init: pageActions.init,
        yonghuChange: pageActions.yonghuChange,
        info: pageActions.info,
        onSubmit: pageActions.onSubmit,
        getUUID: pageActions.getUUID,
        back: pageActions.back,
    },
};
