export default {
    getUUID() {
        return new Date().getTime();
    },

    close() {
        this.$router.push({ path: '/login' });
    },

    login() {
        if (!this.ruleForm.username) {
            this.$message.error('账号不能为空');
            return;
        }
        if (!this.ruleForm.password) {
            this.$message.error('密码不能为空');
            return;
        }
        if (!this.ruleForm.repetitionPassword) {
            this.$message.error('重复密码不能为空');
            return;
        }
        if (this.ruleForm.repetitionPassword != this.ruleForm.password) {
            this.$message.error('密码和重复密码不一致');
            return;
        }
        if (!this.ruleForm.yonghuName && 'yonghu' == this.tableName) {
            this.$message.error('用户姓名不能为空');
            return;
        }
        if (
            'yonghu' == this.tableName &&
            this.ruleForm.yonghuPhone &&
            !this.$validate.isMobile(this.ruleForm.yonghuPhone)
        ) {
            this.$message.error('手机应输入手机格式');
            return;
        }
        if (!this.ruleForm.yonghuIdNumber && 'yonghu' == this.tableName) {
            this.$message.error('用户身份证号不能为空');
            return;
        }
        if (
            'yonghu' == this.tableName &&
            this.ruleForm.yonghuEmail &&
            !this.$validate.isEmail(this.ruleForm.yonghuEmail)
        ) {
            this.$message.error('邮箱应输入邮件格式');
            return;
        }
        this.$http({
            url: `${this.tableName}/register`,
            method: 'post',
            data: this.ruleForm,
        }).then(({ data }) => {
            if (data && data.code === 0) {
                this.$message({
                    message: '注册成功,请登录后在个人中心页面补充个人数据',
                    type: 'success',
                    duration: 1500,
                    onClose: () => {
                        this.$router.replace({ path: '/login' });
                    },
                });
            } else {
                this.$message.error(data.msg);
            }
        });
    },
};
