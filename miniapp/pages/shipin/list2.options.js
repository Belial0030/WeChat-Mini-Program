import createState from './list2.state.js';
import pageActions from './list2.actions.js';
import viewStyles from './list2.inline-styles.js';

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

        //当前表的 视频类型 字段 字典表查询方法
        let shipinTypes = await this.$api.page('dictionary', {
            page: 1,
            limit: 100,
            dicCode: 'shipin_types',
        });
        this.shipinTypesList = shipinTypes.data.list;
        shipinTypes.data.list.splice(0, 0, { codeIndex: 0, indexName: '全部' });
        this.categoryList = shipinTypes.data.list;

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
        download: pageActions.download,
        queryChange: pageActions.queryChange,
        categoryClick: pageActions.categoryClick,
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
