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
        } else if (this.type == 'cross') {
            var obj = this.$storage.getObj('crossObj');
            console.log(this.options);
            for (var o in obj) {
                if (o == 'yonghuId') {
                    this.ruleForm.yonghuId = obj[o];
                    this.ro.yonghuId = true;
                    continue;
                }
                if (o == 'exampaperId') {
                    this.ruleForm.exampaperId = obj[o];
                    this.ro.exampaperId = true;
                    continue;
                }
                if (o == 'examquestionId') {
                    this.ruleForm.examquestionId = obj[o];
                    this.ro.examquestionId = true;
                    continue;
                }
                if (o == 'examredetailsMyanswer') {
                    this.ruleForm.examredetailsMyanswer = obj[o];
                    this.ro.examredetailsMyanswer = true;
                    continue;
                }
                if (o == 'insertTime') {
                    this.ruleForm.insertTime = obj[o];
                    this.ro.insertTime = true;
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

    yonghuChange(id) {
        this.$http({
            url: `yonghu/info/` + id,
            method: 'get',
        }).then(({ data }) => {
            if (data && data.code === 0) {
                this.yonghuForm = data.data;
            }
        });
    },

    info(id) {
        this.$http({
            url: `examrewrongquestion/info/${id}`,
            method: 'get',
        }).then(({ data }) => {
            if (data && data.code === 0) {
                this.ruleForm = data.data;
                this.exampaperChange(data.data.exampaperId);
                this.examquestionChange(data.data.examquestionId);
                this.yonghuChange(data.data.yonghuId);
                this.options = JSON.parse(this.ruleForm.examquestionOptions);
                //解决前台上传图片后台不显示的问题
                let reg = new RegExp('../../../upload', 'g'); //g代表全部
            } else {
                this.$message.error(data.msg);
            }
        });
    },

    onSubmit() {
        this.$refs['ruleForm'].validate((valid) => {
            if (valid) {
                this.$http({
                    url: `examrewrongquestion/${!this.ruleForm.id ? 'save' : 'update'}`,
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
                                this.parent.examrewrongquestionCrossAddOrUpdateFlag = false;
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
        this.parent.examrewrongquestionCrossAddOrUpdateFlag = false;
        this.parent.contentStyleChange();
    },
};
