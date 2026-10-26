export default {
    sexTypesChange(e) {
        this.sexTypesIndex = e.target.value;
        this.ruleForm.sexValue = this.sexTypesOptions[this.sexTypesIndex].indexName;
        this.ruleForm.sexTypes = this.sexTypesOptions[this.sexTypesIndex].codeIndex;
    },

    yonghuPhotoTap() {
        let _this = this;
        this.$api.upload(function (res) {
            _this.ruleForm.yonghuPhoto = _this.$base.url + 'upload/' + res.file;
            _this.$forceUpdate();
            _this.$nextTick(() => {
                // _this.styleChange()
            });
        });
    },

    createTimeConfirm(val) {
        this.ruleForm.createTime = val.result;
        this.$forceUpdate();
    },

    getUUID() {
        return new Date().getTime();
    },

    async onSubmitTap() {
        if (!this.ruleForm.username) {
            this.$utils.msg(`账户不能为空`);
            return;
        }
        if (!this.ruleForm.yonghuName) {
            this.$utils.msg(`用户姓名不能为空`);
            return;
        }
        if (!this.ruleForm.yonghuPhone && !this.$validate.isMobile(this.ruleForm.yonghuPhone)) {
            this.$utils.msg(`用户手机号不能为空并且需要输入正确格式`);
            return;
        }
        if (
            !this.ruleForm.yonghuIdNumber &&
            !this.$validate.checkIdCard(this.ruleForm.yonghuIdNumber)
        ) {
            this.$utils.msg(`用户身份证号不能为空并且需要输入正确格式`);
            return;
        }
        if (!this.ruleForm.yonghuPhoto) {
            this.$utils.msg(`用户头像不能为空`);
            return;
        }
        if (!this.ruleForm.sexTypes) {
            this.$utils.msg(`性别不能为空`);
            return;
        }
        if (
            !this.ruleForm.xuexiNumber &&
            !this.$validate.isIntNumer(this.ruleForm.xuexiNumber) &&
            this.ruleForm.xuexiNumber > 0
        ) {
            this.$utils.msg(`学习时长不能为空，不能小于0 格式为数字`);
            return;
        }
        if (!this.ruleForm.yonghuEmail && !this.$validate.isEmail(this.ruleForm.yonghuEmail)) {
            this.$utils.msg(`电子邮箱不能为空并且需要输入正确格式`);
            return;
        }
        if (this.ruleForm.id) {
            await this.$api.update(`yonghu`, this.ruleForm);
        } else {
            await this.$api.save(`yonghu`, this.ruleForm);
        }
        uni.setStorageSync('pingluenStateState', true);
        this.$utils.msgBack('提交成功');
    },

    getDate(type) {
        const date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        if (type === 'start') {
            year = year - 60;
        } else if (type === 'end') {
            year = year + 2;
        }
        month = month > 9 ? month : '0' + month;
        day = day > 9 ? day : '0' + day;
        return `${year}-${month}-${day}`;
    },

    toggleTab(str) {
        this.$refs[str].show();
    },
};
