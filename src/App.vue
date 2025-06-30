<template>
  <div class="app-container">
    <TopNav @show-login="showLogin = true" />
    <LoginUser
      v-if="showLogin"
      @close="showLogin = false"
      @show-register="switchToRegister"
    />
    <RegisterUser
      v-if="showRegister"
      @close="showRegister = false"
      @show-login="switchToLogin"
    />
    <SearchBar v-if="$route.name !== 'ShopDetail'" />
    <div v-if="$route.name !== 'ShopDetail'">
      <BannerBar />
      <div class="main-layout">
        <aside class="sidebar">
          <SideBar />
        </aside>
        <section class="main-content">
          <ProductSection title="手机" :products="products.phone" />
          <div v-lazy>
            <ProductSection title="电脑" :products="products.computer" />
          </div>
          <div v-lazy>
            <ProductSection title="电脑外设" :products="products.peripheral" />
          </div>
          <div v-lazy>
            <ProductSection title="电脑配件" :products="products.parts" />
          </div>
        </section>
      </div>
    </div>
    <!-- <router-view :products="products" /> -->
    <FooterBar />
  </div>
</template>
<script setup>
import { reactive, ref, provide } from 'vue'
import { nanoid } from 'nanoid'
import TopNav from './components/TopNav.vue'
import SearchBar from './components/SearchBar.vue'
import BannerBar from './components/BannerBar.vue'
import SideBar from './components/SideBar.vue'
import ProductSection from './components/ProductSection.vue'
import FooterBar from './components/FooterBar.vue'
import LoginUser from './components/LoginUser.vue'
import RegisterUser from './components/RegisterUser.vue'

const products = reactive({
  phone: [
    { id: nanoid(), name: 'vivo iQOO Neo5 SE', price: 2099, img: new URL('@/assets/images/8d8e7935-5ff3-4eb5-942c-e5435bd50b32_w864_h576.jpeg', import.meta.url).href },
    { id: nanoid(), name: '华为 Mate 40', price: 5499, img: new URL('@/assets/images/8d8e7935-5ff3-4eb5-942c-e5435bd50b32_w864_h576.jpeg', import.meta.url).href },
    { id: nanoid(), name: 'Redmi K40S', price: 2199, img: new URL('@/assets/images/8d8e7935-5ff3-4eb5-942c-e5435bd50b32_w864_h576.jpeg', import.meta.url).href },
    { id: nanoid(), name: 'realme Q3', price: 3499, img: new URL('@/assets/images/8d8e7935-5ff3-4eb5-942c-e5435bd50b32_w864_h576.jpeg', import.meta.url).href },
    { id: nanoid(), name: 'vivo iQOO Neo5 SE', price: 2099, img: new URL('@/assets/images/8d8e7935-5ff3-4eb5-942c-e5435bd50b32_w864_h576.jpeg', import.meta.url).href },
    { id: nanoid(), name: '华为 Mate 40', price: 5499, img: new URL('@/assets/images/8d8e7935-5ff3-4eb5-942c-e5435bd50b32_w864_h576.jpeg', import.meta.url).href },
    { id: nanoid(), name: 'Redmi K40S', price: 2199, img: new URL('@/assets/images/8d8e7935-5ff3-4eb5-942c-e5435bd50b32_w864_h576.jpeg', import.meta.url).href },
    { id: nanoid(), name: 'realme Q3', price: 3499, img: new URL('@/assets/images/8d8e7935-5ff3-4eb5-942c-e5435bd50b32_w864_h576.jpeg', import.meta.url).href }
  ],
  computer: [
    { id: nanoid(), name: '联想小新Pad 2022', price: 1199, img: new URL('@/assets/images/ChMkK2Tj59WIVa2SAAHqD4fs0u0AAUACQH0gsEAAeon996.jpg', import.meta.url).href },
    { id: nanoid(), name: 'LEGION 拯救者Y9000K', price: 19999, img: new URL('@/assets/images/ChMkK2Tj59WIVa2SAAHqD4fs0u0AAUACQH0gsEAAeon996.jpg', import.meta.url).href  },
    { id: nanoid(), name: 'ROG幻16', price: 19999, img: new URL('@/assets/images/ChMkK2Tj59WIVa2SAAHqD4fs0u0AAUACQH0gsEAAeon996.jpg', import.meta.url).href },
    { id: nanoid(), name: '华硕无畏Pro14', price: 8699, img: new URL('@/assets/images/ChMkK2Tj59WIVa2SAAHqD4fs0u0AAUACQH0gsEAAeon996.jpg', import.meta.url).href },
    { id: nanoid(), name: '联想小新Pad 2022', price: 1199, img: new URL('@/assets/images/ChMkK2Tj59WIVa2SAAHqD4fs0u0AAUACQH0gsEAAeon996.jpg', import.meta.url).href },
    { id: nanoid(), name: 'LEGION 拯救者Y9000K', price: 19999, img: new URL('@/assets/images/ChMkK2Tj59WIVa2SAAHqD4fs0u0AAUACQH0gsEAAeon996.jpg', import.meta.url).href },
    { id: nanoid(), name: 'ROG幻16', price: 19999, img: new URL('@/assets/images/ChMkK2Tj59WIVa2SAAHqD4fs0u0AAUACQH0gsEAAeon996.jpg', import.meta.url).href },
    { id: nanoid(), name: '华硕无畏Pro14', price: 8699, img: new URL('@/assets/images/ChMkK2Tj59WIVa2SAAHqD4fs0u0AAUACQH0gsEAAeon996.jpg', import.meta.url).href  },
    { id: nanoid(), name: '华硕无畏Pro14', price: 8699, img: new URL('@/assets/images/ChMkK2Tj59WIVa2SAAHqD4fs0u0AAUACQH0gsEAAeon996.jpg', import.meta.url).href  },
    { id: nanoid(), name: '华硕无畏Pro14', price: 8699, img: new URL('@/assets/images/ChMkK2Tj59WIVa2SAAHqD4fs0u0AAUACQH0gsEAAeon996.jpg', import.meta.url).href  }
  ],
  peripheral: [
    { id: nanoid(), name: '罗技G502鼠标', price: 469, img: new URL ('@/assets/images/ChMkLGdmD5uIbJmoAAKhiceCX68AAm_cwGl7FAAAqGh636.jpg',import.meta.url).href },
    { id: nanoid(), name: 'AOC 23.8寸显示器', price: 929, img: new URL ('@/assets/images/ChMkLGdmD5uIbJmoAAKhiceCX68AAm_cwGl7FAAAqGh636.jpg',import.meta.url).href }
  ],
  parts: [
    { id: nanoid(), name: '英特尔 i7-12700KF', price: 3599, img: new URL('@/assets/images/ChMkLGWBLNeIe8bDAAHT1oHFk8cAAYi0gANZawAAdPu151.jpg',import.meta.url).href },
    { id: nanoid(), name: '英特尔 i7-12700KF', price: 3599, img: new URL('@/assets/images/ChMkLGWBLNeIe8bDAAHT1oHFk8cAAYi0gANZawAAdPu151.jpg',import.meta.url).href },
  ]
})

const showLogin = ref(false)
const showRegister = ref(false)

function switchToRegister() {
  showLogin.value = false
  showRegister.value = true
}

function switchToLogin() {
  showRegister.value = false
  showLogin.value = true
}

provide('showLoginDialog', () => { showLogin.value = true })
</script>

<style lang="scss">
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f5f6fa;
}
.main-layout {
  display: flex;
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 16px 0 16px;
}
.sidebar {
  flex: 1 1 220px;
  min-width: 160px;
  max-width: 300px;
}
.main-content {
  flex: 3 1 0%;
  width: 100%;
}
@media (max-width: 900px) {
  .main-layout {
    flex-direction: column;
    gap: 12px;
    padding: 12px 4px 0 4px;
  }
  .sidebar {
    min-width: 0;
    max-width: 100%;
    width: 100%;
    padding: 12px 4px;
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    gap: 12px;
  }
  .main-content {
    width: 100%;
  }
}
</style>

