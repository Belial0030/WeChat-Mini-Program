import menu from '@/utils/menu';
const icons = {
  users: 'el-icon-s-custom',
  dictionaryKemu: 'el-icon-set-up',
  forum: 'el-icon-chat-dot-round',
  news: 'el-icon-bell',
  shipin: 'el-icon-video-camera',
  xuexizuji: 'el-icon-time',
  yonghu: 'el-icon-user',
  exampaper: 'el-icon-document',
  examquestion: 'el-icon-reading',
  examrecord: 'el-icon-data-analysis',
  config: 'el-icon-picture',
};
export default {
  computed: {
    visibleMenus() {
      const role = menu.list().find((item) => item.roleName === this.$storage.get('role'));
      return role ? role.backMenu : [];
    },
  },
  methods: {
    menuHandler(name) {
      this.$router.push('/' + name);
    },
    menuIcon(table) {
      return icons[table] || 'el-icon-folder-opened';
    },
  },
};
