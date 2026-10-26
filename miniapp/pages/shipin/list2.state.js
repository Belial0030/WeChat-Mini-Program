export default function data() {
    return {
        categoryList: [],
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
        queryList: [
            {
                queryName: '视频信息名称',
            },
        ],
        sactiveItem: {
            padding: '0',
            boxShadow: '0 0 0px rgba(0,0,0,.3)',
            margin: '0 12rpx 8rpx 0',
            borderColor: 'rgba(0,0,0,1)',
            backgroundColor: 'var(--publicMainColor)',
            color: '#fff',
            borderRadius: '0 40rpx 40rpx 0',
            borderWidth: '0',
            width: 'auto',
            lineHeight: '160rpx',
            fontSize: '28rpx',
            borderStyle: 'solid',
        },
        sitem: {
            padding: '0',
            boxShadow: '0 0 0px rgba(0,0,0,.3)',
            margin: '0 12rpx 8rpx 0',
            borderColor: 'rgba(0,0,0,1)',
            backgroundColor: 'var(--publicSubColor)',
            color: '#fff',
            borderRadius: '0 40rpx 40rpx 0',
            borderWidth: '0',
            width: 'auto',
            lineHeight: '160rpx',
            fontSize: '28rpx',
            borderStyle: 'solid',
        },

        list: [],
        user: {},
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
        /*1111*/
        shipinTypesList: [],
        categoryName: 0,
        CustomBar: '0',
    };
}
