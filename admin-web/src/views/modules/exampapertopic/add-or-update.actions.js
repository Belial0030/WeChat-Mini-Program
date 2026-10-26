export default {
    download(file) {
        window.open(' ${file} ');
    },

    init(id, type) {
        if (id) {
            this.id = id;
            this.type = type;
        }
        if (this.type == 'info' || this.type == 'else') {
            this.info(id);
        }
        // 获取用户信息
        this.$http({
            url: `${this.$storage.get('sessionTable')}/session`,
            method: 'get',
        }).then(({ data }) => {
            if (data && data.code === 0) {
                var json = data.data;
            } else {
                this.$message.error(data.msg);
            }
        });
    },

    exampaperChange(id) {
        this.$http({
            url: `exampaper/info/` + id,
            method: 'get',
        }).then(({ data }) => {
            if (data && data.code === 0) {
                this.exampaperForm = data.data;
            }
        });
    },

    examquestionChange(id) {
        this.$http({
            url: `examquestion/info/` + id,
            method: 'get',
        }).then(({ data }) => {
            if (data && data.code === 0) {
                this.examquestionForm = data.data;
            }
        });
    },

    info(id) {
        let _this = this;
        _this
            .$http({
                url: `exampapertopic/info/${id}`,
                method: 'get',
            })
            .then(({ data }) => {
                if (data && data.code === 0) {
                    _this.ruleForm = data.data;
                    _this.options = JSON.parse(_this.ruleForm.examquestionOptions);
                    if (_this.ruleForm.examquestionTypes == 2) {
                        _this.ruleForm.examquestionAnswer =
                            _this.ruleForm.examquestionAnswer.split(',');
                    }
                    _this.options = JSON.parse(_this.ruleForm.examquestionOptions);
                    _this.exampaperChange(data.data.exampaperId);
                    _this.examquestionChange(data.data.examquestionId);
                } else {
                    _this.$message.error(data.msg);
                }
            });
    },

    onSubmit() {
        this.$refs['ruleForm'].validate((valid) => {
            if (valid) {
                this.$http({
                    url: `exampapertopic/${!this.ruleForm.id ? 'save' : 'examinationUpdate'}`,
                    method: 'post',
                    data: this.ruleForm,
                }).then(({ data }) => {
                    if (data && data.code === 0) {
                        this.$message({
                            message: '操作成功',
                            type: 'success',
                            duration: 1500,
                            onClose: () => {
                                this.parent.showFlag = true;
                                this.parent.addOrUpdateFlag = false;
                                this.parent.exampapertopicCrossAddOrUpdateFlag = false;
                                this.parent.search();
                                this.parent.contentStyleChange();
                            },
                        });
                    } else {
                        this.$message.error(data.msg);
                    }
                });
            }
        });
    },

    getUUID() {
        return new Date().getTime();
    },

    back() {
        this.parent.showFlag = true;
        this.parent.addOrUpdateFlag = false;
        this.parent.exampapertopicCrossAddOrUpdateFlag = false;
        this.parent.contentStyleChange();
    },
};
