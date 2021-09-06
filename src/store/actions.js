import * as types from './mutation-types'

export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      // 1.查找之前数组中是否有该商品
      let oldProduct = context.state.cartLists.find(item => payload.id === item.id)

      // 2.判断oldProduct
      if (oldProduct) {
        // oldProduct.count += 1;
        context.commit(types.ADD_COUNTER, oldProduct)
        resolve('当前商品数量+1')
      } else {
        payload.count = 1;
        // state.cartLists.push(payload);
        context.commit(types.ADD_TO_CART, payload)
        resolve('添加了新的商品')
      }
    })
  }
}