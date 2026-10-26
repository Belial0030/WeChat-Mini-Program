import pageActions from './center.actions.js';

// 数字，邮件，手机，url，身份证校验

export default {
    data() {
        return {
            ruleForm: {},
            flag: '',
            usersFlag: false,
            // sexTypesOptions : [],
            // 注册表 用户
            // 注册的类型字段 用户
            // 性别
            sexTypesOptions: [],
        };
    },
    mounted() {
        //获取当前登录用户的信息
        var table = this.$storage.get('sessionTable');
        this.sessionTable = this.$storage.get('sessionTable');
        this.role = this.$storage.get('role');
        if (this.role != '管理员') {
        }

        this.flag = table;
        this.$http({
            url: `${this.$storage.get('sessionTable')}/session`,
            method: 'get',
        }).then(({ data }) => {
            if (data && data.code === 0) {
                this.ruleForm = data.data;
                // 注册表 用户
            } else {
                this.$message.error(data.msg);
            }
        });

        // 注册表 用户 的级联表

        this.$http({
            url: `dictionary/page?page=1&limit=100&sort=&order=&dicCode=sex_types`,
            method: 'get',
        }).then(({ data }) => {
            if (data && data.code === 0) {
                this.sexTypesOptions = data.data.list;
            } else {
                this.$message.error(data.msg);
            }
        });
    },
    methods: {
        yonghuPhotoUploadChange: pageActions.yonghuPhotoUploadChange,
        onUpdateHandler: pageActions.onUpdateHandler,
    },
};
