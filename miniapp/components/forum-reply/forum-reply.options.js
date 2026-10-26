import pageActions from './forum-reply.actions.js';
import viewStyles from './forum-reply.inline-styles.js';

import userReply from '@/components/forum-reply/forum-reply.vue';
export default {
    computed: {
        viewStyles() {
            return viewStyles;
        },
    },
    name: 'userReply',
    components: {
        userReply,
    },
    props: {
        digest: {
            type: Array,
            default() {
                return {};
            },
        },
    },
    data() {
        return {
            newData: {},
            digestData: [],
            UNITS: {
                年: 31557600000,
                月: 2629800000,
                天: 86400000,
                小时: 3600000,
                分钟: 60000,
                秒: 1000,
            },
        };
    },
    created() {
        this.digest.forEach((vm, index) => {
            console.log(vm, index);
            if (index === 0) {
                this.newData = vm;
                // this.newData.pubDate = this.format(vm.pubDate);
            } else {
                this.digestData.push(vm);
            }
        });
    },
    methods: {
        format: pageActions.format,
        humanize: pageActions.humanize,
        parse: pageActions.parse,
        onReplyTap: pageActions.onReplyTap,
    },
};
