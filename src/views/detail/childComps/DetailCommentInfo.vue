<template>
  <div>
    <div class="commentTitle">
      <div class="title-left">评论</div>
      <div class="title-right">更多</div>
    </div>
    <div v-if="!commentInfo" class="goodsIf">
      <div v-for="item in commentInfo.content">
        <div>{{item}}</div>
      </div>
    </div>
    <div v-else class="goodsElse">
      <div>评论为空</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailCommentInfo",
    props: {
      commentInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .commentTitle {
    margin: 10px 0 10px 10px;
    padding-bottom: 30px;
    box-shadow: 0 1px 1px rgba(100, 100, 100, .08);
    font-size: 16px;
  }

  .title-left {
    float: left;
  }

  .title-right {
    float: right;
  }

  .goodsIf, .goodsElse{
    font-size: 16px;
    text-indent: 2em;
    margin-bottom: 15px;
  }
</style>
