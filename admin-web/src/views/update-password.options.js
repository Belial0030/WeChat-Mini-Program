import createState from './update-password.state.js';
import pageActions from './update-password.actions.js';

export default {
    data: createState,
    mounted() {
        this.$http({
            url: `${this.$storage.get('sessionTable')}/session`,
            method: 'get',
        }).then(({ data }) => {
            if (data && data.code === 0) {
                this.user = data.data;
            } else {
                this.$message.error(data.msg);
            }
        });
    },
    methods: {
        onLogout: pageActions.onLogout,
        onUpdateHandler: pageActions.onUpdateHandler,
    },
};
