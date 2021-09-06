import { request } from "./request";

export function getCategory() {
  return request({
    url: '/api/goods'
  });
}

export function getCategoryInfo(maitKey) {
  return request({
    url: "/category/info",
    params: {
      maitKey
    }
  });
}
