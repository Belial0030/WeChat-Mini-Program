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
        } else if (this.type == 'cross') {
            var obj = this.$storage.getObj('crossObj');
            for (var o in obj) {
                if (o == 'username') {
                    this.ruleForm.username = obj[o];
                    this.ro.username = true;
                    continue;
                }
                if (o == 'password') {
                    this.ruleForm.password = obj[o];
                    this.ro.password = true;
                    continue;
                }
                if (o == 'role') {
                    this.ruleForm.role = obj[o];
                    this.ro.role = true;
                    continue;
                }
            }
        }
    },

    info(id) {
        this.$http({
            url: `users/info/${id}`,
            method: 'get',
        }).then(({ data }) => {
            if (data && data.code === 0) {
                this.ruleForm = data.data;
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
                    url: `users/${!this.ruleForm.id ? 'save' : 'update'}`,
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
                                this.parent.usersCrossAddOrUpdateFlag = false;
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
        this.parent.usersCrossAddOrUpdateFlag = false;
        this.parent.contentStyleChange();
    },
};
