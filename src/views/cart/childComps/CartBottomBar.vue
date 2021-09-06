<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button 
        :is-checked="isSelectAll" 
        class="check-button" 
        @click.native="checkClick"/>
      <span>全选</span>
    </div>

    <div class="price">
      合计：{{totalPrice}}
    </div>

    <div class="calculate" @click="calcClick">
      结算：({{checkLength}})
    </div>
  </div>
</template>

<script>
  import checkButton from 'components/content/checkButton/CheckButton'

  import { mapGetters } from 'vuex'

  export default {
    name: 'CartBottomBar',
    components: {
      checkButton
    },
    computed: {
      ...mapGetters(['cartLists']),
      totalPrice() {
        return '￥' + this.cartLists.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return (item.price * item.count) + preValue
        }, 0).toFixed(2)
      },
      checkLength() {
        return this.cartLists.filter(item => item.checked).length;
      },
      isSelectAll() {
        if (this.cartLists.length === 0) return false;
        // 1.find方法，效率比filter稍微高一点
        return !(this.cartLists.find(item => !item.checked))

        // 2.filter
        // return !(this.cartLists.filter(item => !item.checked).length)

        // 3.遍历
        // for (let item of this.cartLists) {
        //   if (!item.checked) {
        //     return false;
        //   }
        // }
        // return true
      }
    },
    methods: {
      checkClick() {
        if (this.isSelectAll) {
          this.cartLists.forEach(item => item.checked = false);
        } else {
          this.cartLists.forEach(item => item.checked = true)
        }

        // console.log('---');
      },
      calcClick() {
        if (!this.cartLists.find(item => item.checked)) {
          this.$toast.show('请选择购买的商品', 1500)
        }
        
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    position: fixed;
    bottom: 49px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    height: 40px;
    width: 100%;

    background-color: #eee;
  }

  .check-content {
    height: 40px;
    display: flex;
    align-items: center;
    margin-left: 10px;
  }

  .check-button {
    margin-right: 5px;
  }

  .price {
    margin-left: 15px; 
  } 

  .calculate {
    width: 30%;
    height: 100%;
    text-align: center;
    line-height: 250%;
    background-color: red;
    color: #eee;
    margin-left: 10px;
    margin-right: 10px;
  } 
</style>