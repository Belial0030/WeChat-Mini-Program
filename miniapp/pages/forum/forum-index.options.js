import createState from './forum-index.state.js';
import pageActions from './forum-index.actions.js';

import '@/assets/css/global-restaurant.css';
export default {
    data: createState,
    async onShow() {
        this.hasNext = true;
        // 重新加载数据
        if (this.mescroll) this.mescroll.resetUpScroll();
    },
    methods: {
        mescrollInit: pageActions.mescrollInit,
        downCallback: pageActions.downCallback,
        upCallback: pageActions.upCallback,
        onDetailTap: pageActions.onDetailTap,
        onSwiperTap: pageActions.onSwiperTap,
        search: pageActions.search,
    },
};
