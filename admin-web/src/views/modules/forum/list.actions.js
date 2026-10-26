export default {
    init() {},

    search() {
        this.pageIndex = 1;
        this.getDataList();
    },

    getDataList() {
        this.dataListLoading = true;
        let params = {
            page: this.pageIndex,
            limit: this.pageSize,
            sort: 'id',
            forumStateTypes: 1,
        };

        if (this.searchForm.yonghuName != '' && this.searchForm.yonghuName != undefined) {
            params['yonghuName'] = '%' + this.searchForm.yonghuName + '%';
        }

        if (this.searchForm.forumName != '' && this.searchForm.forumName != undefined) {
            params['forumName'] = '%' + this.searchForm.forumName + '%';
        }

        params['forumDelete'] = 1; // 逻辑删除字段 1 未删除 2 删除

        this.$http({
            url: 'forum/list',
            method: 'get',
            params: params,
        }).then(({ data }) => {
            if (data && data.code === 0) {
                this.dataList = data.data.list;
                this.totalPage = data.data.total;
            } else {
                this.dataList = [];
                this.totalPage = 0;
            }
            this.dataListLoading = false;
        });

        //查询级联表搜索条件所有列表
        //查询当前表搜索条件所有列表
    },

    sizeChangeHandle(val) {
        this.pageSize = val;
        this.pageIndex = 1;
        this.getDataList();
    },

    currentChangeHandle(val) {
        this.pageIndex = val;
        this.getDataList();
    },

    selectionChangeHandler(val) {
        this.dataListSelections = val;
    },

    addOrUpdateHandler(id, type) {
        this.showFlag = false;
        this.addOrUpdateFlag = true;
        this.crossAddOrUpdateFlag = false;
        if (type != 'info') {
            type = 'else';
        }
        this.$nextTick(() => {
            this.$refs.addOrUpdate.init(id, type);
        });
    },

    download(file) {
        window.open(' ${file} ');
    },

    deleteHandler(id) {
        var ids = id
            ? [Number(id)]
            : this.dataListSelections.map((item) => {
                  return Number(item.id);
              });

        this.$confirm(`确定进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }).then(() => {
            this.$http({
                url: 'forum/delete',
                method: 'post',
                data: ids,
            }).then(({ data }) => {
                if (data && data.code === 0) {
                    this.$message({
                        message: '操作成功',
                        type: 'success',
                        duration: 1500,
                        onClose: () => {
                            this.forumReplyDialogVisible = false;
                            this.search();
                        },
                    });
                } else {
                    this.$message.error(data.msg);
                }
            });
        });
    },

    forumUploadSuccess(data) {
        let _this = this;
        _this
            .$http({
                url: 'forum/batchInsert?fileName=' + data.file,
                method: 'get',
            })
            .then(({ data }) => {
                if (data && data.code === 0) {
                    _this.$message({
                        message: '导入论坛数据成功',
                        type: 'success',
                        duration: 1500,
                        onClose: () => {
                            _this.search();
                        },
                    });
                } else {
                    _this.$message.error(data.msg);
                }
            });
    },

    forumUploadError(data) {
        this.$message.error('上传失败');
    },

    openReplyForum(id, forumName, forumContent) {
        let _this = this;
        // 当前帖子相关 start
        _this.superIds = id;
        _this.forumTitle = forumName;
        _this.forumContent = forumContent;
        // 当前帖子相关 end
        _this.forumReplyContent = ''; //帖子回复
        _this.forumReplyDialogVisible = true; //论坛回复模态框
        _this.forumReplyInfoDialogVisible = false; //论坛回复详情模态框

        // 查看当前帖子的回复列表
        let params = {
            page: 1,
            limit: 10000,
            sort: 'id',
            forumStateTypes: 2,
            superIds: _this.superIds,
        };
        _this
            .$http({
                url: 'forum/list',
                method: 'get',
                params: params,
            })
            .then(({ data }) => {
                if (data && data.code === 0) {
                    _this.forumData = [];
                    data.data.list.forEach((el) => {
                        let forum = {};
                        forum.id = el.id;
                        forum.forumName = el.forumName;
                        forum.yonghuId = el.yonghuId; //---
                        forum.yonghuName = el.yonghuName;
                        forum.yonghuPhone = el.yonghuPhone;
                        forum.yonghuIdNumber = el.yonghuIdNumber;
                        forum.yonghuPhoto = el.yonghuPhoto;
                        forum.xuexiNumber = el.xuexiNumber;
                        forum.yonghuEmail = el.yonghuEmail;
                        forum.createTime = el.createTime;
                        forum.usersId = el.usersId; //---
                        forum.username = el.username;
                        forum.password = el.password;
                        forum.role = el.role;
                        forum.addtime = el.addtime;
                        forum.forumContent = el.forumContent;
                        forum.superIds = el.superIds;
                        forum.forumStateTypes = el.forumStateTypes;
                        forum.insertTime = el.insertTime;
                        forum.updateTime = el.updateTime;
                        forum.createTime = el.createTime;
                        _this.forumData.push(forum);
                    });
                }
            });
    },

    seeForumContent(forumContent) {
        let _this = this;
        _this.forumReplyInfoContent = forumContent; //帖子某个回复详情 全
        _this.forumReplyInfoDialogVisible = true; //论坛回复详情模态框
    },

    deleteForumData(id) {
        let _this = this;
        let ids = [];
        ids.push(Number(id));
        _this
            .$http({
                url: 'forum/delete',
                method: 'post',
                data: ids,
            })
            .then(({ data }) => {
                if (data && data.code === 0) {
                    _this.$message({
                        message: '删除回帖成功',
                        type: 'success',
                        duration: 1500,
                        onClose: () => {
                            _this.openReplyForum(
                                _this.superIds,
                                _this.forumTitle,
                                _this.forumContent,
                            );
                        },
                    });
                } else {
                    _this.$message.error(data.msg);
                }
            });
    },

    forumReply() {
        let _this = this;
        if (_this.forumReplyContent == '') {
            alert('请输入回帖内容');
            return false;
        }
        let data = {
            superIds: _this.superIds,
            forumStateTypes: 2,
            forumContent: _this.forumReplyContent,
        };
        _this
            .$http({
                url: `forum/save`,
                method: 'post',
                data: data,
            })
            .then(({ data }) => {
                if (data && data.code === 0) {
                    _this.$message({
                        message: '回帖成功',
                        type: 'success',
                        duration: 1500,
                        onClose: () => {
                            _this.openReplyForum(
                                _this.superIds,
                                _this.forumTitle,
                                _this.forumContent,
                            );
                        },
                    });
                } else {
                    _this.$message.error(data.msg);
                }
            });
    },
};
