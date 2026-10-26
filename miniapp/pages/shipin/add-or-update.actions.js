export default {
    shipinTypesChange(e) {
        this.shipinTypesIndex = e.target.value;
        this.ruleForm.shipinValue = this.shipinTypesOptions[this.shipinTypesIndex].indexName;
        this.ruleForm.shipinTypes = this.shipinTypesOptions[this.shipinTypesIndex].codeIndex;
    },

    shipinPhotoTap() {
        let _this = this;
        this.$api.upload(function (res) {
            _this.ruleForm.shipinPhoto = _this.$base.url + 'upload/' + res.file;
            _this.$forceUpdate();
            _this.$nextTick(() => {
                // _this.styleChange()
            });
        });
    },

    shipinVideoTap() {
        let _this = this;
        this.$api.upload(function (res) {
            _this.ruleForm.shipinVideo = _this.$base.url + 'upload/' + res.file;
            _this.$forceUpdate();
            _this.$nextTick(() => {
                // _this.styleChange()
            });
        });
    },

    insertTimeConfirm(val) {
        this.ruleForm.insertTime = val.result;
        this.$forceUpdate();
    },

    createTimeConfirm(val) {
        this.ruleForm.createTime = val.result;
        this.$forceUpdate();
    },

    getUUID() {
        return new Date().getTime();
    },

    async onSubmitTap() {
        if (!this.ruleForm.shipinName) {
            this.$utils.msg(`视频标题不能为空`);
            return;
        }
        if (!this.ruleForm.shipinPhoto) {
            this.$utils.msg(`视频照片不能为空`);
            return;
        }
        if (this.ruleForm.id) {
            await this.$api.update(`shipin`, this.ruleForm);
        } else {
            await this.$api.save(`shipin`, this.ruleForm);
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
