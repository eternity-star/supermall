import axios from "axios";

// 这种情况测试时main.js中无返回值，所以暂且不用
// export function request(config) {
//   return new Promise((resolve, reject) => {
//     // 1.创建axios实例
//     const instance1 = axios.create({
//       baseURL: 'http://123.207.32.32:8000',
//       timeout: 5000
//     })
//
//     //直接return是因为create函数里的小括号的返回值是一个Promise
//     // 3.发送真正网络请求
//     return instance1(config)
//   })
// }

export function request(config) {
  return new Promise((resolve, reject) => {
    // 1.创建axios实例
    const instance1 = axios.create({
      baseURL: 'https://api.shop.eduwork.cn/',
      timeout: 5000
    })

    // 2.axios拦截器
    // 拦截之后一定记得return出去，否则会报错
    // 2.1请求拦截
    instance1.interceptors.request.use(config => {
      // console.log(config);
      return config
    },err => {
      // console.log(err);
    })

    // 2.2响应拦截
    instance1.interceptors.response.use(res => {
      // console.log(res);
      return res.data
    }, err => {
      console.log(err);
    })

    // 3.发送真正网络请求
    instance1(config)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
  })
}
