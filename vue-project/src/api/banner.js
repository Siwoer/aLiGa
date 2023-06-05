// 关于轮播图的接口
import ajax from "../utils/request";

// 封装一个获取轮播图列表的方法
export  function getBannerList(){
  return ajax ({
    url:'/banner/list'
  })
}

// 封装一个添加轮播图的数据请求接口
export  function addBanner(data){
  return ajax ({
    url:'/banner/add',
    method: 'post',
    data
  })
}

// 封装一个删除轮播图的请求接口
export  function delBanner(data){
  return ajax ({
    url:'/banner/delete',
    data
  })
}