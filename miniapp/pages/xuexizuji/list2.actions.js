export default {
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

    queryChange(e) {
        this.searchForm.xuexizujiName = '';
    },

    categoryClick(categoryName) {
        this.categoryName = categoryName;
        this.mescroll.resetUpScroll();
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

        if (this.categoryName != 0) {
            params.xuexizujiTypes = this.categoryName;
        }

        let res = await this.$api.page(`xuexizuji`, params);

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
                    await _this.$api.del('xuexizuji', JSON.stringify([id]));
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

        let res = await this.$api.page(`xuexizuji`, searchForm);
        // 如果是第一页数据置空
        if (this.mescroll.num == 1) this.list = [];
        this.list = this.list.concat(res.data.list);
        if (res.data.list.length == 0) this.hasNext = false;
        this.mescroll.endSuccess(this.mescroll.size, this.hasNext);
    },
};
