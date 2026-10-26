import router from '@/router/router-static';
import menu from '@/utils/menu';
const descriptions = {
  shipin: ['el-icon-video-camera', '组织课程视频，传递实用的安全知识'],
  exampaper: ['el-icon-document', '维护培训试卷与选题安排'],
  examquestion: ['el-icon-reading', '整理试题，让练习更有针对性'],
  examrecord: ['el-icon-data-analysis', '查看考试记录，了解学习成果'],
  examrewrongquestion: ['el-icon-notebook-2', '关注薄弱知识点与错题反馈'],
  xuexizuji: ['el-icon-time', '跟进学习过程与课程进度'],
  yonghu: ['el-icon-user', '维护学习账号与用户信息'],
  forum: ['el-icon-chat-dot-round', '管理讨论内容，分享安全经验'],
  news: ['el-icon-bell', '发布培训公告与学习提醒'],
};
export default {
  computed: {
    shortcuts() {
      const role = menu.list().find((item) => item.roleName === this.$storage.get('role'));
      if (!role) return [];
      return role.backMenu
        .reduce((all, group) => all.concat(group.child), [])
        .filter((item) => descriptions[item.tableName] && item.buttons.indexOf('查看') !== -1)
        .map((item) =>
          Object.assign({}, item, {
            icon: descriptions[item.tableName][0],
            description: descriptions[item.tableName][1],
          })
        );
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      if (this.$storage.get('Token')) {
        this.$http({
          url: `${this.$storage.get('sessionTable')}/session`,
          method: 'get',
        }).then(({ data }) => {
          if (data && data.code != 0) {
            router.push({ name: 'login' });
          }
        });
      } else {
        router.push({ name: 'login' });
      }
    },
  },
};
