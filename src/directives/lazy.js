export default {
  mounted(el, binding) {
    if (typeof binding.value !== 'function') {
      // 不是函数时不注册observer，防止报错
      return;
    }
    const callback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (typeof binding.value === 'function') {
            try {
              binding.value();
            } catch (e) {
              // 捕获回调异常，防止影响observer
              console.error('v-lazy callback error:', e);
            }
          }
          observer.unobserve(el);
        }
      });
    };
    const observer = new window.IntersectionObserver(callback);
    observer.observe(el);
    el._lazyObserver = observer;
  },
  beforeUnmount(el) {
    if (el._lazyObserver) {
      el._lazyObserver.disconnect();
      delete el._lazyObserver;
    }
  }
}