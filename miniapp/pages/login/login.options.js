import createState from './login.state.js';
import pageActions from './login.actions.js';


import menu from '@/utils/menu';

export default {
    data: createState,
    onLoad() {
        let options = ['请选择登录用户类型'];
        let menus = menu.list();
        this.menuList = menus;
        for (let i = 0; i < this.menuList.length; i++) {
            if (this.menuList[i].hasFrontLogin == '是') {
                options.push(this.menuList[i].roleName);
                this.roleNum++;
            }
        }
        if (this.roleNum == 1) {
            this.index = 1;
        }
        this.options = options;


    },
    methods: {


        onRegisterTap: pageActions.onRegisterTap,
        onForgetTap: pageActions.onForgetTap,
        onLoginTap: pageActions.onLoginTap,
        optionsChange: pageActions.optionsChange,
    },
};
