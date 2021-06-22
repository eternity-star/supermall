import {request} from "./request";

export function getHomeMultidata() {
  return request({
    url: '/api/index'
  })
}

export function getHomeRecommend() {
  return request({
    url: '/api/index',
    // params: {
    //   recommend: 1
    // }
  })
}

export function getHomeGoods(type, page=1) {
  return request({
    url: '/api/index?'+type+'=1&page='+page,
    // params: {
    //   type: 1,
    //   page: 1
    // }
  })
}
