import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import { Message } from 'element-ui'

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: () => import('@/views/login') },
  {
    path: '/',
    component: () => import('@/views/layout'),
    redirect: '/dashboard',
    children: [
      { path: '/dashboard', component: () => import('@/views/dashboard') },
      { path: '/article', component: () => import('@/views/article') }
    ]
  },
  { path: '*', component: () => import('@/views/NotFound') }
]

const router = new VueRouter({
  routes
})

// 白名单
const whiteList = ['/login']
router.beforeEach((to, from, next) => {
  if (whiteList.includes(to.path)) {
    next()
  } else {
    const token = store.state.user.token
    if (token) {
      next()
    } else {
      Message.error('token错误，请重新登录')
      next('/login')
    }
  }
})

export default router
