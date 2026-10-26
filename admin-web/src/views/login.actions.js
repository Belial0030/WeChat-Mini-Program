export default {
  register(tableName) {
    this.$storage.set('loginTable', tableName);
    this.$router.push({ path: '/register' });
  },
  async login() {
    if (this.isSubmitting) return;
    if (!this.rulesForm.username) return this.$message.error('请输入用户名');
    if (!this.rulesForm.password) return this.$message.error('请输入密码');
    const selected =
      this.roleOptions.length === 1
        ? this.roleOptions[0]
        : this.roleOptions.find((item) => item.value === this.rulesForm.role);
    if (!selected) return this.$message.error('请选择登录身份');
    this.isSubmitting = true;
    try {
      const { data } = await this.$http({
        url: `${selected.value}/login`,
        method: 'post',
        params: { username: this.rulesForm.username, password: this.rulesForm.password },
      });
      if (!data || data.code !== 0) {
        this.$message.error((data && data.msg) || '登录失败，请重试');
        return;
      }
      this.$storage.set('Token', data.token);
      this.$storage.set('userId', data.userId);
      this.$storage.set('role', selected.key);
      this.$storage.set('sessionTable', selected.value);
      this.$storage.set('adminName', this.rulesForm.username);
      this.$router.replace({ path: '/index/' });
    } catch (error) {
      this.$message.error('暂时无法登录，请检查网络后重试');
    } finally {
      this.isSubmitting = false;
    }
  },
};
