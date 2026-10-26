import createState from './login.state.js';
import pageActions from './login.actions.js';
import menu from '@/utils/menu';
export default {
  data: createState,
  mounted() {
    this.menus = menu.list();
    this.roleOptions = this.menus
      .filter((item) => item.hasBackLogin === '是')
      .map((item) => ({ key: item.roleName, value: item.tableName }));
  },
  methods: { register: pageActions.register, login: pageActions.login },
};
