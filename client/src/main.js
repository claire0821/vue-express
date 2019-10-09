import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { sync } from 'vuex-router-sync'
import store from '@/store/store'
import fontawesome from '@fortawesome/fontawesome'
import brands from '@fortawesome/fontawesome-free-brands'
import { faSpinner } from '@fortawesome/fontawesome-free-solid'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

// // 引入echarts且挂载在原型上
// import echarts from 'echarts'
// Vue.prototype.echarts = echarts

// import VueECharts from 'vue-echarts'
// import 'echarts/lib/chart/line'
// Vue.component('v-chart', VueECharts)

Vue.use(mavonEditor)
fontawesome.library.add(brands, faSpinner)
Vue.use(Vuetify)
sync(store, router)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
