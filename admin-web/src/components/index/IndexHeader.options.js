export default {
  props: { navigationOpen: Boolean },
  mounted() {
    const sessionTable = this.$storage.get('sessionTable');
    if (!sessionTable) return;
    this.$http({ url: sessionTable + '/session', method: 'get' }).then(({ data }) => {
      if (data && data.code === 0) this.$storage.set('userid', data.data.id);
      else this.$message.error(data.msg);
    });
  },
  methods: {
    onLogout() {
      this.$storage.clear();
      this.$router.replace({ name: 'login' });
    },
  },
};
