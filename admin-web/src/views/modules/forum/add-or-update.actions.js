export default {
    download(file) {
        window.open(`${file}`);
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
        let _this = this;
        _this
            .$http({
                url: `forum/info/${id}`,
                method: 'get',
            })
            .then(({ data }) => {
                if (data && data.code === 0) {
                    _this.ruleForm = data.data;
                    _this.yonghuChange(data.data.yonghuId);
                    _this.ruleForm.forumContent = _this.ruleForm.forumContent.replaceAll(
                        'src="upload/',
                        'src="' + this.$base.url + 'upload/',
                    );
                } else {
                    _this.$message.error(data.msg);
                }
            });
    },

    onSubmit() {
        this.$refs['ruleForm'].validate((valid) => {
            if (valid) {
                this.ruleForm.forumContent = this.ruleForm.forumContent.replaceAll(
                    this.$base.url,
                    '',
                );
                this.$http({
                    url: `forum/${!this.ruleForm.id ? 'save' : 'update'}`,
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
                                this.parent.forumCrossAddOrUpdateFlag = false;
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
        this.parent.forumCrossAddOrUpdateFlag = false;
        this.parent.contentStyleChange();
    },
};
