import Vue from 'vue'
import moment from 'moment'
import accounting from 'accounting'
import router from './utils/router'
import store from './store'
import App from './App'
import ElementUI from 'element-ui'
import { Tabs, TabPane } from 'iview'
Vue.component('Tabs', Tabs)
Vue.component('TabPane', TabPane)
// import 'element-ui/lib/theme-default/index.css'
import 'element-ui/lib/theme-chalk/index.css'
/* eslint-disable */

// import iView from 'iview'
import 'iview/dist/styles/iview.css'

moment.locale('zh-cn')

Vue.filter('formatDate', value => moment(+value).format('YYYY-MM-DD HH:mm:ss'))

Vue.filter('relativeTime', value => moment(+value).startOf().fromNow(true))

Vue.filter('formatMoney', value => accounting.formatMoney(value, '¥'))

Vue.config.productionTip = false

Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
