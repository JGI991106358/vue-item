<template>
  <div id="app">
    <router-view></router-view>
    <FooterGuide v-show="$route.meta.showFooter"></FooterGuide>
  </div>
</template>

<script>
import FooterGuide from './components/FooterGuide/FootweGuide.vue'
export default {
  name: 'App',
  components: {
    FooterGuide
  },
  async mounted () {
    this.$store.dispatch('getAddress')
    // console.log(this)
    this.$store.dispatch('getUserInfo')
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  #app
  width 100%
  height 100%
  background #f5f5f5
    //
</style>
