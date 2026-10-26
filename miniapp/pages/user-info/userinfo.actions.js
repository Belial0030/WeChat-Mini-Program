export default {
    yonghusexTypesChange(e) {
        this.sexTypesIndex = e.target.value;
        this.ruleForm.sexValue = this.sexTypesOptions[this.sexTypesIndex].indexName;
        this.ruleForm.sexTypes = this.sexTypesOptions[this.sexTypesIndex].codeIndex;
    },

    createTimeConfirm(val) {
        this.ruleForm.createTime = val.result;
        this.$forceUpdate();
    },

    getUUID() {
        return new Date().getTime();
    },

    logout() {
        uni.setStorageSync('token', '');
        this.$utils.jump('../login/login');
    },

    async update() {
        if (!this.ruleForm.username && `yonghu` == this.tableName) {
            this.$utils.msg(`账户不能为空`);
            return;
        }
        if (!this.ruleForm.yonghuName && `yonghu` == this.tableName) {
            this.$utils.msg(`用户姓名不能为空`);
            return;
        }
        if (
            `yonghu` == this.tableName &&
            this.ruleForm.yonghu &&
            !this.$validate.isMobile(this.ruleForm.yonghuPhone)
        ) {
            this.$utils.msg(`用户手机号应输入正确格式`);
            return;
        }
        if (
            `yonghu` == this.tableName &&
            this.ruleForm.yonghu &&
            !this.$validate.checkIdCard(this.ruleForm.yonghuIdNumber)
        ) {
            this.$utils.msg(`用户身份证号应输入正确格式`);
            return;
        }
        if (!this.ruleForm.yonghuPhoto && `yonghu` == this.tableName) {
            this.$utils.msg(`用户头像不能为空`);
            return;
        }
        if (
            `yonghu` == this.tableName &&
            this.ruleForm.yonghu &&
            !this.$validate.isNumber(this.ruleForm.xuexiNumber)
        ) {
            this.$utils.msg(`学习时长应输入数字或小数`);
            return;
        }
        if (
            `yonghu` == this.tableName &&
            this.ruleForm.yonghu &&
            !this.$validate.isEmail(this.ruleForm.yonghuEmail)
        ) {
            this.$utils.msg(`电子邮箱应输入正确格式`);
            return;
        }

        let table = uni.getStorageSync('nowTable');
        await this.$api.update(table, this.ruleForm);
        this.$utils.msgBack('修改成功');
    },

    yonghuPhotoTap() {
        let _this = this;
        this.$api.upload(function (res) {
            _this.ruleForm.yonghuPhoto = 'upload/' + res.file;
            _this.$forceUpdate();
        });
    },

    toggleTab(str) {
        this.$refs[str].show();
    },
};
