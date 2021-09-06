<template>
  <div class="category-left">
      <div v-for="item in leftList">
        <p>{{item.name}}  ↓</p>
        <div v-for="i in item.children" class="">
          <p>{{i.name}}</p>
        </div>
      </div>
  </div>
</template>

<script>

  export default {
    name: 'CategoryLeft',
    props: {
      leftList: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
    },
    data () {
      return {
        
      }
    },
    methods: {
    }
  }

</script>

<style scoped>
  .category-left {
    width: 30%;
    height: 100%;
    background-color: #f3f;
    overflow: hidden;
  }

  .category-left p {
    text-align: center;
  }
  
</style>