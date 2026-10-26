import Vue from 'vue'
import App from './App'
import utils from './utils/utils.js'
import api from './api/index.js'
import base from './api/base.js'
import mediaUrl from './utils/media-url.js'
import * as validate from 'utils/validate.js'
// 工具类
import { isAuth } from '@/utils/system'
// AI助手组件
import AIAssistant from '@/components/ai-assistant/ai-assistant.vue'

Vue.prototype.$utils = utils
Vue.prototype.$base = base
Vue.prototype.$assetUrl = value => mediaUrl(value, base.url)
Vue.prototype.$api = api
Vue.prototype.$validate = validate
// 判断权限方法
Vue.prototype.isAuth = isAuth

// 注册全局AI助手组件
Vue.component('AIAssistant', AIAssistant)

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
