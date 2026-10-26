export default {
    onPageTap2(url) {
        uni.setStorageSync('useridTag', 0);
        uni.navigateTo({
            url: url,
            fail: function () {
                uni.switchTab({
                    url: url,
                });
            },
        });
    },

    onSwiperTap(e) {},

    onNewsDetailTap(id) {
        this.$utils.jump(`../news/detail?id=${id}`);
    },

    onDetailTap(tableName, id) {
        this.$utils.jump(`../${tableName}/detail?id=${id}`);
    },

    onPageTap(tableName) {
        uni.navigateTo({
            url: `../${tableName}/list`,
            fail: function () {
                uni.switchTab({
                    url: `../${tableName}/list`,
                });
            },
        });
    },
};
