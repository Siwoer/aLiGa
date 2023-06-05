import ajax from "../utils/request";

//封装登录的数据请求
export function loginFn (data){
  return ajax({
    url:'/admin/login',
    method:'post',
    data
  })
}

// 封装获取管理员列表的接口
export function adminList (){
  return ajax ({
    url:'/admin/list'
  })
}

// 封装添加管理员的接口
export function addAdmin (data) {
return ajax ({
  url:'/admin/add',
  method:'post',
  data
})
}

// 封装修改管理员的接口
export function adminUpdate (data) {
  return ajax ({
    url:'/admin/update',
    method:'post',
    data
  })
  }

  // 封装删除管理员的接口
export function adminDelete (data) {
  return ajax ({
    url:'/admin/delete',
    method:'post',
    data
  })
  }

    // 封装获取用户列表数据的接口
export function getUserList () {
  return ajax ({
    url:'/user/list',
  })
  }