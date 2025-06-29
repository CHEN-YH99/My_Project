<template>
  <footer class="footer-bar">
    <div class="footer-content">
      <div class="footer-links">
        <span>关于 |</span>
        <span>政策条款 |</span>
        <span>售后服务 |</span>
        <span>联系我们</span>
      </div>
      <div class="footer-copy">
        &copy; 2024 电商演示平台 | 浙ICP备2022013384号
      </div>
    </div>
  </footer>
</template>

<script setup>
// 无需逻辑
</script>

<style lang="scss" scoped>
.footer-bar {
  width: 100%;
  background: #222;
  color: #bbb;
  padding: 24px 0 12px 0;
  .footer-content {
    max-width: 1400px;
    margin: 0 auto;
    text-align: center;
    .footer-links {
      margin-bottom: 8px;
      span {
        margin: 0 8px;
        cursor: pointer;
        &:hover {
          color: #fff;
        }
      }
    }
    .footer-copy {
      font-size: 13px;
    }
  }
  @media (max-width: 600px) {
    padding: 16px 0 8px 0;
    .footer-content {
      font-size: 13px;
    }
  }
}
</style>
