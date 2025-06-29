import { createRouter, createWebHistory } from 'vue-router'
import ShopDetail from '@/components/ShopDetail.vue'

const routes = [
  {
    path: '/detail/:id',
    name: 'ShopDetail',
    component: ShopDetail
  },
  // 其他路由...
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
