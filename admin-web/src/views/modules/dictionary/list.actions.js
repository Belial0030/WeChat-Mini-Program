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
        };

        if (this.searchForm.indexName != '' && this.searchForm.indexName != undefined) {
            params['indexName'] = '%' + this.searchForm.indexName + '%';
        }

        params['dictionaryDelete'] = 1; // 逻辑删除字段 1 未删除 2 删除

        this.$http({
            url: 'dictionary/page',
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
                url: 'dictionary/delete',
                method: 'post',
                data: ids,
            }).then(({ data }) => {
                if (data && data.code === 0) {
                    this.$message({
                        message: '操作成功',
                        type: 'success',
                        duration: 1500,
                        onClose: () => {
                            this.search();
                        },
                    });
                } else {
                    this.$message.error(data.msg);
                }
            });
        });
    },

    dictionaryUploadSuccess(data) {
        let _this = this;
        _this
            .$http({
                url: 'dictionary/batchInsert?fileName=' + data.file,
                method: 'get',
            })
            .then(({ data }) => {
                if (data && data.code === 0) {
                    _this.$message({
                        message: '导入字典数据成功',
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

    dictionaryUploadError(data) {
        this.$message.error('上传失败');
    },
};
