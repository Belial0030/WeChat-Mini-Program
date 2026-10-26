
import menu from '@/utils/menu';
export default {
    data() {
        return {
            isH5Plus: true,
            user: {},
            tableName: '',
            role: '',
            menuList: [],
        };
    },
    computed: {
        baseUrl() {
            return this.$base.url;
        },
    },
    async onLoad() {
        this.role = uni.getStorageSync('role');
        let table = uni.getStorageSync('nowTable');
        let res = await this.$api.session(table);
        this.user = res.data;
        this.tableName = table;
        let menus = menu.list();
        this.menuList = menus;
    },
    async onShow() {
        this.role = uni.getStorageSync('role');
        let table = uni.getStorageSync('nowTable');
        let res = await this.$api.session(table);
        this.user = res.data;
        this.tableName = table;
        let menus = menu.list();
        this.menuList = menus;
    },
    methods: {
        chooseLocation() {
            uni.chooseLocation({
                success: function (data) {},
            });
        },
        onPageTap(url) {
            uni.navigateTo({
                url: url,
                fail: function () {
                    uni.switchTab({
                        url: url,
                    });
                },
            });
        },
    },
};
