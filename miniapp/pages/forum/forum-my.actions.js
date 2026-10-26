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
            yonghuId: this.user.id,
        };
        let res = await this.$api.page('forum', params);
        // 如果是第一页数据置空
        if (mescroll.num == 1) this.list = [];
        this.list = this.list.concat(res.data.list);
        if (res.data.list.length == 0) this.hasNext = false;
        mescroll.endSuccess(mescroll.size, this.hasNext);
    },

    onDetailTap(id) {
        this.$utils.jump(`../forum/forum-detail?id=${id}`);
    },

    onUpdateTap(id) {
        if (id) {
            this.$utils.jump(`../forum/forum-add-or-update?id=${id}`);
        } else {
            this.$utils.jump(`../forum/forum-add-or-update`);
        }
    },

    onDeleteTap(id) {
        let _this = this;
        uni.showModal({
            title: '提示',
            content: '是否确认删除',
            success: async function (res) {
                if (res.confirm) {
                    await _this.$api.del('forum', JSON.stringify([id]));
                    _this.$utils.msg('删除成功');
                    _this.hasNext = true;
                    // 重新加载数据
                    if (_this.mescroll) _this.mescroll.resetUpScroll();
                }
            },
        });
    },
};
