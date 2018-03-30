import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
/* // page */
import Login from '@/views/login'
import Index from '@/views/index'
import redirect from '@/views/redirect'
import PersonalQueue from '@/views/personalQueue' // 个人队列
import CaseDetail from '@/views/caseDetail' // 案例详情
/* 查询 */
import BeachSearch from '@/views/search/beachSearch' // 实时批量查询
import WorkQualitySearch from '@/views/search/workQualitySearch' // 作业质量查询
import ColligateSearch from '@/views/search/colligateSearch' // 综合查询

import InboundSearch from '@/views/search/inboundSearch' // inbound查询
/* 主管权限 */
import ManualEntrust from '@/views/manualEntrust' // 手工委托
import PersonSearch from '@/views/search/personSearch' // 人员查询
import DebitApproval from '@/views/debitApproval' // 扣款审批
/* 数据统计 */
import personAnalysis from '@/views/statistics/personAnalysis' // 人员分析
import dataStatistics from '@/views/statistics/dataStatistics' // 人员分析
import ClassTable from '@/views/classTable' // 班表
import Report from '@/views/report' // 报表

import Home from '@/views/home'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: Index,
      // meta: { requireAuth: true },
      children: [
        {
          path: '',
          name: '首页',
          component: Home,
          meta: {
            keepAlive: true // 需要被缓存
          }
        }, {
          path: 'personalQueue',
          name: '个人队列',
          component: PersonalQueue,
          meta: {
            keepAlive: true // 需要被缓存
          }
        }, {
          path: 'refresh',
          name: '',
          component: redirect,
          meta: {
            keepAlive: true // 需要被缓存
          }
        }, {
          path: 'caseDetail',
          name: '队列详细',
          component: CaseDetail,
          meta: {
            keepAlive: true // 需要被缓存
          }
        }, {
          path: 'beachSearch',
          name: '批量查询',
          component: BeachSearch,
          meta: {
            keepAlive: true // 需要被缓存
          }
        }, {
          path: 'inboundSearch',
          name: 'inbound查询',
          component: InboundSearch,
          meta: {
            keepAlive: true // 需要被缓存
          }
        }, {
          path: 'colligateSearch',
          name: '综合查询',
          component: ColligateSearch,
          meta: {
            keepAlive: true // 需要被缓存
          }
        }, {
          path: 'manualEntrust',
          name: '手工委托',
          component: ManualEntrust,
          meta: {
            keepAlive: true // 需要被缓存
          }
        }, {
          path: 'personSearch',
          name: '人员查询',
          component: PersonSearch,
          meta: {
            keepAlive: true // 需要被缓存
          }
        }, {
          path: 'workQualitySearch',
          name: '作业质量查询',
          component: WorkQualitySearch,
          meta: {
            keepAlive: true // 需要被缓存
          }
        }, {
          path: 'classTable',
          name: '班表',
          component: ClassTable,
          meta: {
            keepAlive: true // 需要被缓存
          }
        }, {
          path: 'report',
          name: '报表',
          component: Report,
          meta: {
            keepAlive: true // 需要被缓存
          }
        }, {
          path: 'debitApproval',
          name: '扣款审批',
          component: DebitApproval,
          meta: {
            keepAlive: true // 需要被缓存
          }
        }, {
          path: 'personAnalysis',
          name: '员工分析',
          component: personAnalysis,
          meta: {
            keepAlive: true // 需要被缓存
          }
        }, {
          path: 'dataStatistics',
          name: '数据统计',
          component: dataStatistics,
          meta: {
            keepAlive: true // 需要被缓存
          }
        }
      ]
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '*',
      redirect: '/'
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
  let exTabs = store.state.tabs.excludeTab
  let exIdx = exTabs.findIndex(val => {
    return val.url === to.path
  })
  if (exIdx > -1) {
    exTabs.splice(exIdx, 1)
    store.commit('SET_EX_TAB', exTabs)
    store.commit('SET_KEEP', false)
  }
  store.dispatch('newTab', {url: to.path, name: to.name})
})

export default router
