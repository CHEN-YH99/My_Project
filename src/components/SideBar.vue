<template>
  <aside class="sidebar">
    <section class="special-offer">
      <h3>每日特价</h3>
      <ul>
        <li v-for="item in offers" :key="item.id" class="offer-item">
          <div class="offer-img-wrapper" @click="openModal(item.img)">
            <img :src="item.img" :alt="item.name" class="offer-img">
          </div>
          <div class="offer-info">
            <span class="offer-name">{{ item.name }}</span>
            <span class="price">￥{{ item.price }}</span>
          </div>
        </li>
      </ul>
    </section>
    <section class="brand-list">
      <h3>品牌/分类</h3>
      <div class="brands">
        <span v-for="brand in brands" :key="brand" class="brand">{{ brand }}</span>
      </div>
    </section>

    <!-- 图片放大模态框 -->
    <div v-if="showModal" class="image-modal" @click.self="closeModal">
      <div class="modal-content">
        <span class="close-btn" @click="closeModal">&times;</span>
        <img :src="modalImage" class="zoomed-image">
      </div>
    </div>
  </aside>
</template>

<script setup>
'SideBar'
import { ref } from 'vue'

const offers = ref([
  { 
    id: 1, 
    name: 'vivo iQOO Neo5 SE', 
    price: 1999,
    img: new URL('@/assets/images/144e4b0995ef0098.jpg', import.meta.url).href
  },
  { 
    id: 2, 
    name: 'Redmi Note 11 Pro', 
    price: 1899,
    img: new URL('@/assets/images/c5eb4b3a7025a21e.jpg', import.meta.url).href
  },
  { 
    id: 3, 
    name: '华为 Mate 40', 
    price: 5499,
    img: new URL('@/assets/images/ff353a6ec11dbdf1.jpg', import.meta.url).href
  }
])

const brands = ref(['华为', '联想', '小米', 'OPPO', 'realme', 'ASUS', 'Apple'])

const showModal = ref(false)
const modalImage = ref('')

const openModal = (imgUrl) => {
  modalImage.value = imgUrl
  showModal.value = true
  document.body.style.overflow = 'hidden' // 禁止背景滚动
}

const closeModal = () => {
  showModal.value = false
  document.body.style.overflow = 'auto' // 恢复背景滚动
}
</script>

<style lang="scss" scoped>
.main-layout {
  display: flex;
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 16px 0 16px;
}

.sidebar {
  flex: 1 1 260px;
  min-width: 160px;
  max-width: 360px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  padding: 24px 16px;
  margin-top: 100px;
  font-size: 14px;
  
  h3 {
    font-size: 1rem;
  }
  
  .special-offer {
    margin-bottom: 24px;
    
    .offer-name,
    .brand {
      font-size: 13px;
    }
    
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: grid;
      gap: 16px;
      
      .offer-item {
        display: flex;
        gap: 12px;
        align-items: center;
        padding: 8px;
        border-radius: 8px;
        transition: background 0.2s;
        
        &:hover {
          background: #f8f9fa;
        }
        
        .offer-img-wrapper {
          width: 60px;
          height: 60px;
          flex-shrink: 0;
          border-radius: 6px;
          overflow: hidden;
          background: #f5f6fa;
          cursor: pointer;
          transition: transform 0.2s;
          
          .offer-img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            mix-blend-mode: multiply;
          }
          
          &:hover {
            transform: scale(1.02);
          }
          
          &:active {
            transform: scale(0.98);
          }
        }
        
        .offer-info {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 4px;
          
          .offer-name {
            font-size: 13px;
            font-weight: 500;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          
          .price {
            color: #e4393c;
            font-weight: bold;
            font-size: 15px;
          }
        }
      }
    }
  }
  
  .brand-list {
    margin-bottom: 24px;
    
    .brands {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      
      .brand {
        background: #f5f6fa;
        border-radius: 4px;
        padding: 6px 12px;
        font-size: 13px;
        cursor: pointer;
        transition: all 0.2s;
        
        &:hover {
          background: #e3eafc;
          transform: translateY(-2px);
          box-shadow: 0 2px 8px rgba(25,118,210,0.1);
        }
      }
    }
  }
  
  @media (max-width: 1024px) {
    .special-offer ul {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (max-width: 600px) {
    .special-offer ul {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 900px) {
    width: 100%;
    min-width: 0;
    max-width: 100%;
    margin-top: 0;
    padding: 16px 8px;
    box-sizing: border-box;
    display: block;

    .special-offer,
    .brand-list {
      min-width: 0;
      width: 100%;
      margin-bottom: 16px;
      display: block;
    }
  }
}

/* 新增图片模态框样式 */
.image-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  
  .modal-content {
    position: relative;
    max-width: 90%;
    max-height: 90%;
    
    .close-btn {
      position: absolute;
      top: -40px;
      right: 0;
      color: white;
      font-size: 30px;
      cursor: pointer;
      transition: opacity 0.2s;
      
      &:hover {
        opacity: 0.8;
      }
    }
    
    .zoomed-image {
      max-width: 100%;
      max-height: 80vh;
      object-fit: contain;
      border-radius: 8px;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    }
  }
}

.main-content {
  flex: 3 1 0%;
  width: 100%;
}
</style>
