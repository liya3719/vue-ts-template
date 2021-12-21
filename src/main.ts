import 'reflect-metadata';
import 'babel-polyfill';
import 'vue-tsx-support/enable-check';
import Vue from 'vue';
import './assets/css/reset.less';
import './assets/css/element-variables.scss';
import App from './App.vue';
import router from './router/router';
import ElementUI from 'element-ui';
Vue.use(ElementUI)
Vue.config.productionTip = false;
new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
