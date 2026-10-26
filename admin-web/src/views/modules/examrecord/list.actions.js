export default {
    viewExamDetails(uuid) {
        this.$router.push({
            path: 'examredetails',
            query: { uuid: uuid },
        });
    },

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

        if (this.searchForm.exampaperTypes != '' && this.searchForm.exampaperTypes != undefined) {
            params['exampaperTypes'] = this.searchForm.exampaperTypes;
        }
        if (
            this.searchForm.createTimeStartSearch != '' &&
            this.searchForm.createTimeStartSearch != undefined
        ) {
            params['createTimeStartSearch'] = this.searchForm.createTimeStartSearch;
        }
        if (
            this.searchForm.createTimeEndSearch != '' &&
            this.searchForm.createTimeEndSearch != undefined
        ) {
            params['createTimeEndSearch'] = this.searchForm.createTimeEndSearch;
        }

        if (this.searchForm.yonghuName != '' && this.searchForm.yonghuName != undefined) {
            params['yonghuName'] = '%' + this.searchForm.yonghuName + '%';
        }
        if (
            this.searchForm.createTimeStartSearch != '' &&
            this.searchForm.createTimeStartSearch != undefined
        ) {
            params['createTimeStartSearch'] = this.searchForm.createTimeStartSearch;
        }
        if (
            this.searchForm.createTimeEndSearch != '' &&
            this.searchForm.createTimeEndSearch != undefined
        ) {
            params['createTimeEndSearch'] = this.searchForm.createTimeEndSearch;
        }

        this.$http({
            url: 'examrecord/page',
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
        this.$http({
            url: 'dictionary/page?dicCode=exampaper_types&page=1&limit=100',
            method: 'get',
            page: 1,
            limit: 100,
        }).then(({ data }) => {
            if (data && data.code === 0) {
                this.exampaperTypesSelectSearch = data.data.list;
            }
        });
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
                url: 'examrecord/deleteExamrecord',
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
};
