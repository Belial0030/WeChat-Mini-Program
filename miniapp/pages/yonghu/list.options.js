import createState from './list.state.js';
import pageActions from './list.actions.js';
import viewStyles from './list.inline-styles.js';

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
    async onShow() {
        this.btnColor = this.btnColor.sort(() => {
            return 0.5 - Math.random();
        });

        let _this = this;
        let table = uni.getStorageSync('nowTable');
        // 获取用户信息
        let resA = await _this.$api.session(table);
        _this.user = resA.data;
        _this.btnColor = _this.btnColor.sort(() => {
            return 0.5 - Math.random();
        });

        this.hasNext = true;
        // 重新加载数据
        if (this.mescroll) this.mescroll.resetUpScroll();
    },
    onLoad() {
        this.hasNext = true;
        // 重新加载数据
        if (this.mescroll) this.mescroll.resetUpScroll();
    },
    methods: {
        showDrawer: pageActions.showDrawer,
        closeDrawer: pageActions.closeDrawer,
        download: pageActions.download,
        queryChange: pageActions.queryChange,
        mescrollInit: pageActions.mescrollInit,
        downCallback: pageActions.downCallback,
        upCallback: pageActions.upCallback,
        onSelectTap: pageActions.onSelectTap,
        onDetailTap: pageActions.onDetailTap,
        onUpdateTap: pageActions.onUpdateTap,
        onAddTap: pageActions.onAddTap,
        onDeleteTap: pageActions.onDeleteTap,
        search: pageActions.search,
    },
};
