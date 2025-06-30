<template>
  <div class="login-modal" v-if="isVisible">
    <h2>登录</h2>
    <form @submit.prevent="handleLogin">
      <input v-model="username" placeholder="用户名" />
      <input v-model="password" type="password" placeholder="密码" />
      <button type="submit">登录</button>
      <button @click="closeModal">关闭</button>
    </form>
  </div>
</template>

<script>
import { ref, defineComponent } from 'vue';
import { useStore } from 'vuex'; // Vue 3 的 Vuex 使用方式

export default defineComponent({
  props: {
    isVisible: Boolean,
  },
  emits: ['close'], // 显式声明 emits
  setup(props, { emit }) {
    const store = useStore(); // 获取 Vuex store
    const username = ref('');
    const password = ref('');

    const handleLogin = () => {
      store.dispatch('login');
      emit('close'); // 触发 close 事件
    };

    const closeModal = () => {
      emit('close'); // 触发 close 事件
    };

    return {
      username,
      password,
      handleLogin,
      closeModal,
    };
  },
});
</script>

<style scoped>
.login-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background: white;
  border: 1px solid #ccc;
  z-index: 1000;
}
</style>
