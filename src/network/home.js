import {request} from "./request";

export function getHomeMultidata() {
  return request({
    url: '/api/index'
  })
}

export function getHomeRecommend() {
  return request({
    url: '/api/index',
    params: {
      recommend: 1
    }
  })
}
