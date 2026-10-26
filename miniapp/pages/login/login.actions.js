export default {

    onRegisterTap(tableName) {
        uni.setStorageSync('loginTable', tableName);
        this.$utils.jump('../register/register');
    },

    onForgetTap() {
        this.$utils.jump('../forget/forget');
    },

    async onLoginTap() {
        if (!this.optionsValues[this.index]) {
            this.$utils.msg('请选择登陆人类型');
            return;
        }
        let res = await this.$api.login(`${this.optionsValues[this.index]}`, {
            username: this.username,
            password: this.password,
        });
        uni.setStorageSync('token', res.token);
        uni.setStorageSync('nickname', this.username);
        uni.setStorageSync('nowTable', `${this.optionsValues[this.index]}`);
        res = await this.$api.session(`${this.optionsValues[this.index]}`);
        uni.setStorageSync('userid', res.data.id);
        if (res.data.vip) {
            uni.setStorageSync('vip', res.data.vip);
        }
        uni.setStorageSync('role', `${this.options[this.index]}`);
        this.$utils.tab('../index/index');
    },

    optionsChange(e) {
        this.index = e.target.value;
    },
};
