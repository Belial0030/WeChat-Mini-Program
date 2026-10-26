export default {
    init(id, type) {
        if (id) {
            this.id = id;
            this.type = type;
        }
        if (this.type == 'info' || this.type == 'else') {
            this.info(id);
        } else {
            //查询最大值 start
            this.$http({
                url: `dictionary/maxCodeIndex`,
                method: 'post',
                data: { dicCode: 'examquestion_types' },
            }).then(({ data }) => {
                if (data && data.code === 0) {
                    this.ruleForm.codeIndex = data.maxCodeIndex;
                } else {
                    this.$message.error(data.msg);
                }
            });
            //查询最大值 end
        }
    },

    info(id) {
        this.$http({
            url: `dictionary/info/${id}`,
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
        if (!this.ruleForm.indexName) {
            this.$message.error('试题类型不能为空');
            return;
        }
        this.$refs['ruleForm'].validate((valid) => {
            if (valid) {
                let ruleForm = this.ruleForm;
                ruleForm['dicCode'] = 'examquestion_types';
                ruleForm['dicName'] = '试题类型';
                this.$http({
                    url: `dictionary/${!this.ruleForm.id ? 'save' : 'update'}`,
                    method: 'post',
                    data: ruleForm,
                }).then(({ data }) => {
                    if (data && data.code === 0) {
                        this.$message({
                            message: '操作成功',
                            type: 'success',
                            duration: 1500,
                            onClose: () => {
                                this.parent.showFlag = true;
                                this.parent.addOrUpdateFlag = false;
                                this.parent.dictionaryCrossAddOrUpdateFlag = false;
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

    back() {
        this.parent.showFlag = true;
        this.parent.addOrUpdateFlag = false;
        this.parent.dictionaryCrossAddOrUpdateFlag = false;
        this.parent.contentStyleChange();
    },
};
