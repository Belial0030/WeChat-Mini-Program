import createState from './add-or-update.state.js';
import pageActions from './add-or-update.actions.js';
import viewStyles from './add-or-update.inline-styles.js';

import styleJs from '../../../utils/style.js';
// 数字，邮件，手机，url，身份证校验

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

        if (this.role != '管理员') {
        }
        this.addEditForm = styleJs.addStyle();
        //获取下拉框信息
        this.$http({
            url: `dictionary/page?page=1&limit=100&sort=&order=&dicCode=sex_types`,
            method: 'get',
        }).then(({ data }) => {
            if (data && data.code === 0) {
                this.sexTypesOptions = data.data.list;
            }
        });
    },
    mounted() {},
    methods: {
        download: pageActions.download,
        init: pageActions.init,
        info: pageActions.info,
        onSubmit: pageActions.onSubmit,
        getUUID: pageActions.getUUID,
        back: pageActions.back,
        yonghuPhotoUploadChange: pageActions.yonghuPhotoUploadChange,
    },
};
