<template>
  <nav class="top-nav">
    <div class="nav-left">
      <span class="nav-link">商城首页</span>
      <span class="nav-link">下载App</span>
      <span class="nav-link">企业采购</span>
      <span class="nav-link">售后服务</span>
    </div>
    <div class="nav-right">
      <span class="nav-link" @click="$emit('show-login')">登录</span>
      <span class="nav-link">我的订单</span>
      <span class="nav-link">购物车</span>
    </div>
  </nav>
</template>

<script setup>
// 无需逻辑
</script>

<style lang="scss" scoped>
.top-nav {
  position: sticky;
  top: 0;
  width: 100%;
  background: linear-gradient(90deg, #1976d2 0%, #42a5f5 100%);
  color: #fff;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 32px;
  height: 44px;
  border-bottom: 1.5px solid #1565c0;
  box-shadow: 0 2px 8px rgba(25, 118, 210, 0.08);
  z-index: 100;
  .nav-left, .nav-right {
    display: flex;
    gap: 24px;
  }
  .nav-link {
    position: relative;
    cursor: pointer;
    padding: 0 4px;
    transition: color 0.2s;
    &:hover {
      color: #ffe082;
    }
    &::after {
      content: '';
      display: block;
      position: absolute;
      left: 0;
      bottom: -4px;
      width: 100%;
      height: 2.5px;
      background: linear-gradient(90deg, #ffe082 0%, #fffde7 100%);
      border-radius: 2px;
      transform: scaleX(0);
      transition: transform 0.3s cubic-bezier(.4,0,.2,1);
    }
    &:hover::after {
      transform: scaleX(1);
    }
  }
  @media (max-width: 600px) {
    flex-direction: column;
    height: auto;
    padding: 0 8px;
    .nav-left, .nav-right {
      gap: 10px;
    }
  }
}
</style>
