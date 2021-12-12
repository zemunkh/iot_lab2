import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
// import * as io from 'socket.io-client'
import VueSocketIO from 'vue-socket.io'
import io from 'socket.io-client'

Vue.config.productionTip = false

const socketConnection = io('http://localhost:3001');

Vue.use(new VueSocketIO({
  debug: true,
  connection: socketConnection
}))


// Vue.use(new VueSocketIO({
//     connection: 'http://localhost:3000',
//   })
// );

new Vue({
  axios,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
