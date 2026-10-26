export default {
    async fanhui() {
        this.$utils.tab('list');
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

    async init() {
        let res = await this.$api.info('yonghu', this.yonghuId);
        this.detail = res.data;
        // 主图
        this.swiperList = this.detail.yonghuPhoto ? this.detail.yonghuPhoto.split(',') : [];
    },

    mescrollInit(mescroll) {
        this.mescroll = mescroll;
    },

    downCallback(mescroll) {
        this.hasNext = true;
        mescroll.resetUpScroll();
    },

    async upCallback(mescroll) {
        this.mescroll.endByPage(this.mescroll.num, 10);
    },

    async onErweima() {
        //打开模态框
        // this.erweimaText = "画师名称:["+this.detail.huashiName+"]所属画院:["+this.detail.huayuanName+"]画师称号:["+this.detail.huashiChenghao+"]画师性别:["+this.detail.sexValue+"]"
        this.erweimaText = '二维码内容';
        this.$refs.erweimaModal.open();
    },

    async closeErweima() {
        //关闭模态框
        this.$refs.erweimaModal.close();
    },

    async saveErweima() {
        //保存二维码
        uni.showLoading({ title: '保存中', mask: true });
        const ref = this.$refs['qr'];
        ref.save({
            success: (res) => {
                uni.hideLoading();
                uni.showToast({ icon: 'success', title: '保存成功' });
            },
            fail: (err) => {
                uni.showToast({ icon: 'none', title: JSON.stringify(err) });
            },
        });
    },
};
