import Vue from 'vue'
import App from './pages/Index.vue'
import './registerServiceWorker'
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8081/';

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
