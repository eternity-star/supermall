<template>
  <div class="cart-list">
    <cart-list-item 
      v-for="(item, index) in cartLists" 
      :key="index" 
      :item="item"/>
  </div>
</template>

<script>
  import CartListItem from './CartListItem.vue'

  import { mapGetters } from 'vuex'

  export default {
    name: "CartList",
    components: {
      CartListItem
    },
    computed: {
      ...mapGetters(['cartLists'])
    }
  }
</script>

<style scoped>

</style>