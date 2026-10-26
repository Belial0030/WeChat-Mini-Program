export default function data() {
    return {
        /*其他     开始*/
        autoplaySwiper: false ? true : false,
        intervalSwiper: false ? $template2.front.base.swiper.autoplay.delay : 5000,
        btnColor: [
            '#67c23a',
            '#909399',
            '#e6a23c',
            '#f56c6c',
            '#356c6c',
            '#3498db',
            '#f093a9',
            '#a7c23a',
            '#104eff',
            '#90f794',
            '#a21233',
            '#8e44ad',
        ],
        mescroll: null, //mescroll实例对象
        downOption: {
            auto: false, //是否在初始化后,自动执行下拉回调callback; 默认true
        },
        upOption: {
            noMoreSize: 3, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
            textNoMore: '~ 没有更多了 ~',
        },
        hasNext: true,
        /*其他     结束*/
        shipinId: '',
        detail: {}, //本页面数据对象
        swiperList: [], //主图
        user: {}, //登录用户信息
        collectionFlag: 0, //收藏
        /*留言评论评分相关     开始*/
        totalScore: 0, //总评分
        scoreData: 0, //评分
        commentData: null, //留言
        commentList: [], //留言数据集合
        /*留言评论评分相关     结束*/
        erweimaText: '',
    };
}
