<template>
      <!--首页外卖-->
      <div class="msite">
        <Header :title="address.name">
          <!-- 将原来的span做成路由标签直接导航到指定路径 -->
          <router-link class="header_search" slot="left" to="/search">
            <i class="iconfont icon-sousuo"></i>
          </router-link>
          <router-link class="header_login" slot="right" :to="userInfo._id? '/userinfo' : '/login' ">
            <i class="iconfont icon-person" v-if="userInfo._id"></i>
            <span class="header_login_text" v-else>登录|注册</span>
          </router-link>
        </Header>
        <!--首页导航-->
        <nav class="msite_nav">
          <div class="swiper-container" v-if="categorys.length">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(categorys, index) in categorysArr" :key="index">
                <a href="javascript:" class="link_to_food" v-for="(category) in categorys" :key="category.id">
                  <div class="food_container">
                    <img :src="baseImageUrl+category.image_url">
                  </div>
                  <span>{{category.title}}</span>
                </a>
              </div>
            </div>
            <!-- Add Pagination -->
            <div class="swiper-pagination"></div>
          </div>
          <div v-else>
            <img src="./images/msite_back.svg" alt="">
          </div>
        </nav>
        <!--首页附近商家-->
        <div class="msite_shop_list">
          <div class="shop_header">
            <i class="iconfont icon-xuanxiang"></i>
            <span class="shop_header_title">附近商家</span>
          </div>
        </div>
        <ShopList></ShopList>
      </div>
</template>

<script>
import {mapState} from 'vuex'
import 'swiper/swiper-bundle.min.css'
import Swiper from 'swiper/swiper-bundle.min.js'
import Header from '@/components/Header/Header'
import ShopList from '@/components/ShopList/ShopList'
export default {
  data () {
    return {
      baseImageUrl: 'https://fuss10.elemecdn.com/'
    }
  },
  mounted () {
    // 使用vuex获取数据
    this.$store.dispatch('getCategorys')
    this.$store.dispatch('getShops')
  },
  components: {
    Header,
    ShopList
  },
  computed: {
    // 读出在state的数据
    ...mapState(['address', 'categorys', 'userInfo']),
    // 计算出轮播图的二维数组
    categorysArr () {
      const {categorys} = this
      const arr = [] // 创建一个外层大数组
      let minArr = [] // 内部小数组
      categorys.forEach(c => {
        if (minArr.length === 8) {
          minArr = []
        }
        if (minArr.length === 0) {
          arr.push(minArr)
        }
        minArr.push(c)
      })
      return arr
    }
  },
  watch: {
    // 监测数据更新轮播图的数据显示
    categorys () {
      this.$nextTick(() => {
        /* eslint-disable no-new */
        // 创建一个swiper实例
        new Swiper('.swiper-container', {
          loop: true, // 循环模式选项
          // 分页器
          pagination: {
            el: '.swiper-pagination'
          }
        })
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../common/stylus/mixins"
.msite  //首页
  width 100%
  .msite_nav
    bottom-border-1px(#e4e4e4)
    margin-top 45px
    height 200px
    background #fff
    .swiper-container
      width 100%
      overflow hidden
      height 100%
      .swiper-wrapper
        width 100%
        height 100%
        .swiper-slide
          display flex
          justify-content center
          align-items flex-start
          flex-wrap wrap
          .link_to_food
            width 25%
            .food_container
              display block
              width 100%
              text-align center
              padding-bottom 10px
              font-size 0
              img
                display inline-block
                width 50px
                height 50px
            span
              display block
              width 100%
              text-align center
              font-size 13px
              color #666
      .swiper-pagination
        >span.swiper-pagination-bullet-active
          background #02a774
  .msite_shop_list
    top-border-1px(#e4e4e4)
    margin-top 10px
    background #fff
    .shop_header
      padding 10px 10px 0
      .shop_icon
        margin-left 5px
        color #999
      .shop_header_title
        color #999
        font-size 14px
        line-height 20px
</style>
