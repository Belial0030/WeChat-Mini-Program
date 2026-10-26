export default {
    async showDrawer() {
        this.$refs.showRight.open();
    },

    async closeDrawer() {
        this.$refs.showRight.close();
    },

    download(url) {
        let _this = this;
        uni.downloadFile({
            url: url,
            success: (res) => {
                if (res.statusCode === 200) {
                    _this.$utils.msg('下载成功');
                    window.open(url);
                }
            },
        });
    },

    async newsTypesSelect() {
        let newsTypes = await this.$api.page('dictionary', {
            page: 1,
            limit: 100,
            dicCode: 'news_types',
        });
        newsTypes.data.list.splice(0, 0, { codeIndex: 0, indexName: '全部' });
        this.newsTypesList = newsTypes.data.list;
    },

    newsTypesCategoryClick(categoryName) {
        this.newsTypes = categoryName;
        this.mescroll.resetUpScroll();
    },

    queryChange(e) {
        this.searchForm.newsName = '';
    },

    mescrollInit(mescroll) {
        this.mescroll = mescroll;
    },

    downCallback(mescroll) {
        this.hasNext = true;
        // 重置分页参数页数为1
        mescroll.resetUpScroll();
    },

    async upCallback(mescroll) {
        let params = {
            page: mescroll.num,
            limit: mescroll.size,
        };

        if (this.newsTypes != 0) {
            params.newsTypes = this.newsTypes;
        }
        let _this = this;
        let res = await this.$api.list(`news`, params);
        res.data.list.forEach(function (item, index) {
            if (item.newsContent != null) {
                item.newsContent = item.newsContent
                    .replace('<img', '<img  class="daxiao"')
                    .replace('src="upload/', 'src="' + _this.$base.url + 'upload/');
            }
        });

        if (mescroll.num == 1) this.list = [];
        this.list = this.list.concat(res.data.list);
        if (res.data.list.length == 0) this.hasNext = false;
        mescroll.endSuccess(mescroll.size, this.hasNext);
    },

    onSelectTap(item) {
        uni.setStorageSync('address', item);
        uni.navigateBack({
            delta: 1,
        });
    },

    onDetailTap(item) {
        this.$utils.jump(`./detail?id=${item.id}`);
    },

    onUpdateTap(id) {
        this.$utils.jump(`./add-or-update?id=${id}`);
    },

    onAddTap() {
        this.$utils.jump(`./add-or-update`);
    },

    onDeleteTap(id) {
        var _this = this;
        uni.showModal({
            title: '提示',
            content: '是否确认删除',
            success: async function (res) {
                if (res.confirm) {
                    await _this.$api.del('news', JSON.stringify([id]));
                    _this.hasNext = true;
                    // 重置分页参数页数为1
                    _this.mescroll.resetUpScroll();
                }
            },
        });
    },

    async search() {
        this.mescroll.num = 1;
        let searchForm = {
            page: this.mescroll.num,
            limit: this.mescroll.size,
        };
        if (this.searchForm.newsName) {
            searchForm['newsName'] = this.searchForm.newsName;
        }

        let res = await this.$api.list(`news`, searchForm);
        let _this = this;
        res.data.list.forEach(function (item, index) {
            if (item.newsContent != null) {
                item.newsContent = item.newsContent
                    .replace('<img', '<img  class="daxiao"')
                    .replace('src="upload/', 'src="' + _this.$base.url + 'upload/');
            }
        });
        // 如果是第一页数据置空
        if (this.mescroll.num == 1) this.list = [];
        this.list = this.list.concat(res.data.list);
        if (res.data.list.length == 0) this.hasNext = false;
        this.mescroll.endSuccess(this.mescroll.size, this.hasNext);
    },
};
