import Vue from 'vue'
import App from './App'
import http from './common/http.js'

Vue.config.productionTip = false

new Vue({
  beforeCreate: function () {
    console.log(this.$serverUrl)
  }
})

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()


Vue.prototype.$HTTP = http  

Vue.prototype.initParams='';

Vue.prototype.code='';

