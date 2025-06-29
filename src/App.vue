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
    <router-view :products="products" />
    <FooterBar />
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
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
    { id: 1, name: 'vivo iQOO Neo5 SE', price: 2099, img: new URL('@/assets/images/8d8e7935-5ff3-4eb5-942c-e5435bd50b32_w864_h576.jpeg', import.meta.url).href },
    { id: 2, name: '华为 Mate 40', price: 5499, img: new URL('@/assets/images/8d8e7935-5ff3-4eb5-942c-e5435bd50b32_w864_h576.jpeg', import.meta.url).href },
    { id: 3, name: 'Redmi K40S', price: 2199, img: new URL('@/assets/images/8d8e7935-5ff3-4eb5-942c-e5435bd50b32_w864_h576.jpeg', import.meta.url).href },
    { id: 4, name: 'realme Q3', price: 3499, img: new URL('@/assets/images/8d8e7935-5ff3-4eb5-942c-e5435bd50b32_w864_h576.jpeg', import.meta.url).href },
    { id: 5, name: 'vivo iQOO Neo5 SE', price: 2099, img: new URL('@/assets/images/8d8e7935-5ff3-4eb5-942c-e5435bd50b32_w864_h576.jpeg', import.meta.url).href },
    { id: 6, name: '华为 Mate 40', price: 5499, img: new URL('@/assets/images/8d8e7935-5ff3-4eb5-942c-e5435bd50b32_w864_h576.jpeg', import.meta.url).href },
    { id: 7, name: 'Redmi K40S', price: 2199, img: new URL('@/assets/images/8d8e7935-5ff3-4eb5-942c-e5435bd50b32_w864_h576.jpeg', import.meta.url).href },
    { id: 8, name: 'realme Q3', price: 3499, img: new URL('@/assets/images/8d8e7935-5ff3-4eb5-942c-e5435bd50b32_w864_h576.jpeg', import.meta.url).href }
  ],
  computer: [
    { id: 9, name: '联想小新Pad 2022', price: 1199, img: new URL('@/assets/images/ChMkK2Tj59WIVa2SAAHqD4fs0u0AAUACQH0gsEAAeon996.jpg', import.meta.url).href },
    { id: 10, name: 'LEGION 拯救者Y9000K', price: 19999, img: new URL('@/assets/images/ChMkK2Tj59WIVa2SAAHqD4fs0u0AAUACQH0gsEAAeon996.jpg', import.meta.url).href  },
    { id: 11, name: 'ROG幻16', price: 19999, img: new URL('@/assets/images/ChMkK2Tj59WIVa2SAAHqD4fs0u0AAUACQH0gsEAAeon996.jpg', import.meta.url).href },
    { id: 12, name: '华硕无畏Pro14', price: 8699, img: new URL('@/assets/images/ChMkK2Tj59WIVa2SAAHqD4fs0u0AAUACQH0gsEAAeon996.jpg', import.meta.url).href },
    { id: 13, name: '联想小新Pad 2022', price: 1199, img: new URL('@/assets/images/ChMkK2Tj59WIVa2SAAHqD4fs0u0AAUACQH0gsEAAeon996.jpg', import.meta.url).href },
    { id: 14, name: 'LEGION 拯救者Y9000K', price: 19999, img: new URL('@/assets/images/ChMkK2Tj59WIVa2SAAHqD4fs0u0AAUACQH0gsEAAeon996.jpg', import.meta.url).href },
    { id: 15, name: 'ROG幻16', price: 19999, img: new URL('@/assets/images/ChMkK2Tj59WIVa2SAAHqD4fs0u0AAUACQH0gsEAAeon996.jpg', import.meta.url).href },
    { id: 16, name: '华硕无畏Pro14', price: 8699, img: new URL('@/assets/images/ChMkK2Tj59WIVa2SAAHqD4fs0u0AAUACQH0gsEAAeon996.jpg', import.meta.url).href  },
    { id: 17, name: '华硕无畏Pro14', price: 8699, img: new URL('@/assets/images/ChMkK2Tj59WIVa2SAAHqD4fs0u0AAUACQH0gsEAAeon996.jpg', import.meta.url).href  },
    { id: 18, name: '华硕无畏Pro14', price: 8699, img: new URL('@/assets/images/ChMkK2Tj59WIVa2SAAHqD4fs0u0AAUACQH0gsEAAeon996.jpg', import.meta.url).href  }
  ],
  peripheral: [
    { id: 19, name: '罗技G502鼠标', price: 469, img: new URL ('@/assets/images/ChMkLGdmD5uIbJmoAAKhiceCX68AAm_cwGl7FAAAqGh636.jpg',import.meta.url).href },
    { id: 20, name: 'AOC 23.8寸显示器', price: 929, img: new URL ('@/assets/images/ChMkLGdmD5uIbJmoAAKhiceCX68AAm_cwGl7FAAAqGh636.jpg',import.meta.url).href }
  ],
  parts: [
    { id: 21, name: '英特尔 i7-12700KF', price: 3599, img: new URL('@/assets/images/ChMkLGWBLNeIe8bDAAHT1oHFk8cAAYi0gANZawAAdPu151.jpg',import.meta.url).href },
    { id: 22, name: '英特尔 i7-12700KF', price: 3599, img: new URL('@/assets/images/ChMkLGWBLNeIe8bDAAHT1oHFk8cAAYi0gANZawAAdPu151.jpg',import.meta.url).href },
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
