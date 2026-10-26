import createState from './index.state.js';
import pageActions from './index.actions.js';
import textSummary from '@/utils/text-summary.js';

import menu from '@/utils/menu';
import '@/assets/css/global-restaurant.css';
import uniIcons from '@/components/uni-ui/lib/uni-icons/uni-icons.vue';
export default {
    components: {
        uniIcons,
    },
    data: createState,
    computed: {
        baseUrl() {
            return this.$base.url;
        },
    },
    async onLoad() {
        let _this = this;
        _this.role = uni.getStorageSync('role');
        _this.table = uni.getStorageSync('nowTable');
        let res = await _this.$api.session(_this.table);
        _this.user = res.data;
        _this.tableName = _this.table;
        let menus = menu.list();
        _this.menuList = menus;
        _this.menuList.forEach((item, key) => {
            if (_this.role == item.roleName) {
                item.backMenu.forEach((item2, key2) => {
                    if (item2.child[0].buttons.indexOf('查看') > -1) {
                        _this.swiperMenuList.push(item2);
                    }
                });
            }
        });
    },
    async onShow() {
        // 轮播图
        let swiperList = [];
        let res = await this.$api.page('config', {
            page: 1,
            limit: 5,
        });
        for (let item of res.data.list) {
            if (item.value && item.value != '' && item.value != null) {
                swiperList.push({
                    img: item.value,
                    title: item.name,
                });
            }
        }
        if (swiperList) {
            this.swiperList = swiperList;
        }
        let news = await this.$api.list('news', {
            page: 1,
            limit: 6,
        });

        this.newsList = news.data.list;
        this.newsList.forEach(function (item, index) {
            if (item.newsContent != null && item.newsContent != '' && item.newsContent != 'null') {
                item.newsContent = item.newsContent.replace(
                    /<img [^>]*src=['"]([^'"]+)[^>]*>/gi,
                    '',
                ); //替换图片
            }
        });

        let shipin = await this.$api.list('shipin', {
            page: 1,
            limit: 6,
        });

        this.shipinList = shipin.data.list;
        this.shipinList.forEach(function (item, index) {
            if (
                item.shipinContent != null &&
                item.shipinContent != '' &&
                item.shipinContent != 'null'
            ) {
                item.shipinContent = item.shipinContent.replace(
                    /<img [^>]*src=['"]([^'"]+)[^>]*>/gi,
                    '',
                ); //替换图片
            }
        });
    },

    methods: {
        plainSummary(content) { return textSummary(content, 100); },
        onPageTap2: pageActions.onPageTap2,
        onSwiperTap: pageActions.onSwiperTap,
        onNewsDetailTap: pageActions.onNewsDetailTap,
        onDetailTap: pageActions.onDetailTap,
        onPageTap: pageActions.onPageTap,
    },
};
