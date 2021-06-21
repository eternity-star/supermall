<template>
  <div class="recommend">
    <div v-for="item in recommends" class="recommend-item">
      <a :href="item.url">
        <img :src="item.img_url" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "RecommendView",
    props: {
      recommends: {
        type: Array,
        default() {
          return [];
        }
      }
    }
  }
</script>

<style scoped>
  .recommend {
    display: flex;
    width: 100%;
    font-size: 3px;
    text-align: center;
    padding: 7px 0 12px;

    border-bottom: 8px solid #eee;
  }

  .recommend-item {
    flex: 1;

  }

  .recommend-item img {
    width: 60px;
    height: 60px;
    margin-bottom: 7px;
  }
</style>
