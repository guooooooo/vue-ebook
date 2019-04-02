<template>
  <div class="home">
    <span class="text">hello fontface</span>
    <span class="icon-bookmark"></span>
  </div>
</template>

<script>
import Epub from 'epubjs'
global.ePub = Epub

export default {
}
</script>

<style scoped>
  .text {
    font-family: 'Days One';
    font-size: 30px;
  }
</style>
