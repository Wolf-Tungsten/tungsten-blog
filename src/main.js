import Vue from 'vue'
import App from './App.vue'
import AppMobile from './App-Mobile'
import router from './router'
import store from './store'
import './plugins/element.js'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => {
    if(document.body.clientWidth > 600){
      return h(App)
    } else {
      return h(AppMobile)
    }
  }
}).$mount('#app')
