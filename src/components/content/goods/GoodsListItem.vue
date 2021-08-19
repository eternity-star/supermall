<template>
  <div class="goods-item" @click="itemClick">
    <img :src="goodsItem.cover_url" alt="" @load="imageLoad">
    <div class="goods-info">
      <p></p>
      <span class="price">{{goodsItem.title}}</span>
      <span class="collect">{{goodsItem.collects_count}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props: {
      goodsItem: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      imageLoad() {
        this.$bus.$emit('itemImageLoad')
      },
      itemClick() {
        this.$router.push('/detail/' + this.goodsItem.id)
      }
    }
  }
</script>

<style scoped>
  .goods-item {
    padding-bottom: 30px;
    position: relative;

    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    right: 0;
    left: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-item p {
    overflow: hidden;
    /*显示省略符号来代表被修剪的文本。*/
    text-overflow: ellipsis;
    /*规定段落中的文本不进行换行：*/
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-item .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-item .collect {
    position: relative;
  }

  .goods-item .collect::before {
    /*content 属性与 :before 及 :after 伪元素配合使用，来插入生成内容。*/
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }

</style>
