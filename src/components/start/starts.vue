<template>
  <div class="star" :class=" 'star-' + size ">
    <span class="star-item on" v-for="(sc, index) in startClasses" :key="index" :class="sc"></span>
  </div>
</template>

<script>
const CLASS_ON = 'on'
const CLASS_HALF = 'half'
const CLASS_OFF = 'off'
export default {
  props: {
    score: Number,
    size: Number
  },
  computed: {
    startClasses () {
      const {score} = this
      const scs = []
      // 添加全星 使用floor向下取整
      const scoreInt = Math.floor(score)
      for (let i = 0; i < scoreInt; i++) {
        scs.push(CLASS_ON)
      }
      // 添加half 半颗心 这里js小数运算不精确所以乘10
      if (score * 10 - scoreInt * 10 >= 5) {
        scs.push(CLASS_HALF)
      }
      // 添加off 空白星 使用while循环往数组后面添加灰星直至数组长度小于5结束循环
      while (scs.length < 5) {
        scs.push(CLASS_OFF)
      }
      // console.log(scs)
      return scs
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../common/stylus/mixins"
.star //2x图 3x图
  float left
  font-size 0
  .star-item
    display inline-block
    background-repeat no-repeat
  &.star-48
    .star-item
      width 20px
      height 20px
      margin-right 22px
      background-size 20px 20px
      &:last-child
        margin-right: 0
      &.on
        bg-image('./images/star48_on')
      &.half
        bg-image('./images/star48_half')
      &.off
        bg-image('./images/star48_off')
  &.star-36
    .star-item
      width 15px
      height 15px
      margin-right 6px
      background-size 15px 15px
      &:last-child
        margin-right 0
      &.on
        bg-image('./images/star36_on')
      &.half
        bg-image('./images/star36_half')
      &.off
        bg-image('./images/star36_off')
  &.star-24
    .star-item
      width 10px
      height 10px
      margin-right 3px
      background-size 10px 10px
      &:last-child
        margin-right 0
      &.on
        bg-image('./images/star24_on')
      &.half
        bg-image('./images/star24_half')
      &.off
        bg-image('./images/star24_off')
</style>
