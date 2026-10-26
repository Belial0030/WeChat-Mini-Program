import createState from './forum-my.state.js';
import pageActions from './forum-my.actions.js';
import viewStyles from './forum-my.inline-styles.js';

import '@/assets/css/global-restaurant.css';
import uniIcons from '@/components/uni-ui/lib/uni-icons/uni-icons.vue';
import uniNoticeBar from '@/components/uni-ui/lib/uni-notice-bar/uni-notice-bar.vue';
export default {
    computed: {
        viewStyles() {
            return viewStyles;
        },
    },
    components: {
        uniIcons,
        uniNoticeBar,
    },
    data: createState,
    async onShow() {
        this.hasNext = true;
        // 重新加载数据
        let _this = this;
        let table = uni.getStorageSync('nowTable');
        // 获取用户信息
        let resA = await _this.$api.session(table);
        _this.user = resA.data;
        if (this.mescroll) this.mescroll.resetUpScroll();
    },
    methods: {
        mescrollInit: pageActions.mescrollInit,
        downCallback: pageActions.downCallback,
        upCallback: pageActions.upCallback,
        onDetailTap: pageActions.onDetailTap,
        onUpdateTap: pageActions.onUpdateTap,
        onDeleteTap: pageActions.onDeleteTap,
    },
};
