/*
  使用mockjs提供的接口数据
*/
import Mock from 'mockjs'
import data from './data'

// 返回商品Goods的接口code后台传输用于判断数据是否正常
Mock.mock('/goods', { code: 0, data: data.goods })
// 返回商家ratings的接口
Mock.mock('/ratings', { code: 0, data: data.ratings })
// 返回商家info的接口
Mock.mock('/info', { code: 0, data: data.info })
