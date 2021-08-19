<template>
    <div class="wenben">
      <div class="wenben1"><span>商品详情</span></div>
      <div v-if="!goods.details"><div>详情为空</div></div>
      <div v-else class="wenben2">
        <div v-html="goods.details">{{goods.details}}</div>
      </div>

    </div>
</template>

<script>
  export default {
    name: "DetailShopInfo",
    props: {
      goods: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        divHeight: 0
      }
    },
    methods: {
      btnClick() {
        let wenBen2Div = document.getElementById('#wenben2')
        // let ceShiDiv = document.getElementById('#ceShi')

        let wenBen2DivHeight = wenBen2Div.style.height;
        this.divHeight = wenBen2DivHeight;
      }


      // wenBenLoad() {
      //   this.$bus.$emit('itemWenBenLoad')
      // },
      // text() {
      //   return (this.goods.details)
      // }
    }
  }
</script>

<style scoped>
  .wenben {
    padding: 10px;
  }

  .wenben1 {
    margin: 10px 0 10px 10px;
    padding-bottom: 10px;
    box-shadow: 0 1px 1px rgba(100, 100, 100, .08);
  }

  /*.vHtml {*/
  /*  text-indent: 2em;*/
  /*}*/

  /*.vHtml >>> img{*/
  /*  width: 100%;*/
  /*  height: 300px;*/
  /*}*/


</style>
