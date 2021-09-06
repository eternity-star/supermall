import * as types from './mutation-types'

export default {
  // mutations唯一的目的就是修改state中的状态
  // mutations中的每个方法尽可能完成的事件比较单一一点
  [types.ADD_COUNTER](state, payload) {
    payload.count += 1;
  },
  [types.ADD_TO_CART](state, payload) {
    payload.checked = true;
    state.cartLists.push(payload);
  }
}