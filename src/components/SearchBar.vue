<template>
  <div class="search-bar">
    <div class="search-area">
      <input
        class="search-input"
        type="text"
        placeholder="输入你想要的商品"
        v-model="keyword"
        @keyup.enter="onSearch"
      />
      <button class="search-btn" @click="onSearch">搜索</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const keyword = ref('')
const onSearch = () => {
  // 这里可以触发搜索逻辑
  alert('搜索: ' + keyword.value)
}
</script>

<style lang="scss" scoped>
.search-bar {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 0 18px 0;
  .logo {
    width: 48px;
    height: 48px;
    margin-right: 32px;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(25,118,210,0.08);
    background: #fff;
    object-fit: contain;
  }
  .search-area {
    display: flex;
    flex: 1;
    max-width: 600px;
    box-shadow: 0 2px 12px rgba(25,118,210,0.10);
    border-radius: 8px;
    background: #fff;
    overflow: hidden;
  }
  .search-input {
    flex: 1;
    height: 44px;
    border: none;
    padding: 0 18px;
    font-size: 17px;
    color: #222;
    background: transparent;
    outline: none;
    &::placeholder {
      color: #b0b4ba;
      font-size: 15px;
    }
    &:focus {
      background: #f5faff;
    }
  }
  .search-btn {
    height: 44px;
    min-width: 90px;
    padding: 0 28px;
    background: linear-gradient(90deg, #1976d2 0%, #42a5f5 100%);
    color: #fff;
    border: none;
    font-size: 17px;
    font-weight: 500;
    border-radius: 0 8px 8px 0;
    box-shadow: 0 2px 8px rgba(25,118,210,0.10);
    cursor: pointer;
    transition: background 0.2s, box-shadow 0.2s;
    letter-spacing: 2px;
    &:hover {
      background: linear-gradient(90deg, #1565c0 0%, #1976d2 100%);
      box-shadow: 0 4px 16px rgba(25,118,210,0.18);
    }
  }
  @media (max-width: 600px) {
    .search-bar {
      flex-direction: column;
      padding: 12px 0;
      .logo {
        margin: 0 0 8px 0;
      }
      .search-area {
        width: 100%;
        max-width: none;
        border-radius: 8px;
        flex-direction: column;
      }
      .search-input {
        width: 100%;
        border-radius: 8px;
        margin-bottom: 8px;
        font-size: 14px;
        padding: 0 12px;
        height: 40px;
      }
      .search-btn {
        width: 100%;
        border-radius: 8px;
        margin-bottom: 0;
        font-size: 14px;
        min-width: auto;
        padding: 0 16px;
        height: 40px;
      }
    }
  }
}
</style>
