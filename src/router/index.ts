import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const route = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/components/Layout/index.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginAndRegister/index.vue')
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes: route as RouteRecordRaw[],
  scrollBehavior: (to, from, savedPosition) => (savedPosition ? savedPosition : { top: 0, left: 0 })
})

export default router
