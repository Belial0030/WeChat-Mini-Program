import pageActions from './IndexMain.actions.js';

import menu from '@/utils/menu';
export default {
  data() {
    return {
      menuList: [],
      role: '',
      currentIndex: -2,
      itemMenu: [],
      title: '',
    };
  },
  mounted() {
    let menus = menu.list();
    this.menuList = menus;
    this.role = this.$storage.get('role');
  },
  created() {
    this.init();
  },
  methods: {
    init: pageActions.init,
    menuHandler: pageActions.menuHandler,
    titleChange: pageActions.titleChange,
    homeChange: pageActions.homeChange,
    centerChange: pageActions.centerChange,
  },
};
