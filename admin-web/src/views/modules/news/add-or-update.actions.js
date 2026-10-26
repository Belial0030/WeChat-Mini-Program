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

    info(id) {
        let _this = this;
        _this
            .$http({
                url: `news/info/${id}`,
                method: 'get',
            })
            .then(({ data }) => {
                if (data && data.code === 0) {
                    _this.ruleForm = data.data;
                    _this.ruleForm.newsContent = _this.ruleForm.newsContent.replaceAll(
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
                this.ruleForm.newsContent = this.ruleForm.newsContent.replaceAll(
                    this.$base.url,
                    '',
                );
                this.$http({
                    url: `news/${!this.ruleForm.id ? 'save' : 'update'}`,
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
                                this.parent.newsCrossAddOrUpdateFlag = false;
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
        this.parent.newsCrossAddOrUpdateFlag = false;
        this.parent.contentStyleChange();
    },

    newsPhotoUploadChange(fileUrls) {
        this.ruleForm.newsPhoto = fileUrls;
        this.addEditUploadStyleChange();
    },
};
