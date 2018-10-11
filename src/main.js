// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import PDF from '@/components/pdf'// 引入在线预览pdf组件

Vue.config.productionTip = false
Vue.use(PDF)// 使用plugin方式调用在线预览pdf组件

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
