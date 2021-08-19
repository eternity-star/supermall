<template>
  <div class="goods">
    <goods-list-item v-for="(item, index) in goods" :key="index" :goods-item="item"/>
  </div>
</template>

<script>
  import GoodsListItem from "./GoodsListItem";

  export default {
    name: "GoodsList",
    components: {
      GoodsListItem
    },
    props: {
      goods: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .goods {
    display: flex;
    /*让弹性盒元素在必要的时候拆行：*/
    flex-wrap: wrap;
    /*在弹性盒对象的 <div> 元素中的各项周围留有空白：*/
    justify-content: space-around;
    padding: 2px;
  }
</style>
