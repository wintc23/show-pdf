<template>
  <div class="page">
    <label>请输入要打开的pdf地址:</label>
    <input type="text" v-model="url"/>
    <button @click="OpenPDF">打开pdf文件</button>
    <div class="notice">提示：DEV环境下请在config/index.js中配置代理，否则会出现跨域报错</div>
  </div>
</template>

<script>
let Base64 = require('js-base64').Base64
console.log(require('js-base64'))

export default {
  name: 'Home',
  data () {
    return {
      url: '/media/up/2018/3/9/494079c7ec333bd371798dd0a73c0a0b.pdf'
    }
  },
  methods: {
    OpenPDF () {
      this.$router.push({ name: 'PDF', query: { url: Base64.encode(this.url) } })
    }
  }
}
</script>

<style scoped>
</style>
