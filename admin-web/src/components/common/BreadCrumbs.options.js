export default {
    computed: {
        isHome() { return ['/', '/index', '/index/'].indexOf(this.$route.path) !== -1; },
        currentLabel() { return String(this.$route.name || '页面').replace(/表$/, ''); },
    },
};
