import {request} from "./request";

export function getDetail(id) {
  return request({
    url: '/api/goods/'+id
  })
}

export class Goods {
  constructor(itemInfo) {
    this.title = itemInfo.title
    this.description = itemInfo.description
    this.price = itemInfo.price
    this.stock = itemInfo.stock
    this.sales = itemInfo.sales
    this.details = itemInfo.details
    this.collects_count = itemInfo.collects_count
    this.like_goods = itemInfo.like_goods
    this.comments = itemInfo.comments
  }
}
