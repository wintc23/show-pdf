<template>
  <div class="container" v-if="show">
    <div class="close">
      <div class="close_btn" @click="close">关闭</div>
    </div>
    <canvas v-for="page in pages" :id="'the-canvas'+page" :key="page"></canvas>
  </div>
</template>

<script>
import PDFJS from 'pdfjs-dist'

export default {
  data () {
    return {
      title: '',
      pdfDoc: null,
      loadding: false,
      pages: 0,
      show: false
    }
  },
  methods: {
    // 优化体验：可在此方法中触发loading提示
    showPDF (url) {
      this.pdfDoc = null
      this.loadFile(url)
    },
    loadFile (url) {
      let _this = this
      PDFJS.getDocument(url).then(function (pdf) {
        _this.show = true// pdf加载完成，显示插件，可在此方法开始时关闭loading提示
        _this.pdfDoc = pdf
        _this.pages = _this.pdfDoc.numPages
        _this.$nextTick(() => {
          _this.renderPage(1)
        })
      },
      function (err) { // 读取失败，错误处理，反馈信息
        console.log(err)
      })
    },
    renderPage (num) {
      let _this = this
      this.pdfDoc.getPage(num).then(function (page) {
        let canvas = document.getElementById('the-canvas' + num)
        let ctx = canvas.getContext('2d')
        let dpr = window.devicePixelRatio || 1
        let bsr = ctx.webkitBackingStorePixelRatio ||
          ctx.mozBackingStorePixelRatio ||
          ctx.msBackingStorePixelRatio ||
          ctx.oBackingStorePixelRatio ||
          ctx.backingStorePixelRatio || 1
        let ratio = dpr / bsr
        var viewport = page.getViewport(screen.availWidth / page.getViewport(1).width)
        canvas.width = viewport.width * ratio
        canvas.height = viewport.height * ratio
        canvas.style.width = viewport.width + 'px'
        canvas.style.height = viewport.height + 'px'
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
        var renderContext = {
          canvasContext: ctx,
          viewport: viewport
        }
        page.render(renderContext)
        if (_this.pages > num) {
          _this.renderPage(num + 1)
        }
      })
    },
    close () {
      this.show = false
    }
  }
}
</script>

<style scoped>
  .container{
    background-color: rgba(0,0,0,0.75);
    position:fixed;
    height: 100%;
    overflow: scroll;
    top:0;
  }
  .close{
    top:0;
    width:100%;
    position:fixed;
    padding: 5% 0;
    background: none;
  }
  .close_btn{
    position: static;
    background-color: #f74c31;
    width: 20%;
    border-radius:3px;
    text-align:center;
    font-weight:bold;
    margin-left: 70%;
  }
  canvas {
    display: block;
    border-bottom: 1px solid black;
  }
</style>
