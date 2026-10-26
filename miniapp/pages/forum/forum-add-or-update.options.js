import viewStyles from './forum-add-or-update.inline-styles.js';

export default {
    data() {
        return {
            forum: {
                forumContent: '',
                id: '',
                forumName: '',
                forumTypes: null,
                forumStateTypes: 1,
            },
            username: '',
            user: {},
        };
    },
    computed: {
        viewStyles() {
            return viewStyles;
        },
        baseUrl() {
            return this.$base.url;
        },
    },
    async onLoad(options) {
        let _this = this;
        let table = uni.getStorageSync('nowTable');
        // 获取用户信息
        let res = await _this.$api.session(table);
        _this.user = res.data;
        if (table == `yonghu`) {
            _this.yonghuId = _this.user.id;
        }
        if (options.id) {
            _this.id = options.id;
            let res = await _this.$api.info('forum', _this.id);
            _this.forum = res.data;
        }
        _this.styleChange();
    },
    methods: {
        styleChange() {
            this.$nextTick(() => {
                // document.querySelectorAll('.my-publish-pv .uni-yaoxianStyle-yaoxianStyle').forEach(el=>{
                //   el.style.backgroundColor = this.myPublishForm.content.yaoxianStyle.backgroundColor
                // })
            });
        },
        async onSubmitTap() {
            this.forum.username = this.username;
            if (this.id) {
                await this.$api.update('forum', this.forum);
            } else {
                await this.$api.save('forum', this.forum);
            }
            this.$utils.msgBack('操作成功');
        },
    },
};
