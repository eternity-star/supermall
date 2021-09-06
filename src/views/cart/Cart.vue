<template>
  <div class="cart ignore">
    <nav-bar class="cart-nav">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <scroll class="content" 
            :probe-type="3" 
            :pull-up-load="true" 
            ref="scroll">
      <cart-list/>
    </scroll>
    <cart-bottom-bar/>
  </div>
</template>

<script>
  import CartList from './childComps/CartList'
  import CartBottomBar from './childComps/CartBottomBar.vue'

  import NavBar from 'components/common/navbar/NavBar'
  import Scroll from "components/common/scroll/Scroll";

  import { mapGetters } from 'vuex'

  export default {
    name: "Cart",
    components: {      
      CartList,
      CartBottomBar,
      NavBar,
      Scroll
    },
    data () {
      return {
        
      }
    },
    computed: {
      // 两种语法
      // 1、
      // ...mapGetters([
      //   'cartLength', 'cartLists'
      // ])

      // 2、
      ...mapGetters({
        length: 'cartLength'
      })
    },
    activated () {
      console.log('活跃');
      // this.$refs.scroll.refresh()
    },
    deactivated () {
      console.log('失活');
    }
  }
</script>

<style scoped>
  .cart {
    height: 100vh;
  }

  .cart-nav {
    background-color: var(--color-tint);
    color: #fff;
    /* font-weight: 700; */
  }

  .content {
    height: calc(100% - 93px - 40px);
    overflow: hidden;
  }
</style>