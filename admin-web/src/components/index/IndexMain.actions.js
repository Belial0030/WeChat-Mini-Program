export default {
    init() {
        this.$nextTick(() => {
            // let h = document.getElementsByClassName('el-aside')[0].clientHeight
            // document.getElementsByClassName('el-main')[0].style.minHeight = "calc(100vh - 60px - " + h+'px)'
        });
    },

    menuHandler(menu) {
        this.$router.push({
            name: menu.tableName,
        });
        this.title = menu.menu;
    },

    titleChange(index, menus) {
        this.currentIndex = index;
        this.itemMenu = menus;
        console.log(menus);
    },

    homeChange(index) {
        this.itemMenu = [];
        this.title = '';
        this.currentIndex = index;
        this.$router.push({
            name: 'home',
        });
    },

    centerChange(index) {
        this.itemMenu = [
            {
                buttons: ['新增', '查看', '修改', '删除'],
                menu: '修改密码',
                tableName: 'updatePassword',
            },
            {
                buttons: ['新增', '查看', '修改', '删除'],
                menu: '个人信息',
                tableName: 'center',
            },
        ];
        this.title = '';
        this.currentIndex = index;
        this.$router.push({
            name: 'home',
        });
    },
};
