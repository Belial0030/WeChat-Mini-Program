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

        if (this.searchForm.exampaperName != '' && this.searchForm.exampaperName != undefined) {
            params['exampaperName'] = '%' + this.searchForm.exampaperName + '%';
        }

        if (this.searchForm.kemuTypes != '' && this.searchForm.kemuTypes != undefined) {
            params['kemuTypes'] = this.searchForm.kemuTypes;
        }

        if (this.searchForm.exampaperTypes != '' && this.searchForm.exampaperTypes != undefined) {
            params['exampaperTypes'] = this.searchForm.exampaperTypes;
        }

        params['exampaperDelete'] = 1; // 逻辑删除字段 1 未删除 2 删除

        this.$http({
            url: 'exampaper/page',
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
        //填充下拉框选项
        this.$http({
            url: 'dictionary/page?dicCode=kemu_types&page=1&limit=100',
            method: 'get',
        }).then(({ data }) => {
            if (data && data.code === 0) {
                this.kemuTypesSelectSearch = data.data.list;
            }
        });
        //填充下拉框选项
        this.$http({
            url: 'dictionary/page?dicCode=exampaper_types&page=1&limit=100',
            method: 'get',
        }).then(({ data }) => {
            if (data && data.code === 0) {
                this.exampaperTypesSelectSearch = data.data.list;
            }
        });
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

    saveExamrecord(id) {
        this.$confirm(`你确定要进行考试吗?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }).then(() => {
            this.$http({
                url: `examrecord/saveExamrecord?exampaperId=${id}`,
                method: 'get',
                data: null,
            }).then(({ data }) => {
                if (data && data.code === 0) {
                    this.$message({
                        message: '已创建考试记录',
                        type: 'success',
                        duration: 1500,
                        onClose: () => {
                            this.search();
                        },
                    });
                    this.$router.push({
                        name: 'adminexam',
                        params: {
                            id: id,
                            examrecordId: data.id,
                            paperUUID: data.uuid,
                        },
                    });
                } else {
                    this.$message.error(data.msg);
                }
            });
        });
    },

    download(file) {
        window.open(' ${file} ');
    },

    addKaoti(row) {
        this.$router.push({
            path: '/exampapertopic',
            query: {
                exampaperId: row.id,
                kemuTypes: row.kemuTypes,
                zujuanTypes: row.zujuanTypes,
            },
        });
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
                url: 'exampaper/delete',
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

    exampaperUploadSuccess(data) {
        let _this = this;
        _this
            .$http({
                url: 'exampaper/batchInsert?fileName=' + data.file,
                method: 'get',
            })
            .then(({ data }) => {
                if (data && data.code === 0) {
                    _this.$message({
                        message: '导入试卷表数据成功',
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

    exampaperUploadError(data) {
        this.$message.error('上传失败');
    },
};
