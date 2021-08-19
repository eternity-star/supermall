<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick"/>
    <Scroll class="content"
            :pull-up-load="true"
            ref="scroll">
<!--  格式 => 属性：topImages, 传入值：top-images-->
      <detail-swiper :image-top="imageTop"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :goods="goods"/>
      <detail-params-info ref="params"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="like_goods"/>

    </Scroll>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailParamsInfo from "./childComps/DetailParamsInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";


  import Scroll from "components/common/scroll/Scroll";
  import GoodsList from "components/content/goods/GoodsList";

  import {getDetail, Goods} from "network/detail";
  import {debounce} from "common/utils";
  import {itemListenerMixin} from "common/mixin";

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailParamsInfo,
      DetailCommentInfo,
      Scroll,
      GoodsList
    },
    mixins: [itemListenerMixin],
    data() {
      return {
        id: null,
        imageTop: '',
        goods: {},
        like_goods: [],
        commentInfo: {},
        themeTopYs: []
      }
    },
    created() {
      // 1.保存传入的id
      this.id = this.$route.params.id

      // 2.请求数据
      getDetail(this.id).then(res => {
        // 1.获取顶部图片的轮播数据
        console.log(res);
        const data = res.goods
        this.imageTop = data.cover_url

        // 2.获取商品数据
        this.goods = new Goods(data)
        // console.log(this.goods);

        // 3.获取商品参数信息

        // 4.取出评论信息
        if (data.comments.length !== 0) {
          this.commentInfo = data.comments[0]
        }
        else {}

        // 5.获取推荐商品信息
        this.like_goods = res.like_goods
      })

      this.$nextTick(() => {
        this.themeTopYs = []

        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);

        console.log(this.themeTopYs)
      })
    },
    mounted() {
      // // 1.v-html内的内容加载完成事件监听
      // const refresh = debounce(this.$refs.scroll.refresh, 500)
      // // 监听v-html中文本加载完成
      // this.$bus.$on('itemWenBenLoad', () => {
      //   refresh()
      // })

      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
    },
    destroyed() {
      this.$bus.$off('itemImageLoad', this.itemImgListener)
    },
    methods: {
      titleClick(index) {
        console.log(index);
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 500)
      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 10;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 10;
  }

  .content {
    height: calc(100% - 44px);
    overflow: hidden;
  }
</style>
