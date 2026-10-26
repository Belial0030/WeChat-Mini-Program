import viewStyles from './forum-detail.inline-styles.js';

import userReply from '@/components/forum-reply/forum-reply.vue';
export default {
    components: {
        userReply,
    },
    data() {
        return {
            commentData: [],
            forum: {},
            user: {},
            forumPhoto: null,
            forumContent: null,
            yonghuId: null,
            id: '',
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
        this.id = options.id;
        let table = uni.getStorageSync('nowTable');
        // 获取用户信息
        let user = await this.$api.session(table);
        this.user = user.data;

        let res = await this.$api.info('forum', options.id);
        this.forum = res.data;
        let params = {
            superIds: this.forum.id,
            forumStateTypes: 2,
        };
        let commentDataList = await this.$api.list('forum', params);
        this.commentData = commentDataList.data.list;
    },
    async onShow() {},
    methods: {
        onChatTap() {
            this.$refs.popup.open();
            this.forumContent = null;
        },
        // 完成审核
        async onFinishTap() {
            let _this = this;
            if (_this.forumContent == null || _this.forumContent == '') {
                _this.$utils.msg('请填写评论内容');
                return;
            }
            let params = {
                superIds: _this.forum.id,
                forumStateTypes: 2,
                yonghuId: _this.user.id,
                forumContent: _this.forumContent,
            };
            await _this.$api.save('forum', params);
            _this.$utils.msg('评论成功');
            _this.$refs.popup.close();
            uni.redirectTo({
                url: '/pages/forum/forum-detail?id=' + _this.forum.id,
            });
        },
        // 关闭窗口
        onCloseWinTap() {
            this.$refs.popup.close();
        },
    },
};
