import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import axios from 'axios'

Vue.config.productionTip = false


axios.interceptors.request.use(config => {
  var token = window.sessionStorage.getItem('token');
  config.headers.Authorization = token;
  return config;
})
// 挂载到Vue的原型对象$http中
Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
