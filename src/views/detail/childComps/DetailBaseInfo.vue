<template>
  <div v-if="Object.keys(goods).length != 0" class="base-info">
    <div class="info-title">
      <span>{{goods.title}}</span>
    </div>
    <div class="info-price">
      <span class="n-price">￥{{goods.price}}</span>
    </div>
    <div class="info-other">
      <span>销量 {{goods.sales}}</span>
      <span>收藏 {{goods.collects_count}}人</span>
      <span>库存 {{goods.stock}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailBaseInfo",
    props: {
      goods: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .base-info {
    padding: 10px;
  }

  .info-title {
    font-size: 16px;
    font-weight: 600;
    padding: 7px 0;
    box-shadow: 0 1px 1px rgba(100, 100, 100, 0.08);
  }

  .info-title span {
    margin-bottom: 10px;
  }

  .info-price {
    font-size: 20px;
    color: var(--color-high-text);
    padding: 7px 0;
    box-shadow: 0 1px 1px rgba(100, 100, 100, 0.08);
  }

  .info-other {
    display: flex;
    padding: 6px 0;
    box-shadow: 0 1px 1px rgba(100, 100, 100, .08);
  }

  .info-other span {
    flex: 1;
    color: var(--color-text);
    font-size: 14px;
  }
</style>
