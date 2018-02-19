import axios from 'axios'
import keys from '@/appKeys'

axios.defaults.baseURL = 'https://json-users-api.herokuapp.com';

axios.interceptors.request.use(function (config) {
  if(config.url.match('https://api.imgur.com/3/image')) {
    config.headers = {
      'Authorization': keys.imgur
    }
  }
  return config;
});
