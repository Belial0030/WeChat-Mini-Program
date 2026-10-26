import viewStyles from './detail.inline-styles.js';

export default {
    computed: {
        viewStyles() {
            return viewStyles;
        },
    },
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
            //试卷信息
            headDate: {},
        };
    },
    onShow() {
        this.hasNext = true;
        // 重新加载数据
        if (this.mescroll) this.mescroll.resetUpScroll();
    },
    onLoad(options) {
        this.hasNext = true;
        this.headDate = JSON.parse(options.item);
        // 重新加载数据
        if (this.mescroll) this.mescroll.resetUpScroll();
    },
    methods: {
        // mescroll组件初始化的回调,可获取到mescroll对象
        mescrollInit(mescroll) {
            this.mescroll = mescroll;
        },
        /*下拉刷新的回调 */
        downCallback(mescroll) {
            this.hasNext = true;
            // 重置分页参数页数为1
            mescroll.resetUpScroll();
        },
        /*上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10 */
        async upCallback(mescroll) {
            let _this = this;
            let res = await _this.$api.page(`examredetails`, {
                page: mescroll.num,
                limit: mescroll.size,
                examredetailsUuidNumber: _this.headDate.examrecordUuidNumber,
            });
            // 如果是第一页数据置空
            if (mescroll.num == 1) _this.list = [];
            _this.list = _this.list.concat(res.data.list);
            if (res.data.list.length == 0) _this.hasNext = false;
            //试卷名称
            _this.totalScore = _this.list[0].totalScore;
            mescroll.endSuccess(mescroll.size, _this.hasNext);
        },
    },
};
