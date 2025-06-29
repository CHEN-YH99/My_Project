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
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
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
const highResImage = computed(() =>
  product.value?.img?.replace('.jpg', '_highres.jpg') || product.value?.img || ''
)

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
</script>

<style scoped>
.shop-detail {
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%);
  min-height: 100vh;
  padding: 1.5rem;
  font-family: 'Segoe UI', sans-serif;
}
.product-section {
  display: flex;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}
.product-image-zoom-wrap {
  position: relative;
  display: flex;
  align-items: flex-start;
}
.product-image-container {
  position: relative;
  width: 400px;
  height: 400px;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
  background: #fff;
}
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
.zoom-result {
  margin-left: 30px;
  width: 400px;
  height: 400px;
  border: 1px solid #eee;
  background: #fff;
  background-position: 0 0;
  background-repeat: no-repeat;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
  z-index: 20;
  pointer-events: none;
}
@media (max-width: 900px) {
  .product-section {
    flex-direction: column;
    align-items: center;
  }
  .zoom-result {
    display: none;
  }
}
</style>
