export default {
    addOptions() {
        this.$refs['dialogForm'].validate((valid) => {
            if (valid) {
                for (let i = 0; i < this.options.length; i++) {
                    if (this.options[i].code == this.dialogForm.code) {
                        this.$message({
                            message: '已经有 ' + this.dialogForm.code + ' 这个选项了',
                            type: 'warning',
                        });
                        this.dialogForm = {};
                        return false;
                    }
                }
                this.options.push({
                    text: this.dialogForm.text,
                    code: this.dialogForm.code,
                });
                this.dialogForm = {};
                this.addOptionsDialogVisiable = !this.addOptionsDialogVisiable;
            }
        });
    },

    addOptionsDialog() {
        this.addOptionsDialogVisiable = !this.addOptionsDialogVisiable;
    },

    deleteOptions(index) {
        this.options.splice(index, 1);
    },

    typeChange(e) {
        if (e == 3) {
            this.options = [];
            this.options.push({
                text: '对',
                code: 'A',
            });
            this.options.push({
                text: '错',
                code: 'B',
            });
        } else {
            this.options = [];
        }
    },

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
        } else if (this.type == 'cross') {
            var obj = this.$storage.getObj('crossObj');
            for (var o in obj) {
                if (o == 'exampaperId') {
                    this.ruleForm.exampaperId = obj[o];
                    this.ro.exampaperId = true;
                    continue;
                }
                if (o == 'examquestionName') {
                    this.ruleForm.examquestionName = obj[o];
                    this.ro.examquestionName = true;
                    continue;
                }
                if (o == 'examquestionOptions') {
                    this.ruleForm.examquestionOptions = obj[o];
                    this.ro.examquestionOptions = true;
                    continue;
                }
                if (o == 'examquestionScore') {
                    this.ruleForm.examquestionScore = obj[o];
                    this.ro.examquestionScore = true;
                    continue;
                }
                if (o == 'examquestionAnswer') {
                    this.ruleForm.examquestionAnswer = obj[o];
                    this.ro.examquestionAnswer = true;
                    continue;
                }
                if (o == 'examquestionAnalysis') {
                    this.ruleForm.examquestionAnalysis = obj[o];
                    this.ro.examquestionAnalysis = true;
                    continue;
                }
                if (o == 'examquestionTypes') {
                    this.ruleForm.examquestionTypes = obj[o];
                    this.ro.examquestionTypes = true;
                    continue;
                }
                if (o == 'examquestionSequence') {
                    this.ruleForm.examquestionSequence = obj[o];
                    this.ro.examquestionSequence = true;
                    continue;
                }
            }
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

    info(id) {
        this.$http({
            url: `examquestion/info/${id}`,
            method: 'get',
        }).then(({ data }) => {
            if (data && data.code === 0) {
                this.ruleForm = data.data;
                this.exampaperChange(data.data.exampaperId);
                this.options = JSON.parse(this.ruleForm.examquestionOptions);
                if (this.ruleForm.examquestionTypes == 2) {
                    this.ruleForm.examquestionAnswer = this.ruleForm.examquestionAnswer.split(',');
                }
                this.options = JSON.parse(this.ruleForm.examquestionOptions);
                //解决前台上传图片后台不显示的问题
                let reg = new RegExp('../../../upload', 'g'); //g代表全部
            } else {
                this.$message.error(data.msg);
            }
        });
    },

    onSubmit() {
        if (!this.options && this.examquestionTypes != 4) {
            this.$message.error('请设置选项');
            return;
        }
        if (this.ruleForm.examquestionTypes == 2) {
            this.ruleForm.examquestionAnswer = this.ruleForm.examquestionAnswer.join(',');
        }
        this.ruleForm.examquestionOptions = JSON.stringify(this.options);
        this.$refs['ruleForm'].validate((valid) => {
            if (valid) {
                this.$http({
                    url: `examquestion/${!this.ruleForm.id ? 'save' : 'update'}`,
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
                                this.parent.examquestionCrossAddOrUpdateFlag = false;
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
        this.parent.examquestionCrossAddOrUpdateFlag = false;
        this.parent.contentStyleChange();
    },
};
