import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false
// Vue.prototype.$http = axios;

Vue.use(VueAxios, axios)

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')

Vue.axios.defaults.baseURL = "http://localhost:5000/api";