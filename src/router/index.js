import Vue from 'vue'
import VueRouter from 'vue-router'

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

export default router
