import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
/* // page */
import Index from '@/views/index'
import Home from '@/views/home'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: Index,
      // meta: { requireAuth: true },
      children: []
    },
    {
      path: '/home',
      name: '首页',
      component: Home,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '*',
      redirect: '/home'
    }
  ]
  // mode: 'history',
  // scrollBehavior (to, from, savedPosition) {
  //   // 如果你的連結是帶 # 這種
  //   // to.hash 就會有值(值就是連結)
  //   // 例如 #3
  //   if (to.hash) {
  //     return {
  //       // 這個是透過 to.hash 的值來找到對應的元素
  //       // 照你的 html 來看是不用多加處理這樣就可以了
  //       // 例如你按下 #3 的連結，就會變成 querySelector('#3')，自然會找到 id = 3 的元素
  //       selector: to.hash
  //     }
  //   }
  // }
})

router.beforeEach((to, from, next) => {
  if (to.path === '/refresh') {
    store.commit('SET_EXCLUDE_ROUTER', from.path)
    next()
  } else {
    // let exTabs = store.state.tabs.excludeTab
    // if (exTabs.findIndex(val => { return val.url === to.path }) > -1) {
    //   console.info('before')
    //   store.commit('SET_EXCLUDE_ROUTER', to.path)
    // } else {
    // }
    next()
  }
  // if (to.matched.some(r => r.meta.requireAuth)) {
  // console.log('this page need login')
  // if (localStorage.getItem('token')) {
  //   next()
  // } else {
  //   next({
  //     path: '/login',
  //     query: {
  //       redirect: to.fullPath
  //     }
  //   })
  // }
  // } else {
  //   next()
  // }
})
router.afterEach((to, from) => {
})

export default router
