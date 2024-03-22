import Vue from 'vue'
import VueRouter from 'vue-router'
import { getToken } from '@/utils/storage'
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
  const token = getToken()
  if (whiteList.includes(to.path)) {
    next()
  } else {
    if (token) {
      next()
    } else {
      Message.error('token错误，请重新登录')
      next('/login')
    }
  }
})

export default router
