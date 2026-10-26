import pageActions from './register.actions.js';
import viewStyles from './register.inline-styles.js';

export default {
    computed: {
        viewStyles() {
            return viewStyles;
        },
    },
    data() {
        return {
            ruleForm: {},
            tableName: '',
            rules: {},
            sexTypesOptions: [],
        };
    },
    mounted() {
        let table = this.$storage.get('loginTable');
        this.tableName = table;

        //级联表的下拉框查询
    },
    methods: {
        getUUID: pageActions.getUUID,
        close: pageActions.close,
        login: pageActions.login,
    },
};
