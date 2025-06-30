/* eslint-disable no-unused-vars */
import { createRouter, createWebHistory } from 'vue-router';
import App from '@/App.vue'
import ShopDetail from '@/components/ShopDetail.vue'
import LoginUser from '@/components/LoginUser.vue'

const routes = [
  {
    path: '/',
    name: 'App',
    component: () => import('@/App.vue'),
  },
  {
    path: '/detail/:id',
    name: 'ShopDetail',
    component: ShopDetail,
    props: true
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginUser
  },
  // 其他路由...
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
