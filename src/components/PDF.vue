<template>
  <div>
    <canvas v-for="page in pages" :id="'the-canvas'+page" :key="page"></canvas>
  </div>
</template>

<script>
import PDFJS from 'pdfjs-dist'
let Base64 = require('js-base64').Base64

export default {
  data () {
    return {
      title: '',
      pdfDoc: null,
      loadding: false,
      pages: 0
    }
  },
  methods: {
    renderPage (num) {
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
        // screen.availWidth / page.getViewport(1).width
        console.log('the-canvas' + num)
        // Render PDF page into canvas context
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
      })
    },
    async loadFile (url) {
      let _this = this
      await PDFJS.getDocument(url).then(function (pdf) {
        _this.show = true
        _this.pdfDoc = pdf
        _this.pages = _this.pdfDoc.numPages
        _this.$nextTick(() => {
          for (let page = 1; page <= _this.pages; page++) {
            _this.renderPage(page)
          }
        })
      })
      _this.$f7.hideIndicator()
    }
  },
  async mounted () {
    let url = Base64.decode(this.$route.query.url)
    console.log(url)
    this.loadFile(url)
  }
}
</script>

<style scoped>
canvas {
  margin: 1px auto;
  display: block;
}
</style>
