<template>
  <div class="banner">
    <div class="banner-list"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <div class="slider-container">
        <div class="slider-track" :style="trackStyle">
          <div 
            v-for="(img, index) in imgs" 
            :key="index"
            class="slide"
          >
            <img
              :src="img.url"
              class="banner-img"
              :alt="'banner' + (index+1)"
            />
          </div>
        </div>
      </div>
      <button 
        class="arrow left" 
        :class="{ 'visible': showArrows }"
        @click="onPrev" 
        aria-label="上一张"
      >&#8592;</button>
      <button 
        class="arrow right" 
        :class="{ 'visible': showArrows }"
        @click="onNext" 
        aria-label="下一张"
      >&#8594;</button>
      <div class="dots-bar">
        <span
          v-for="(img, idx) in imgs"
          :key="img.id"
          :class="['dot-bar', { active: idx === current }]"
          @click="go(idx)"
        ></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const imgs = [
  {id:1, url: new URL('@/assets/images/06cf353c1af21c3e.jpg', import.meta.url).href},
  {id:2, url: new URL('@/assets/images/8c6bab6c741fb1f2.jpg', import.meta.url).href},
  {id:3, url: new URL('@/assets/images/41f5b481f275c1d8.jpg', import.meta.url).href},
  {id:4, url: new URL('@/assets/images/196b94d66d58a5e4.jpg', import.meta.url).href},
  {id:5, url: new URL('@/assets/images/bfe374f47402174d.png', import.meta.url).href}
]

const current = ref(0)
const showArrows = ref(false)
let timer = null

const trackStyle = computed(() => ({
  transform: `translateX(-${current.value * 100}%)`,
  transition: 'transform 0.5s ease'
}))

const handleMouseEnter = () => {
  showArrows.value = true
  stop()
}

const handleMouseLeave = () => {
  showArrows.value = false
  start()
}

const next = () => {
  current.value = (current.value + 1) % imgs.length
}

const prev = () => {
  current.value = (current.value - 1 + imgs.length) % imgs.length
}

const go = idx => {
  current.value = idx
}

const start = () => {
  stop()
  timer = setInterval(next, 3000)
}

const stop = () => {
  if (timer) clearInterval(timer)
  timer = null
}

const onPrev = () => {
  stop()
  prev()
}

const onNext = () => {
  stop()
  next()
}

onMounted(start)
onUnmounted(stop)
</script>

<style lang="scss" scoped>
.banner {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 24px 0 16px 0;
  
  .banner-list {
    position: relative;
    width: 100%;
    max-width: 1200px;
    aspect-ratio: 3 / 1;
    background: #f5f6fa;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 24px rgba(25,118,210,0.08);
    
    .slider-container {
      width: 100%;
      height: 100%;
      overflow: hidden;
      position: relative;
      
      .slider-track {
        display: flex;
        width: 100%;
        height: 100%;
        
        .slide {
          min-width: 100%;
          height: 100%;
          position: relative;
          
          .banner-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            background: #f5f6fa;
            user-select: none;
            pointer-events: none;
            min-height: 80px;
          }
        }
      }
    }
    
    .arrow {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 2;
      background: rgba(255,255,255,0.7);
      border: none;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      font-size: 22px;
      color: #1976d2;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(25,118,210,0.10);
      transition: all 0.3s ease;
      opacity: 0;
      visibility: hidden;
      
      &:hover {
        background: #1976d2;
        color: #fff;
      }
      
      &.left { left: 24px; }
      &.right { right: 24px; }
      
      &.visible {
        opacity: 1;
        visibility: visible;
      }
    }
    
    .dots-bar {
      position: absolute;
      left: 50%;
      bottom: 24px;
      transform: translateX(-50%);
      display: flex;
      gap: 12px;
      z-index: 3;
      
      .dot-bar {
        width: 36px;
        height: 8px;
        border-radius: 4px;
        background: rgba(255,255,255,0.6);
        transition: background 0.3s, width 0.3s;
        cursor: pointer;
        
        &.active {
          background: linear-gradient(90deg, #1976d2 0%, #42a5f5 100%);
          width: 48px;
        }
      }
    }
  }
  
  @media (max-width: 900px) {
    .banner-list {
      max-width: 100%;
      height: 240px;
      border-radius: 10px;
      
      .dots-bar { bottom: 10px; }
    }
  }
}
</style>
