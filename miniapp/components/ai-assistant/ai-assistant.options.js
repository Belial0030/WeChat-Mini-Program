import pageActions from './ai-assistant.actions.js';

export default {
    name: 'AIAssistant',
    data() {
        return {
            showFloatBtn: true,
            showChat: false,
            inputMessage: '',
            messages: [],
            loading: false,
            scrollTop: 0,
            currentRoute: '',
        };
    },
    computed: {
        shouldShow() {
            const excludePages = [
                'pages/exampaper/exam',
                'pages/login/login',
                'pages/register/register',
                'pages/forget/forget',
            ];
            for (let page of excludePages) {
                if (this.currentRoute.includes(page)) {
                    return false;
                }
            }
            return true;
        },
    },
    mounted() {
        this.getCurrentRoute();
    },
    onShow() {
        this.getCurrentRoute();
    },
    methods: {
        getCurrentRoute: pageActions.getCurrentRoute,
        openChat: pageActions.openChat,
        closeChat: pageActions.closeChat,
        sendMessage: pageActions.sendMessage,
        scrollToBottom: pageActions.scrollToBottom,
    },
};
