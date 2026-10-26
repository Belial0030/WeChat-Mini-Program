export default {
    async fanhui() {
        let data = [
            {
                key: 'shipinId',
                val: this.shipinId,
            },
        ];
        await this.$api.requestCondition('xuexizuji', 'jieshuxuexi', data);
        this.$utils.msgBack('操作成功');
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
        let res = await this.$api.info('shipin', this.shipinId);
        this.detail = res.data;
        this.detail.shipinContent = this.detail.shipinContent
            .replace('<img', '<img  class="daxiao"')
            .replace('src="upload/', 'src="' + this.$base.url + 'upload/');
        // 主图
        this.swiperList = this.detail.shipinPhoto ? this.detail.shipinPhoto.split(',') : [];
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
