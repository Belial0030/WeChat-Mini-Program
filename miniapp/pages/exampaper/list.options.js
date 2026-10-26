import pageActions from './list.actions.js';

export default {
    data() {
        return {
            list: [],
            mescroll: null, //mescroll实例对象
            downOption: {
                auto: false, //是否在初始化后,自动执行下拉回调callback; 默认true
            },
            upOption: {
                noMoreSize: 5, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
                textNoMore: '~ 没有更多了 ~',
            },
            hasNext: true,
            searchForm: {},
            CustomBar: '0',
            userid: '',
        };
    },
    onLoad(options) {
        this.userid = options.userid;
        this.hasNext = true;
        // 重新加载数据
        if (this.mescroll) this.mescroll.resetUpScroll();
    },
    methods: {
        mescrollInit: pageActions.mescrollInit,
        downCallback: pageActions.downCallback,
        upCallback: pageActions.upCallback,
        onDetailTap: pageActions.onDetailTap,
        search: pageActions.search,
    },
};
