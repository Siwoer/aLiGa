import ajax from '../utils/request'

// 封装商品列表的方法
export function getProList (){
  return ajax ({
    url:'/pro/list'
  })
}