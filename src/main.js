import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import store from '@/store'
import axios from '@/axios'
import Vuelidate from 'vuelidate'
import VueCroppie from 'vue-croppie';

Vue.use(VueCroppie);

Vue.config.productionTip = false;

Vue.use(Vuelidate);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
