import {debounce} from "./utils";

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    // 1.图片加载完成事件监听
    let refresh = debounce(this.$refs.scroll.refresh, 100)
    // 监听item中图片加载完成
    this.itemImgListener = () => {
      refresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImgListener)

    console.log('mixin内容')
  }
}
