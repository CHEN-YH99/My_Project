import { createApp } from 'vue'
import App from './App.vue'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'
import lazy from './directives/lazy'
import router from './router'
import store from './store'

const app = createApp(App)

app.use(Quasar, quasarUserOptions)
app.use(router)
app.use(store)

app.directive('lazy', lazy)

app.mount('#app')
