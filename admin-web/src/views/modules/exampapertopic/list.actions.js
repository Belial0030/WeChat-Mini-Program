export default {
    init() {},

    search() {
        this.pageIndex = 1;
        this.getDataList();
    },

    getDataList() {
        let _this = this;
        _this.dataListLoading = true;
        let params = {
            page: _this.pageIndex,
            limit: _this.pageSize,
        };

        if (this.$route.query.exampaperId != null) {
            params['exampaperId'] = this.$route.query.exampaperId;
        }

        if (_this.searchForm.exampaperName != '' && _this.searchForm.exampaperName != undefined) {
            params['exampaperName'] = '%' + _this.searchForm.exampaperName + '%';
        }

        if (_this.searchForm.kemuTypes != '' && _this.searchForm.kemuTypes != undefined) {
            params['kemuTypes'] = _this.searchForm.kemuTypes;
        }

        if (_this.searchForm.exampaperTypes != '' && _this.searchForm.exampaperTypes != undefined) {
            params['exampaperTypes'] = _this.searchForm.exampaperTypes;
        }

        if (
            _this.searchForm.examquestionName != '' &&
            _this.searchForm.examquestionName != undefined
        ) {
            params['examquestionName'] = '%' + _this.searchForm.examquestionName + '%';
        }

        if (_this.searchForm.kemuTypes != '' && _this.searchForm.kemuTypes != undefined) {
            params['kemuTypes'] = _this.searchForm.kemuTypes;
        }

        _this
            .$http({
                url: 'exampapertopic/page',
                method: 'get',
                params: params,
            })
            .then(({ data }) => {
                if (data && data.code === 0) {
                    _this.dataList = data.data.list;
                    _this.totalPage = data.data.total;
                    //查询并设置总分数
                    _this
                        .$http({
                            url: 'exampapertopic/sumExampapertopicNumber',
                            method: 'get',
                            params: { exampaperId: this.$route.query.exampaperId },
                        })
                        .then(({ data }) => {
                            _this.exampapertopicNumber = data.exampapertopicNumber;
                        });
                } else {
                    _this.dataList = [];
                    _this.totalPage = 0;
                }
                _this.dataListLoading = false;
            });

        //查询级联表搜索条件所有列表
        this.$http({
            url: 'dictionary/page?dicCode=kemu_types&page=1&limit=100',
            method: 'get',
            page: 1,
            limit: 100,
        }).then(({ data }) => {
            if (data && data.code === 0) {
                this.kemuTypesSelectSearch = data.data.list;
            }
        });
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
        this.$http({
            url: 'dictionary/page?dicCode=kemu_types&page=1&limit=100',
            method: 'get',
            page: 1,
            limit: 100,
        }).then(({ data }) => {
            if (data && data.code === 0) {
                this.kemuTypesSelectSearch = data.data.list;
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

    questionsSizeChangeHandle(val) {
        this.questionsPageSize = val;
        this.questionsPageIndex = 1;
        this.selectQuestions();
    },

    questionsCurrentChangeHandle(val) {
        this.questionsPageIndex = val;
        this.selectQuestions();
    },

    questionsSearch() {
        this.questionsPageIndex = 1;
        this.selectQuestions();
    },

    addshiti() {
        if (this.zujuanTypes == 1) {
            if (this.dataList.length > 0) {
                return this.$message.error('请不要重复组卷！！！！(清空组卷信息后可再次重新组卷)');
            }
            //自动组卷
            if (
                (this.danNum == 0 ||
                    this.danNum == null ||
                    this.danFen == 0 ||
                    this.danFen == null) &&
                (this.duoNum == 0 ||
                    this.duoNum == null ||
                    this.duoFen == 0 ||
                    this.duoFen == null) &&
                (this.panNum == 0 ||
                    this.panNum == null ||
                    this.panFen == 0 ||
                    this.panFen == null) &&
                (this.tianNum == 0 ||
                    this.tianNum == null ||
                    this.tianFen == 0 ||
                    this.tianFen == null)
            ) {
                return this.$message.error('题数量、题分数不可全部为空或为0');
            }

            let params = {
                kemuTypes: this.$route.query.kemuTypes,
                exampaperId: this.exampaperId,
                danNum: this.danNum,
                danFen: this.danFen,
                duoNum: this.duoNum,
                duoFen: this.duoFen,
                panNum: this.panNum,
                panFen: this.panFen,
                tianNum: this.tianNum,
                tianFen: this.tianFen,
            };
            this.$http({
                url: 'exampapertopic/zidongzujuan',
                method: 'get',
                params: params,
            }).then(({ data }) => {
                if (data && data.code === 0) {
                    this.$message({
                        message: '操作成功',
                        type: 'success',
                        duration: 1500,
                        onClose: () => {
                            this.search();
                            this.selectQuestions();
                        },
                    });
                } else {
                    this.$message.error(data.msg);
                }
            });
        } else {
            this.selectQuestions();
            this.questionsTableVisible = true;
            //手动组卷
        }
    },

    selectQuestions() {
        let _this = this;
        _this.danXisting = 0;
        _this.duoXisting = 0;
        _this.panXisting = 0;
        _this.tianXisting = 0;
        let params = {};
        if (this.zujuanTypes == 1) {
            params['page'] = 1;
            params['limit'] = 9999;
        } else {
            params['page'] = _this.questionsPageIndex;
            params['limit'] = _this.questionsPageSize;
        }

        if (_this.$route.query.kemuTypes != null) {
            params['kemuTypes'] = _this.$route.query.kemuTypes;
        }
        if (
            _this.questionsSearchForm.examquestionName != '' &&
            _this.questionsSearchForm.examquestionName != undefined
        ) {
            params['examquestionName'] = '%' + _this.questionsSearchForm.examquestionName + '%';
        }

        if (
            _this.questionsSearchForm.kemuTypes != '' &&
            _this.questionsSearchForm.kemuTypes != undefined
        ) {
            params['kemuTypes'] = _this.questionsSearchForm.kemuTypes;
        }

        if (
            _this.questionsSearchForm.examquestionTypes != '' &&
            _this.questionsSearchForm.examquestionTypes != undefined
        ) {
            params['examquestionTypes'] = _this.questionsSearchForm.examquestionTypes;
        }
        _this
            .$http({
                url: 'examquestion/page',
                method: 'get',
                params: params,
            })
            .then(({ data }) => {
                if (data && data.code === 0) {
                    _this.questionsList = data.data.list;
                    _this.questionsPageTotalPage = data.data.total;
                    _this.questionsList.forEach(function (item, index) {
                        if (item.examquestionTypes == 1) {
                            _this.danXisting = _this.danXisting + 1;
                        }
                        if (item.examquestionTypes == 2) {
                            _this.duoXisting = _this.duoXisting + 1;
                        }
                        if (item.examquestionTypes == 3) {
                            _this.panXisting = _this.panXisting + 1;
                        }
                        if (item.examquestionTypes == 4) {
                            _this.tianXisting = _this.tianXisting + 1;
                        }
                    });
                } else {
                    _this.questionsList = [];
                    _this.questionsPageTotalPage = 0;
                }
            });
    },

    addQuestions(id) {
        let data = {
            exampaperId: this.exampaperId,
            examquestionId: id,
            exampapertopicNumber: 0,
        };
        this.$http({
            url: 'exampapertopic/save',
            method: 'post',
            data: data,
        }).then(({ data }) => {
            if (data && data.code === 0) {
                this.$message({
                    message: '添加试题成功',
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
                url: 'exampapertopic/examinationDelete',
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

    exampapertopicUploadSuccess(data) {
        let _this = this;
        _this
            .$http({
                url: 'exampapertopic/batchInsert?fileName=' + data.file,
                method: 'get',
            })
            .then(({ data }) => {
                if (data && data.code === 0) {
                    _this.$message({
                        message: '导入试卷选题数据成功',
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

    exampapertopicUploadError(data) {
        this.$message.error('上传失败');
    },
};
