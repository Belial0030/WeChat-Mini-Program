export default {
    onLogout() {
        this.$storage.remove('Token');
        this.$router.replace({ name: 'login' });
    },

    onUpdateHandler() {
        this.$refs['ruleForm'].validate((valid) => {
            if (valid) {
                var password = '';
                if (this.user.mima) {
                    password = this.user.mima;
                } else if (this.user.password) {
                    password = this.user.password;
                }
                if (this.ruleForm.password != password) {
                    this.$message.error('原密码错误');
                    return;
                }
                if (this.ruleForm.newpassword != this.ruleForm.repassword) {
                    this.$message.error('两次密码输入不一致');
                    return;
                }
                this.user.password = this.ruleForm.newpassword;
                this.user.mima = this.ruleForm.newpassword;
                this.$http({
                    url: `${this.$storage.get('sessionTable')}/update`,
                    method: 'post',
                    data: this.user,
                }).then(({ data }) => {
                    if (data && data.code === 0) {
                        this.$message({
                            message: '修改密码成功,下次登录系统生效',
                            type: 'success',
                            duration: 1500,
                            onClose: () => {},
                        });
                    } else {
                        this.$message.error(data.msg);
                    }
                });
            }
        });
    },
};
