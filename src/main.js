import Vue from 'vue'
import App from './pages/Index.vue'
import './registerServiceWorker'
import axios from 'axios';
import Vuelidate from 'vuelidate';

axios.defaults.baseURL = 'http://192.168.1.111:8081/';

Vue.config.productionTip = false

Vue.use(Vuelidate);

new Vue({
  render: h => h(App),
}).$mount('#app')
