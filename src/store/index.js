import { createStore } from 'vuex'; // Vuex 4.x 的导入方式

export default createStore({
  state: {
    user: {
      isLoggedIn: false, // 默认未登录
    },
  },
  mutations: {
    setLoggedIn(state, isLoggedIn) {
      state.user.isLoggedIn = isLoggedIn;
    },
  },
  actions: {
    login({ commit }) {
      commit('setLoggedIn', true);
    },
    logout({ commit }) {
      commit('setLoggedIn', false);
    },
  },
});
