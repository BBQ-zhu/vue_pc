import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from 'vue-router';
import {
  get,
  post
} from './request/http';
import commonJS from './assets/js/common';
import api from './request/api';

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.prototype.$axios = {
  get,
  post
}
Vue.prototype.$common = commonJS
Vue.prototype.$api = api
Vue.use(VueRouter);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
