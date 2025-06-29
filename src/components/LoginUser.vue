<template>
  <div class="login-mask">
    <div class="login-container">
      <span class="login-close" @click="$emit('close')">&times;</span>
      <h2 class="login-title">登录界面</h2>
      <input class="login-input" type="text" placeholder="请输入用户名" v-model="username" />
      <input class="login-input" type="password" placeholder="请输入密码" v-model="password" />
      <button class="login-btn" @click="login">登录</button>
      <div class="register-tip">
        没有账号，立即
        <a href="javascript:;" class="register-link" @click="$emit('show-register')">注册</a>
      </div>
      <div class="other-way-title">其他方式</div>
      <div class="other-login">
        <img src="@/assets/images/QQ.png" alt="QQ" class="login-icon" />
        <img src="@/assets/images/wechat.png" alt="WeChat" class="login-icon" />
        <img src="@/assets/images/alipay.png" alt="Alipay" class="login-icon" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginUser",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      // 登录逻辑
      alert(`用户名: ${this.username}, 密码: ${this.password}`);
    },
  },
};
</script>

<style scoped>
.login-mask {
  position: fixed;
  left: 0; top: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.18);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-container {
  width: 350px;
  margin: 40px auto;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.13);
  padding: 36px 32px 28px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
.login-title {
  font-size: 2rem;
  font-weight: 500;
  margin-bottom: 28px;
  color: #222;
}
.login-input {
  width: 100%;
  height: 38px;
  margin-bottom: 16px;
  border: none;
  border-radius: 6px;
  background: #f5f5f5;
  padding: 0 14px;
  font-size: 1rem;
  outline: none;
}
.login-btn {
  width: 100%;
  height: 40px;
  background: #218868;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 1.1rem;
  margin-bottom: 12px;
  cursor: pointer;
  transition: background 0.2s;
}
.login-btn:hover {
  background: #176c53;
}
.register-tip {
  font-size: 0.95rem;
  color: #888;
  margin-bottom: 10px;
}
.register-link {
  color: #218868;
  text-decoration: none;
  margin-left: 2px;
}
.register-link:hover {
  text-decoration: underline;
}
.other-way-title {
  color: #888;
  margin: 10px 0 8px 0;
  font-size: 0.98rem;
}
.other-login {
  display: flex;
  gap: 24px;
  margin-top: 4px;
}
.login-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #f5f5f5;
  object-fit: cover;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  cursor: pointer;
  transition: box-shadow 0.2s;
}
.login-icon:hover {
  box-shadow: 0 4px 16px rgba(33,136,104,0.18);
}
.login-close {
  position: absolute;
  right: 18px;
  top: 12px;
  font-size: 1.6rem;
  color: #aaa;
  cursor: pointer;
  z-index: 2;
  transition: color 0.2s;
}
.login-close:hover {
  color: #218868;
}
</style>
