//导入axios网络请求库
import axios from "axios";

//开发环境（写代码阶段  development）   生产环境（代码部署之后  production）   测试环境（代码写好后还没部署   production）

// isDev 为真时 开发环境 为假时 生产环境或者测试环境

// baseURL:isDev ? '后端给的地址' :'服务器的地址'
const isDev = process.env.NODE_ENV === 'development'
const request = axios.create({
  baseURL: isDev ? 'http://121.89.205.189:3000/admin' : 'http://121.89.205.189:3000/admin',
  // 等待60s 后抛出错误
  timeout: 60000
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 添加token
  // 1.获取token
  const token = localStorage.getItem('token') || ''

  //在头部设置token
  config.headers.token = token
  // console.log('111',config,token)

  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么

  if(response.data.code == '10119'){
    // token 失效
    //1.用户清空重新登录,获取新的token
    //2.服务器要是有通过就 token 换新 token的方法 我们也可以交换token
    // 清除本地存储
    localStorage.clear()
    //跳转到登录页面
    window.location.href = '/#/login'
  }
  return response.data;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
});

// 封装各种数据请求的方法

// 1.传个对象config对象

export default function ajax(config) {
  // 2. 从config中解构获取必要参数
  const { url = '', method = 'GET', data = {}, headers = {} } = config

  // 3. 判断请求类型
  switch (method.toUpperCase()) {
    case 'GET':
      return request.get(url, { params: data })

    case 'POST':

      // 1.表单提交的数据
      if (headers['content-type'] == 'application/x-www-form-url-encoded') {
        // 1.1转换参数类型 格式化数据
        const obj = new URLSearchParams()
        for (const key in data) {
          obj.append(key, data[key])
        }
        return request.post(url, obj, { headers })
      }

      // 2.文件数据
      if (headers['content-type'] == 'multipart/form-data') {
        // 2.1转换参数类型 格式化数据
        const obj = new FormData()
        for (const key in data) {
          obj.append(key, data[key])
        }
        return request.post(url, obj, { headers })
      }

      // 3. json 数据
      return request.post(url, data)

    case 'PUT':
      // 修改数据 --- 数据的更新
      return request.put(url, data)

    case 'DELETE':
      // 删除数据  括号表示可以多传
      return request.delete(url, { data })

    case 'PATCH':
      //更新局部资源
      return request.patch(url, data)
    default:
      // 如果前面都不是的情况下
      return request.request(config)
  }
}


