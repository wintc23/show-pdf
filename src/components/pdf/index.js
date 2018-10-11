import PDF from './pdf'

var $vm
export default {
  install (Vue, options) {
    if (!$vm) {
      const PDFPlugin = Vue.extend(PDF)
      $vm = new PDFPlugin().$mount()
      document.body.appendChild($vm.$el)
    }
    Vue.prototype.$showPDF = function (url) {
      $vm.showPDF(url)
    }
  }
}
