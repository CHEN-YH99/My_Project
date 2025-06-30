<template>
  <div class="product-section">
    <h2 class="section-title">{{ title }}</h2>
    <div class="product-list-container">
      <div class="product-list">
        <transition-group name="list-slide">
          <div
            v-for="(product, index) in displayedProducts"
            :key="product.id"
            class="product-card"
            v-lazy="() => setVisible(index)"
            @click="goToDetail(product)"
            style="cursor:pointer"
          >
            <template v-if="visible[index]">
              <img :src="product.img" :alt="product.name" class="product-img" loading="lazy" />
              <div class="product-info">
                <p class="product-name">{{ product.name }}</p>
                <p class="product-price">{{ product.price }}</p>
              </div>
            </template>
          </div>
        </transition-group>
      </div>
      <button
        v-if="props.products.length > maxToShow"
        class="view-more"
        @click="toggleShowAll"
      >
        {{ showAll ? '收起' : '查看更多' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, inject } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { defineProps } from 'vue'

const props = defineProps({
  title: String,
  products: {
    type: Array,
    default: () => []
  }
})
const visible = ref([])
const showAll = ref(false)
const maxToShow = 8
const store = useStore()
const router = useRouter()
const showLoginDialog = inject('showLoginDialog')

function setVisible(idx) {
  if (!Array.isArray(visible.value)) {
    visible.value = []
  }
  visible.value[idx] = true
  visible.value = [...visible.value]
}

const displayedProducts = computed(() => {
  return showAll.value ? props.products : props.products.slice(0, maxToShow)
})

function toggleShowAll() {
  if (!store.state.user.isLoggedIn) {
    showLoginDialog()
    return
  }
  showAll.value = !showAll.value
}

function goToDetail(product) {
  if (!store.state.user.isLoggedIn) {
    showLoginDialog()
    return
  }
  router.push({ name: 'ShopDetail', params: { id: product.id } })
}
</script>

<style lang="scss" scoped>
.product-section {
  margin-bottom: 32px;
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  .section-title {
    font-size: 2rem;
    @media (max-width: 1024px) {
      font-size: 1.5rem;
    }
    @media (max-width: 768px) {
      font-size: 1.2rem;
    }
    @media (max-width: 480px) {
      font-size: 1rem;
    }
    margin-bottom: 16px;
    font-weight: bold;
    text-align: center;
    background: linear-gradient(90deg, #ff8a00, #e52e71);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  .product-list-container {
    .product-list {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      position: relative;
      @media (max-width: 1024px) {
        grid-template-columns: repeat(3, 1fr);
      }
      @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
      }
      @media (max-width: 480px) {
        grid-template-columns: 1fr;
      }
    }
    .list-slide-move,
    .list-slide-enter-active,
    .list-slide-leave-active {
      transition: all 0.4s cubic-bezier(0.55, 0, 0.1, 1);
    }
    .list-slide-enter-from {
      opacity: 0;
      transform: translateY(20px);
    }
    .list-slide-leave-to {
      opacity: 0;
      transform: translateY(-20px);
    }
    .list-slide-leave-active {
      position: absolute;
      width: calc(25% - 12px);
      @media (max-width: 1024px) {
        width: calc(33.33% - 11px);
      }
      @media (max-width: 768px) {
        width: calc(50% - 8px);
      }
      @media (max-width: 480px) {
        width: 100%;
      }
    }
    .view-more {
      display: block;
      margin: 24px 0 0 auto;
      padding: 8px 16px;
      background: #e52e71;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background 0.2s;
      font-size: 1rem;
      &:hover {
        background: #ff8a00;
      }
      @media (max-width: 768px) {
        margin: 16px auto 0 auto;
        width: 50%;
        max-width: 120px;
        font-size: 0.95rem;
        padding: 6px 0;
      }
    }
  }
  .product-card {
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    padding: 16px 8px 12px 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: box-shadow 0.2s;
    &:hover {
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    }
    .product-img {
      width: 100%;
      max-width: 140px;
      aspect-ratio: 1/1;
      object-fit: contain;
      margin-bottom: 10px;
      @media (max-width: 600px) {
        max-width: 100px;
        margin-bottom: 6px;
      }
    }
    .product-info {
      text-align: center;
      .product-name {
        font-size: 1rem;
        margin-bottom: 4px;
        @media (max-width: 600px) {
          font-size: 0.95rem;
        }
      }
      .product-price {
        color: #e4393c;
        font-weight: bold;
        font-size: 1.1rem;
        @media (max-width: 600px) {
          font-size: 1rem;
        }
      }
    }
  }
}
</style>
