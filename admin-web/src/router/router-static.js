import Vue from 'vue';
//配置路由
import VueRouter from 'vue-router'
Vue.use(VueRouter);
    // 解决多次点击左侧菜单报错问题
    const VueRouterPush = VueRouter.prototype.push
    VueRouter.prototype.push = function push (to) {
    return VueRouterPush.call(this, to).catch(err => err)
    }
//1.创建组件
const Index = () => import('@/views/index');
const Home = () => import('@/views/home');
const Login = () => import('@/views/login');
const NotFound = () => import('@/views/404');
const UpdatePassword = () => import('@/views/update-password');
const register = () => import('@/views/register');
const center = () => import('@/views/center');import users from '@/views/modules/users/list'
const dictionary = () => import('@/views/modules/dictionary/list');import exampaper from '@/views/modules/exampaper/list'
const exampapertopic = () => import('@/views/modules/exampapertopic/list');import examquestion from '@/views/modules/examquestion/list'
const examrecord = () => import('@/views/modules/examrecord/list');import examredetails from '@/views/modules/examredetails/list'
const examrewrongquestion = () => import('@/views/modules/examrewrongquestion/list');import forum from '@/views/modules/forum/list'
const news = () => import('@/views/modules/news/list');import shipin from '@/views/modules/shipin/list'
const xuexizuji = () => import('@/views/modules/xuexizuji/list');import yonghu from '@/views/modules/yonghu/list'
const config = () => import('@/views/modules/config/list');import dictionaryExampaper from '@/views/modules/dictionaryExampaper/list'
const dictionaryExamquestion = () => import('@/views/modules/dictionaryExamquestion/list');import dictionaryForumState from '@/views/modules/dictionaryForumState/list'
const dictionaryKemu = () => import('@/views/modules/dictionaryKemu/list');import dictionaryNews from '@/views/modules/dictionaryNews/list'
const dictionarySex = () => import('@/views/modules/dictionarySex/list');import dictionaryShipin from '@/views/modules/dictionaryShipin/list'
const dictionaryXuexizuji = () => import('@/views/modules/dictionaryXuexizuji/list');import dictionaryZujuan from '@/views/modules/dictionaryZujuan/list'





//2.配置路由   注意：名字
const routes = [{
    path: '/index',
    name: '首页',
    component: Index,
    children: [{
      // 这里不设置值，是把main作为默认页面
      path: '/',
      name: '首页',
      component: Home,
      meta: {icon:'', title:'center'}
    }, {
      path: '/updatePassword',
      name: '修改密码',
      component: UpdatePassword,
      meta: {icon:'', title:'updatePassword'}
    }, {
      path: '/center',
      name: '个人信息',
      component: center,
      meta: {icon:'', title:'center'}
    } ,{
        path: '/users',
        name: '管理信息',
        component: users
      }
    ,{
        path: '/dictionaryExampaper',
        name: '试卷状态',
        component: dictionaryExampaper
    }
    ,{
        path: '/dictionaryExamquestion',
        name: '试题类型',
        component: dictionaryExamquestion
    }
    ,{
        path: '/dictionaryForumState',
        name: '帖子状态',
        component: dictionaryForumState
    }
    ,{
        path: '/dictionaryKemu',
        name: '科目',
        component: dictionaryKemu
    }
    ,{
        path: '/dictionaryNews',
        name: '公告类型',
        component: dictionaryNews
    }
    ,{
        path: '/dictionarySex',
        name: '性别类型',
        component: dictionarySex
    }
    ,{
        path: '/dictionaryShipin',
        name: '视频分类',
        component: dictionaryShipin
    }
    ,{
        path: '/dictionaryXuexizuji',
        name: '学习状态',
        component: dictionaryXuexizuji
    }
    ,{
        path: '/dictionaryZujuan',
        name: '组卷方式',
        component: dictionaryZujuan
    }
    ,{
        path: '/config',
        name: '轮播图',
        component: config
    }


    ,{
        path: '/dictionary',
        name: '字典',
        component: dictionary
      }
    ,{
        path: '/exampaper',
        name: '试卷表',
        component: exampaper
      }
    ,{
        path: '/exampapertopic',
        name: '试卷选题',
        component: exampapertopic
      }
    ,{
        path: '/examquestion',
        name: '试题表',
        component: examquestion
      }
    ,{
        path: '/examrecord',
        name: '考试记录表',
        component: examrecord
      }
    ,{
        path: '/examredetails',
        name: '答题详情表',
        component: examredetails
      }
    ,{
        path: '/examrewrongquestion',
        name: '错题表',
        component: examrewrongquestion
      }
    ,{
        path: '/forum',
        name: '论坛',
        component: forum
      }
    ,{
        path: '/news',
        name: '公告信息',
        component: news
      }
    ,{
        path: '/shipin',
        name: '视频信息',
        component: shipin
      }
    ,{
        path: '/xuexizuji',
        name: '学习足迹',
        component: xuexizuji
      }
    ,{
        path: '/yonghu',
        name: '用户',
        component: yonghu
      }


    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {icon:'', title:'login'}
  },
  {
    path: '/register',
    name: 'register',
    component: register,
    meta: {icon:'', title:'register'}
  },
  {
    path: '/',
    name: '首页',
    redirect: '/index'
  }, /*默认跳转路由*/
  {
    path: '*',
    component: NotFound
  }
]
//3.实例化VueRouter  注意：名字
const router = new VueRouter({
  mode: 'hash',
  /*hash模式改为history*/
  routes // （缩写）相当于 routes: routes
})

export default router;
