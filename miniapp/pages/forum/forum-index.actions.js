export default {
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
            forumStateTypes: 1,
            page: mescroll.num,
            limit: mescroll.size,
        };
        let res = await this.$api.list('forum', params);
        // 如果是第一页数据置空
        if (mescroll.num == 1) this.list = [];
        this.list = this.list.concat(res.data.list);
        if (res.data.list.length == 0) this.hasNext = false;
        mescroll.endSuccess(mescroll.size, this.hasNext);
    },

    onDetailTap(id) {
        this.$utils.jump(`../forum/forum-detail?id=${id}`);
    },

    onSwiperTap(e) {},

    async search() {
        let _this = this;
        _this.mescroll.num = 1;
        // 如果是第一页数据置空
        if (_this.mescroll.num == 1) _this.list = [];
        let params = {
            forumStateTypes: 1,
            page: _this.mescroll.num,
            limit: _this.mescroll.size,
            forumName: _this.searchForm.forumName,
        };
        let res = await _this.$api.list('forum', params);
        _this.list = _this.list.concat(res.data.list);
        if (res.data.list.length == 0) _this.hasNext = false;
        _this.mescroll.endSuccess(_this.mescroll.size, _this.hasNext);
    },
};
