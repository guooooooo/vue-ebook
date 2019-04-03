<template>
  <div class="ebook-reader">
    <div id="read"></div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import Epub from 'epubjs'
global.ePub = Epub

export default {
  mounted () {
    let fileName = this.$route.params.fileName.split('|').join('/')
    this.$store.dispatch('setFilename', fileName).then(() => {
      this.initEpub()
    })
  },
  computed: {
    ...mapGetters(['fileName', 'menuVisible'])
  },
  methods: {
    initEpub () {
      let baseUrl = 'http://localhost:8091/epub/'
      let url = `${baseUrl}${this.fileName}.epub`
      this.book = new Epub(url)
      this.rendition = this.book.renderTo('read', {
        width: innerWidth,
        height: innerHeight
      })
      this.rendition.display()
      this.rendition.on('touchstart', event => {
        this.touchStartX = event.changedTouches[0].clientX
        this.touchStartTime = event.timeStamp
      })
      this.rendition.on('touchend', event => {
        const offsetX = event.changedTouches[0].clientX - this.touchStartX
        const time = event.timeStamp - this.touchStartTime
        if (offsetX > 40 && time < 500) {
          this.prevPage()
        } else if (offsetX < -40 && time < 500) {
          this.nextPage()
        } else {
          this.toggleTitleAndMenu()
        }
        // event.preventDefault()
        // event.stopPropagation()
      })
    },
    prevPage () {
      if (this.rendition) {
        this.rendition.prev()
        this.hideTitleAndMenu()
      }
    },
    nextPage () {
      if (this.rendition) {
        this.rendition.next()
        this.hideTitleAndMenu()
      }
    },
    toggleTitleAndMenu () {
      this.$store.dispatch('setMenuVisible', !this.menuVisible)
    },
    hideTitleAndMenu () {
      this.$store.dispatch('setMenuVisible', false)
    }
  }
}
</script>

<style>

</style>
