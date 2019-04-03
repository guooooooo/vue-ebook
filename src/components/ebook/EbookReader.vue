<template>
  <div class="ebook-reader">
    <div id="read"></div>
  </div>
</template>

<script>
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
    ...mapGetters(['fileName'])
  },
  methods: {
    initEpub () {
      let baseUrl = 'http://localhost:8091/epub/'
      let url = `${baseUrl}${this.fileName}.epub`
      this.book = new Epub(url)
      this.rendition = this.book.renderTo('read', {
        width: innerWidth,
        height: innerHeight,
        method: 'default'
      })
      this.rendition.display()
    }
  }
}
</script>

<style>

</style>
