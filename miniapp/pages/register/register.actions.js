export default {
    yonghusexTypesChange(e) {
        this.yonghusexTypesIndex = e.target.value;
        this.ruleForm.sexValue = this.yonghusexTypesOptions[this.yonghusexTypesIndex].indexName;
        this.ruleForm.sexTypes = this.yonghusexTypesOptions[this.yonghusexTypesIndex].codeIndex;
    },

    getUUID() {
        return new Date().getTime();
    },

    async register() {
        if (!this.ruleForm.username && `yonghu` == this.tableName) {
            this.$utils.msg(`姓名不能为空`);
            return;
        }
        if (!this.ruleForm.password && `yonghu` == this.tableName) {
            this.$utils.msg(`密码不能为空`);
            return;
        }
        if (!this.ruleForm.yonghuName && `yonghu` == this.tableName) {
            this.$utils.msg(`姓名不能为空`);
            return;
        }
        if (
            `yonghu` == this.tableName &&
            this.ruleForm.yonghuPhone &&
            !this.$validate.isMobile(this.ruleForm.yonghuPhone)
        ) {
            this.$utils.msg(`手机应输入手机格式`);
            return;
        }
        if (
            `yonghu` == this.tableName &&
            this.ruleForm.yonghuIdNumber &&
            !this.$validate.checkIdCard(this.ruleForm.yonghuIdNumber)
        ) {
            this.$utils.msg(`身份证应输入正确格式`);
            return;
        }
        await this.$api.register(`yonghu`, this.ruleForm);
        this.$utils.msgBack('注册成功');
    },
};
