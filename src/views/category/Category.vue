<template>
  <div id="category">
    <nav-bar class="category_nav">
      <div slot="center">分类</div></nav-bar>
    <div class="main">
      <category-left ref="left" :leftList="leftList"></category-left>
      <category-right ref="right"></category-right>
    </div>
  </div>
</template>

<script>
  import { getCategory } from "network/category.js";

  import NavBar from 'components/common/navbar/NavBar'
  // import Scroll from 'components/common/scroll/Scroll'

  import CategoryLeft from './childComps/CategoryLeft.vue'
  import CategoryRight from './childComps/CategoryRight.vue'

  export default {
    name: "Category",
    components: {
      NavBar,
      // Scroll,
      CategoryLeft,
      CategoryRight
    },
    data() {
      return {
        leftList: [],
        rightList: null
      }
    },
    created () {
      this.getCategory()
    },
    mounted() {
      
    },
    methods: {
      getCategory() {
        getCategory().then(res => {
          console.log(res);
          this.leftList = res.categories          
        })
      }
    }
  }
</script>

<style scoped>
  #category {
    height: 100vh;
  }

  .main {
    height: calc(100% - 93px);
  }

  .left-first {
    height: 100%;
    
  }

  .content {
    overflow: hidden;
    height: calc(100%);
  }
</style>
