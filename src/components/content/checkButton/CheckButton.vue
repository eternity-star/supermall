<template>
  <div class="check-button" :class="{check: isChecked}">
    <img src="~assets/img/cart/yes.svg" alt="">
  </div>
</template>

<script>
  export default {
    name: 'CheckButton',
    props: {
      isChecked: {
        type: Boolean,
        default() {
          return false;
        }
      }
    }
  }
</script>

<style scoped>
  .check-button {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    background-color: #aaa;
    border-radius: 50%;
    border: 0.3px solid #aaa
  }

  .check {
    background-color: var(--color-tint);
  }

  .check-button img{
    width: 20px;
    height: 20px;
  }
</style>