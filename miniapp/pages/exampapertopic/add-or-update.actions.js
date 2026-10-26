export default {
    createTimeConfirm(val) {
        this.ruleForm.createTime = val.result;
        this.$forceUpdate();
    },

    getUUID() {
        return new Date().getTime();
    },

    async onSubmitTap() {
        if (
            !this.ruleForm.exampapertopicNumber &&
            !this.$validate.isIntNumer(this.ruleForm.exampapertopicNumber) &&
            this.ruleForm.exampapertopicNumber > 0
        ) {
            this.$utils.msg(`试题分数不能为空，不能小于0 格式为数字`);
            return;
        }
        if (this.ruleForm.id) {
            await this.$api.update(`exampapertopic`, this.ruleForm);
        } else {
            await this.$api.save(`exampapertopic`, this.ruleForm);
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
