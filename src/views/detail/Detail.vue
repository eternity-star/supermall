<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <Scroll class="content"
            :pull-up-load="true"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll">
<!--  格式 => 属性：topImages, 传入值：top-images-->
      <detail-swiper :image-top="imageTop"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :goods="goods"/>
      <detail-params-info ref="params"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="like_goods" class="detail-goods-list"/>
    </Scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
    <detail-bottom-bar @addCart="addToCart"/>

    <toast message="哈哈哈"/>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailParamsInfo from "./childComps/DetailParamsInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import DetailBottomBar from "./childComps/DetailBottomBar";

  import Scroll from "components/common/scroll/Scroll";
  import GoodsList from "components/content/goods/GoodsList";
  import Toast from "components/common/toast/Toast";

  import {getDetail, Goods} from "network/detail";
  import {debounce} from "common/utils";
  import {itemListenerMixin, backTopMixin} from "common/mixin";
  import { mapActions } from 'vuex'

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailParamsInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      GoodsList,
      Toast
    },
    mixins: [backTopMixin],
    data() {
      return {
        id: null,
        imageTop: '',
        goods: {},
        like_goods: [],
        commentInfo: {},
        themeTopYs: [],
        itemImgListener: null,
        getThemeTopY: null,
        currentIndex: 0
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

      /*
      this.$nextTick(() => {
        // 根据最新的数据，对应的DOM是已经被渲染出来了
        // 但是图片依然是没有加载完(目前获取到的offsetTop不包含图片)
        // offsetTop值不对的时候，都是因为图片的问题

        this.themeTopYs = []

        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);

        console.log(this.themeTopYs)
      })

      */


    },
    mounted() {
      // // 1.v-html内的内容加载完成事件监听
      // const refresh = debounce(this.$refs.scroll.refresh, 500)
      // // 监听v-html中文本加载完成
      // this.$bus.$on('itemWenBenLoad', () => {
      //   refresh()
      // })

      this.getThemeTopY = debounce(() => {
        this.themeTopYs = []

        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop - 46);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 46);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 46);
        this.themeTopYs.push(Number.MAX_VALUE);

        // console.log(this.themeTopYs)
      }, 100)

      // 1.图片加载完成事件监听
      let refresh = debounce(this.$refs.scroll.refresh, 100)
      // 监听item中图片加载完成
      this.itemImgListener = () => {
        refresh()
        this.getThemeTopY()
      }
      this.$bus.$on('itemImageLoad', this.itemImgListener)

      console.log('导航锁定内容')
      console.log(this.themeTopYs)

    },
    destroyed() {
      this.$bus.$off('itemImageLoad', this.itemImgListener)
    },
    methods: {
      ...mapActions(['addCart']),
      titleClick(index) {
        // console.log(index);
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 700)
      },
      contentScroll(position) {
        // 1.获取y值
        const positionY = -position.y

        // 2.positionY和主题中值进行对比
        let length = this.themeTopYs.length;
        for (let i = 0; i < length; i++) {

          // 方法一：普通做法
          // if (this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) ||
          //   (i === length -1 && positionY >= this.themeTopYs[i]))) {
          //   this.currentIndex = i;
          //   console.log(this.currentIndex)
          //   this.$refs.nav.currentIndex = this.currentIndex
          // }

          // 方法二：hack做法
          // 在themeTopYs中加多一个最大值Max_Value
          if (this.currentIndex !== i
            && (i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])
            ) {
            this.currentIndex = i;
            // console.log(this.currentIndex)
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }

        // 3.判断BackTop是否显示
        this.listenShowBackTop(position);
      },
      addToCart() {
        // 1.获取购物车需要展示的信息
        const product = {};
        product.id = this.id;
        product.image = this.imageTop;
        product.title = this.goods.title;
        product.description = this.goods.description;
        product.price = this.goods.price;

        // 2.将商品添加到购物车里(1.Promise 2.mapActions)
        this.addCart(product).then(res => {
          // console.log(res);
          this.$toast.show(res, 1500);
        }, err => console.log(err))

        // this.$store.dispatch('addCart', product).then(res => console.log(res), err => console.log(err))
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
    height: calc(100% - 93px);
    overflow: hidden;
  }

  .detail-goods-list {
    box-shadow: 0 -1px 1px rgba(100, 100, 100, .08);
  }
</style>
