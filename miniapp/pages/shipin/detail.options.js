import createState from './detail.state.js';
import pageActions from './detail.actions.js';
import viewStyles from './detail.inline-styles.js';

export default {
    data: createState,
    computed: {
        viewStyles() {
            return viewStyles;
        },
        baseUrl() {
            return this.$base.url;
        },
    },
    async onLoad(options) {
        this.shipinId = options.id;
    },
    async onShow(options) {
        // 渲染数据
        this.init();
        let table = uni.getStorageSync('nowTable');
        // 获取用户信息
        let res = await this.$api.session(table);
        this.user = res.data;
        this.btnColor = this.btnColor.sort(() => {
            return 0.5 - Math.random();
        });
        let cleanType = uni.getStorageSync('pingluenStateState');
        if (cleanType) {
            uni.removeStorageSync('pingluenStateState');
            this.mescroll.num = 1;
            this.upCallback(this.mescroll);
        }

        //添加学习足迹
        let data = {
            shipinId: this.shipinId,
        };
        await this.$api.save(`xuexizuji`, data);
    },
    destroyed: function () {
        //window.clearInterval(this.inter);
    },
    methods: {
        fanhui: pageActions.fanhui,
        download: pageActions.download,
        init: pageActions.init,
        mescrollInit: pageActions.mescrollInit,
        downCallback: pageActions.downCallback,
        upCallback: pageActions.upCallback,
        onErweima: pageActions.onErweima,
        closeErweima: pageActions.closeErweima,
        saveErweima: pageActions.saveErweima,
    },
};
