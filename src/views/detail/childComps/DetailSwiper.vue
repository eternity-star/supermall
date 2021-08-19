<template>
  <div class="detail-swiper">
<!--    <swiper>-->
<!--      <swiper-item v-for="item in imagesTop">-->
<!--        <img :src="item" alt="">-->
<!--      </swiper-item>-->
<!--    </swiper>-->
    <div class="swiper"><img :src="imageTop" alt=""></div>
  </div>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'

  export default {
    name: "DetailSwiper",
    components: {
      Swiper,
      SwiperItem
    },
    props: {
      imageTop: {
        type: String,
        default() {
          return ''
        }
      }
    }
  }
</script>

<style scoped>
  .swiper {
    height: 300px;
    overflow: hidden;
  }

  .swiper img{
    width: 100%;
  }
</style>
