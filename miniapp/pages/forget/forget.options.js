import viewStyles from './forget.inline-styles.js';

export default {
    computed: {
        viewStyles() {
            return viewStyles;
        },
    },
    data() {
        return {
            options: ['请选择登陆用户类型', '用户'],
            username: null,
            optionsValues: ['', 'yonghu'],
            index: 0,
        };
    },
    onLoad() {
        this.styleChange();
    },
    methods: {
        async onResetPass() {
            if (this.username == undefined) {
                this.$utils.msg('请输入账号');
                return;
            }
            if (this.optionsValues[this.index] == '') {
                this.$utils.msg('请选择角色');
                return;
            }
            let res = await this.$api.resetPass(`${this.optionsValues[this.index]}`, this.username);
            this.$utils.msgBack('重置密码成功,原始密码为:123456');
        },
        optionsChange(e) {
            this.index = e.target.value;
        },
        styleChange() {
            this.$nextTick(() => {
                // document.querySelectorAll('.forget-yaoxianStyle .uni-yaoxianStyle-yaoxianStyle').forEach(el=>{
                //   el.style.backgroundColor = this.restPwFrom.content.yaoxianStyle.backgroundColor
                // })
            });
        },
    },
};
