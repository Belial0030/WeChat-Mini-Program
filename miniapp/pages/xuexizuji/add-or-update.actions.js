export default {
    xuexizujiTypesChange(e) {
        this.xuexizujiTypesIndex = e.target.value;
        this.ruleForm.xuexizujiValue =
            this.xuexizujiTypesOptions[this.xuexizujiTypesIndex].indexName;
        this.ruleForm.xuexizujiTypes =
            this.xuexizujiTypesOptions[this.xuexizujiTypesIndex].codeIndex;
    },

    xuexizujiTimeConfirm(val) {
        this.ruleForm.xuexizujiTime = val.result;
        this.$forceUpdate();
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
        if (!this.ruleForm.xuexizujiTime) {
            this.$utils.msg(`开始时间不能为空`);
            return;
        }
        if (this.ruleForm.id) {
            await this.$api.update(`xuexizuji`, this.ruleForm);
        } else {
            await this.$api.save(`xuexizuji`, this.ruleForm);
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
