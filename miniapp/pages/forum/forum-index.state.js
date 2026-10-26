export default function data() {
    return {
        //轮播
        swiperList: [],
        list: [],
        searchForm: {},
        mescroll: null, //mescroll实例对象
        downOption: {
            auto: false, //是否在初始化后,自动执行下拉回调callback; 默认true
        },
        upOption: {
            page: {
                // num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
                // size: 5 // 每页数据的数量
            },
            noMoreSize: 3, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
            textNoMore: '~ 没有更多了 ~',
        },
        hasNext: true,
    };
}
