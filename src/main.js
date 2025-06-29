import { createApp } from 'vue'
import App from './App.vue'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'
import lazy from './directives/lazy'
import { createRouter, createWebHistory } from 'vue-router'
import ShopDetail from '@/components/ShopDetail.vue'

const app = createApp(App)
app.use(Quasar, quasarUserOptions)
app.directive('lazy', lazy)

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

app.use(router)

app.mount('#app')
