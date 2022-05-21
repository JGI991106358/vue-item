import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USERINGO,
  RESET_USERINFO,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO
} from './mutations-type'
import { reqAddress, reqFoodcategorys, reqShoops, reqUserInfo, reqLogout, reqShopGoods, reqShopRatings, reqShopInfo } from '../api/index'
export default {
  // 异步获取地址
  async getAddress ({ commit, state }) {
    // 发送异步ajax请求
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqAddress(geohash)
    // 提交mutstions
    if (result.code === 0) {
      const address = result.data
      commit(RECEIVE_ADDRESS, { address })
    }
  },

  // 异步获取食品分类 解构出context中的commit或者value里面的state
  async getCategorys ({ commit }) {
    // 发送异步ajax请求
    const result = await reqFoodcategorys()
    // 提交mutstions
    if (result.code === 0) {
      const categorys = result.data
      commit(RECEIVE_CATEGORYS, { categorys })
    }
  },

  // 异步获取商家列表
  async getShops ({ commit, state }) {
    // 发送异步ajax请求
    const { longitude, latitude } = state
    const result = await reqShoops(longitude, latitude)
    // 提交mutstions
    if (result.code === 0) {
      const shops = result.data
      commit(RECEIVE_SHOPS, { shops })
    }
  },

  // 同步获取用户登入信息列表
  recordUser ({ commit }, userInfo) {
    commit(RECEIVE_USERINGO, { userInfo })
  },

  // 异步获取用户详细信息
  async getUserInfo ({ commit }) {
    const result = await reqUserInfo()
    if (result.code === 0) {
      const userInfo = result.data
      commit(RECEIVE_USERINGO, { userInfo })
    }
  },

  // 退出
  async logout ({ commit }) {
    const result = await reqLogout()
    if (result.code === 0) {
      commit(RESET_USERINFO)
    }
  },

  // 异步获取商品信息
  async getShopGoods ({ commit }) {
    const result = await reqShopGoods()
    if (result.code === 0) {
      const goods = result.data
      commit(RECEIVE_GOODS, { goods })
    }
  },

  // 异步获取商家评论信息
  async getShopRactings ({ commit }) {
    const result = await reqShopRatings()
    if (result.code === 0) {
      const ractings = result.data
      commit(RECEIVE_RATINGS, { ractings })
    }
  },

  // 异步获取商家信息
  async getShopInfo ({ commit }) {
    const result = await reqShopInfo()
    if (result.code === 0) {
      const info = result.data
      commit(RECEIVE_INFO, { info })
    }
  }
}
