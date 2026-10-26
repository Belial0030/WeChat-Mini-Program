import http from '@/api/http.js';

export default {
    getCurrentRoute() {
        const pages = getCurrentPages();
        if (pages.length > 0) {
            const currentPage = pages[pages.length - 1];
            this.currentRoute = currentPage.route || '';
        }
    },

    openChat() {
        this.showChat = true;
        this.showFloatBtn = false;
    },

    closeChat() {
        this.showChat = false;
        this.showFloatBtn = true;
    },

    sendMessage() {
        if (!this.inputMessage.trim() || this.loading) return;

        const userMessage = this.inputMessage.trim();
        this.messages.push({
            role: 'user',
            content: userMessage,
        });
        this.inputMessage = '';
        this.scrollToBottom();

        this.loading = true;
        http.request({
            url: 'ai/chat',
            method: 'POST',
            data: { message: userMessage },
        })
            .then((res) => {
                this.loading = false;
                if (res.data && res.data.code === 0) {
                    this.messages.push({
                        role: 'assistant',
                        content: res.data.data || '抱歉，我没有理解您的问题',
                    });
                } else {
                    this.messages.push({
                        role: 'assistant',
                        content: '服务异常，请稍后重试',
                    });
                }
                this.scrollToBottom();
            })
            .catch((err) => {
                this.loading = false;
                this.messages.push({
                    role: 'assistant',
                    content: '网络错误，请检查网络连接',
                });
                this.scrollToBottom();
            });
    },

    scrollToBottom() {
        this.$nextTick(() => {
            this.scrollTop = 99999;
        });
    },
};
