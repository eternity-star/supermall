<template>
  <div class="category-right">右边任务栏</div>
</template>

<script>
  export default {
    name: 'CategoryRight',
    data () {
      return {
      
      }
    }
  }

</script>

<style scoped>
  .category-right {
    position: absolute;
    top: 44px;
    right: 0;
    left: 30%;
   
    width: 75%;
    height: calc(100% - 93px);
    background-color: blueviolet;
  }
</style>