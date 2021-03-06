import Vue from 'vue'
import Router from 'vue-router'
/* // page */
import Index from '@/views/index'
import Home from '@/views/home'
// demo
import grid from '@/views/demo/grid'
import picker from '@/views/demo/picker'
import eleTable from '@/views/demo/eleTable'

// import config from './config'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: Index,
      // meta: { requireAuth: true },
      children: [
        {
          path: 'grid',
          name: 'grid',
          component: grid
        }
      ]
    },
    {
      path: '/picker',
      name: 'picker',
      component: picker
    },
    {
      path: '/eleTable',
      name: 'eleTable',
      component: eleTable
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
})

router.beforeEach((to, from, next) => {
  next()
})
router.afterEach((to, from) => {
})

export default router
