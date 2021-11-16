import 'reflect-metadata';
import 'vue-tsx-support/enable-check';
import Vue from 'vue';
import './common/reset.less';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;
new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
