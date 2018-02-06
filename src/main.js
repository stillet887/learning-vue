// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import Vuelidate from 'vuelidate'
import axios from 'axios'

Vue.config.productionTip = false;

axios.defaults.baseURL = 'https://json-users-api.herokuapp.com';

Vue.use(Vuelidate);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  render: h => h(App)
})
