import createState from './list.state.js';
import pageActions from './list.actions.js';

export default {
    data: createState,
    computed: {
        baseUrl() {
            return this.$base.url;
        },
    },
    async onShow() {

        let _this = this;
        let table = uni.getStorageSync('nowTable');
        // 获取用户信息
        let resA = await _this.$api.session(table);
        _this.user = resA.data;

        //当前表的 视频类型 字段 字典表查询方法
        this.shipinTypesSelect();

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
        shipinTypesSelect: pageActions.shipinTypesSelect,
        shipinTypesCategoryClick: pageActions.shipinTypesCategoryClick,
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
