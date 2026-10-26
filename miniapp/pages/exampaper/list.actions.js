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
        let res = await this.$api.page(`exampaper`, {
            page: mescroll.num,
            limit: mescroll.size,
        });
        // 如果是第一页数据置空
        if (mescroll.num == 1) this.list = [];
        this.list = this.list.concat(res.data.list);
        if (res.data.list.length == 0) this.hasNext = false;
        mescroll.endSuccess(mescroll.size, this.hasNext);
    },

    async onDetailTap(id) {
        let value = [
            {
                key: 'exampaperId',
                val: id,
            },
        ];
        this.$utils.jump('./exam?exampaperId=' + id);
    },

    async search() {
        this.mescroll.num = 1;
        let searchForm = {
            page: this.mescroll.num,
            limit: this.mescroll.size,
        };
        let res = await this.$api.page(`exampaper`, searchForm);
        // 如果是第一页数据置空
        if (this.mescroll.num == 1) this.list = [];
        this.list = this.list.concat(res.data.list);
        if (res.data.list.length == 0) this.hasNext = false;
        this.mescroll.endSuccess(this.mescroll.size, this.hasNext);
    },
};
