import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import KCSOCDashboard from './plugins/kcsoc-dashboard'

Vue.config.productionTip = false
Vue.config.silent = true

Vue.use(KCSOCDashboard)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
