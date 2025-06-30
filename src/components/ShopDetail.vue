<template>
  <div class="shop-detail">
    <div class="product-section">
      <!-- 图片和放大镜 -->
      <div class="product-image-zoom-wrap">
        <div
          class="product-image-container"
          ref="container"
          @mousemove="handleMouseMove"
          @mouseenter="showZoom = true"
          @mouseleave="showZoom = false"
        >
          <img
            :src="product?.img"
            :alt="product?.name"
            ref="productImage"
            class="product-image"
            draggable="false"
          />
          <!-- 遮罩层 -->
          <div
            v-if="showZoom"
            class="zoom-lens"
            :style="lensStyle"
          ></div>
        </div>
        <!-- 放大区域 -->
        <div
          v-if="showZoom"
          class="zoom-result"
          :style="zoomResultStyle"
        ></div>
      </div>
      <!-- 商品信息部分 -->
      <div class="product-info">
        <h2 class="product-title">{{ product?.name }}</h2>
        <div class="product-desc"><span>{{ product?.desc }}</span></div>
        <div class="product-price-box">
          <span class="product-price">{{ product?.price }}</span>
        </div>
        <div class="product-quantity">
          <button @click="decrease">-</button>
          <input type="text" v-model.number="quantity" />
          <button @click="increase">+</button>
        </div>
        <button class="add-cart-btn">加入购物车</button>
      </div>
    </div>
    <footer class="footer">
      <div class="partners">
        <span>合作伙伴</span>
        <div class="partner-icons">
          <i class="iconfont icon-weibo"></i>
          <i class="iconfont icon-weixin"></i>
          <i class="iconfont icon-qq"></i>
          <i class="iconfont icon-xbox"></i>
        </div>
      </div>
      <div class="footer-links">
        商城 | 游戏 | 政企服务 | 集团隐私政策 | 公司证信息保护说明 | 商城隐私政策 | 商城用户协议 | 问题反馈 | Select Location
      </div>
      <div class="footer-icp">
        互联网ICP备案：沪ICP备13002172号-3  非经营性备案:2016-0143  营业性播出许可证 沪市文广(经)00-2253
      </div>
    </footer>
    <button @click="handleViewMore">查看更多</button>
  </div>
</template>

<script setup>
import { ref, computed, inject } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { defineProps } from 'vue'  ////////////

const props = defineProps({
  products: Object
})

const route = useRoute()
const productImage = ref(null)
const container = ref(null)
const showZoom = ref(false)
const lensStyle = ref({})
const zoomResultStyle = ref({})
const quantity = ref(1)
const store = useStore()
const showLoginDialog = inject('showLoginDialog')

const allProducts = [
  ...(props.products?.phone || []),
  ...(props.products?.computer || []),
  ...(props.products?.peripheral || []),
  ...(props.products?.parts || [])
]
const product = computed(() =>
  allProducts.find(p => String(p.id) === String(route.params.id)) || {}
)

// 假设高清图和原图同路径（如无高清图可用原图）
const highResImage = computed(() => product.value?.img || '')

function increase() { quantity.value++ }
function decrease() { if (quantity.value > 1) quantity.value-- }

const lensSize = 120 // 放大镜遮罩宽高(px)
const zoomScale = 2.5 // 放大倍数

const handleMouseMove = (e) => {
  if (!productImage.value || !container.value || !product.value?.img) return

  const rect = container.value.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top

  // 限制遮罩不超出图片
  const lensHalf = lensSize / 2
  let lensX = x - lensHalf
  let lensY = y - lensHalf
  if (lensX < 0) lensX = 0
  if (lensY < 0) lensY = 0
  if (lensX > rect.width - lensSize) lensX = rect.width - lensSize
  if (lensY > rect.height - lensSize) lensY = rect.height - lensSize

  lensStyle.value = {
    left: `${lensX}px`,
    top: `${lensY}px`,
    width: `${lensSize}px`,
    height: `${lensSize}px`,
    display: showZoom.value ? 'block' : 'none'
  }

  // 计算放大区域背景偏移
  zoomResultStyle.value = {
    backgroundImage: `url(${highResImage.value})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: `${rect.width * zoomScale}px ${rect.height * zoomScale}px`,
    backgroundPosition: `-${lensX * zoomScale}px -${lensY * zoomScale}px`
  }
}

function handleViewMore() {
  if (!store.state.user.isLoggedIn) {
    showLoginDialog()
    return
  }
  // 已登录逻辑
}
</script>

<style lang="scss" scoped>
$main-radius: 20px;
$main-shadow: 0 8px 32px rgba(0,0,0,0.08);
$main-bg: #fff;
$main-padding: 2.5rem 2rem;
$main-font: 'Segoe UI', sans-serif;
$main-red: #e1251b;
$main-gray: #f5f7fa;
$main-gray-dark: #e4e8eb;
$footer-bg: #f8f9fb;
$footer-shadow: 0 -2px 12px rgba(0,0,0,0.04);

html {
  font-size: clamp(14px, 2vw, 18px);
}

.shop-detail {
  background: linear-gradient(135deg, $main-gray 0%, $main-gray-dark 100%);
  min-height: 100vh;
  padding: 3rem 0 0 0;
  font-family: $main-font;
  display: flex;
  flex-direction: column;
  align-items: center;

  .product-section {
    display: flex;
    gap: 2.5rem;
    max-width: 1200px;
    margin: 0 auto 2.5rem auto;
    background: $main-bg;
    border-radius: $main-radius;
    box-shadow: $main-shadow;
    padding: $main-padding;

    .product-image-zoom-wrap {
      position: relative;
      display: flex;
      align-items: flex-start;

      .product-image-container {
        position: relative;
        width: 400px;
        height: 400px;
        overflow: hidden;
        border-radius: 10px;
        box-shadow: 0 2px 12px rgba(0,0,0,0.07);
        background: $main-bg;

        .product-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          user-select: none;
          pointer-events: none;
        }
        .zoom-lens {
          position: absolute;
          border: 2px solid #e74c3c;
          background: rgba(255,255,255,0.3);
          border-radius: 50%;
          pointer-events: none;
          z-index: 10;
          box-shadow: 0 2px 8px rgba(0,0,0,0.12);
          transition: left 0.05s, top 0.05s;
        }
      }
      .zoom-result {
        position: absolute;
        left: 430px;
        top: 0;
        margin-left: 0;
        width: 400px;
        height: 400px;
        border: 1px solid #eee;
        background: $main-bg;
        background-position: 0 0;
        background-repeat: no-repeat;
        border-radius: 10px;
        box-shadow: 0 2px 12px rgba(0,0,0,0.07);
        z-index: 20;
        pointer-events: none;
      }
    }
    .product-info {
      flex: 1;
      background: $main-bg;
      border-radius: 18px;
      box-shadow: 0 4px 24px rgba(0,0,0,0.08);
      padding: 2.5rem 2rem 2rem 2rem;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      min-width: 340px;
      max-width: 420px;
      margin-left: 1rem;

      .product-title {
        font-size: 1.6rem;
        font-weight: 700;
        color: #222;
        margin-bottom: 0.5rem;
        line-height: 1.2;
      }
      .product-desc {
        font-size: 1rem;
        color: #888;
        margin-bottom: 1.5rem;
        line-height: 1.6;
      }
      .product-price-box {
        margin-bottom: 1.5rem;
      }
      .product-price {
        font-size: 2rem;
        color: $main-red;
        font-weight: 800;
        letter-spacing: 1px;
      }
      .product-quantity {
        display: flex;
        align-items: center;
        margin-bottom: 2rem;
        button {
          width: 36px;
          height: 36px;
          border: none;
          background: #f5f5f5;
          color: #333;
          font-size: 1.5rem;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.2s;
          &:hover {
            background: #e0e0e0;
          }
        }
        input {
          width: 48px;
          height: 36px;
          text-align: center;
          font-size: 1.1rem;
          margin: 0 0.5rem;
          border: 1px solid #eee;
          border-radius: 8px;
          outline: none;
        }
      }
      .add-cart-btn {
        width: 100%;
        padding: 1rem 0;
        background: linear-gradient(90deg, $main-red 0%, #f56c6c 100%);
        color: #fff;
        font-size: 1.2rem;
        font-weight: 700;
        border: none;
        border-radius: 12px;
        cursor: pointer;
        box-shadow: 0 2px 8px rgba(225,37,27,0.08);
        transition: background 0.2s, box-shadow 0.2s;
        margin-top: 0.5rem;
        &:hover {
          background: linear-gradient(90deg, #d81e06 0%, #f78989 100%);
          box-shadow: 0 4px 16px rgba(225,37,27,0.15);
        }
      }
    }
  }
  .footer {
    width: 100%;
    background: $footer-bg;
    color: #666;
    padding: 2rem 0 1.2rem 0;
    margin-top: auto;
    box-shadow: $footer-shadow;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1rem;

    .partners {
      display: flex;
      align-items: center;
      gap: 1.2rem;
      margin-bottom: 1rem;
      font-size: 1.1rem;
      .partner-icons {
        display: flex;
        gap: 1.2rem;
        i {
          font-size: 1.6rem;
          color: #bbb;
          transition: color 0.2s;
          cursor: pointer;
          &:hover {
            color: $main-red;
          }
        }
      }
    }
    .footer-links {
      margin-bottom: 0.8rem;
      color: #888;
      font-size: 0.98rem;
      text-align: center;
      line-height: 1.7;
      letter-spacing: 0.02em;
    }
    .footer-icp {
      color: #aaa;
      font-size: 0.92rem;
      text-align: center;
      margin-top: 0.2rem;
    }
  }
}

@media (max-width: 900px) {
  .shop-detail {
    .product-section {
      flex-direction: column;
      align-items: center;
      padding: 1.2rem 0.5rem;
      box-shadow: none;
      background: transparent;
      .product-image-zoom-wrap {
        width: 100%;
        justify-content: center;
        .product-image-container {
          width: 100vw;
          max-width: 400px;
          height: auto;
          aspect-ratio: 1/1;
          margin: 0 auto;
          min-height: 220px;
          background: $main-bg;
          .product-image {
            width: 100%;
            height: 100%;
            object-fit: contain;
            user-select: none;
            pointer-events: none;
            display: block;
          }
          .zoom-lens {
            display: none !important;
          }
        }
        .zoom-result {
          display: none !important;
        }
      }
      .product-info {
        margin-left: 0;
        margin-top: 1.5rem;
        width: 100%;
        min-width: unset;
        max-width: unset;
        padding: 1.2rem 0.8rem;
        border-radius: 14px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.06);
      }
    }
  }
}

@media (max-width: 600px) {
  .shop-detail {
    .product-title {
      font-size: 1.15rem;
    }
    .product-desc {
      font-size: 0.95rem;
    }
    .product-price {
      font-size: 1.3rem;
    }
    .add-cart-btn {
      font-size: 1rem;
      padding: 0.8rem 0;
    }
    .footer {
      font-size: 1rem;
      padding: 1.2rem 0 0.7rem 0;
      text-align: center;
      .partners {
        flex-direction: column;
        gap: 0.5rem;
        font-size: 1.05rem;
        margin-bottom: 0.7rem;
        .partner-icons {
          gap: 0.7rem;
          justify-content: center;
          i {
            font-size: 1.4rem;
          }
        }
      }
      .footer-links {
        font-size: 0.98rem;
        margin-bottom: 0.5rem;
        line-height: 1.6;
        word-break: break-all;
        padding: 0 0.5rem;
      }
      .footer-icp {
        font-size: 0.88rem;
        margin-top: 0.2rem;
        color: #bbb;
        padding: 0 0.5rem;
        word-break: break-all;
      }
    }
  }
}
</style>
