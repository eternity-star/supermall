<template>
  <div id="home">
    <NavBar class="home-nav">
      <div slot="center">购物车</div>
    </NavBar>
    <tab-control :titles="['流行', '新款', '精选']"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 class="tab-control" v-show="isTabFixed"/>
    <Scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <RecommendView :recommends="recommends"/>
      <FeatureView/>
      <tab-control class="tab-control"
                   :titles="['流行', '新款', '精选']"
                   @tabClick="tabClick"
                   ref="tabControl2"/>
      <goods-list :goods="showGoods"/>
    </Scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backTop/BackTop";

  import {getHomeMultidata, getHomeGoods} from "network/home";
  import {getHomeRecommend} from "network/home";
  import {debounce} from "common/utils";
  import {itemListenerMixin} from "common/mixin";

  export default {
    name: "Home",
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    mixins: [itemListenerMixin],
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'recommend': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sales': {page: 0, list: []}
        },
        currentType: 'recommend',
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0,
        itemImgListener: null
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    created() {
      // 1.请求轮播图数据
      this.getHomeMultidata()

      // 2.请求推荐商品数据
      // this.getHomeRecommend()

      // 3.请求商品数据
      this.getHomeGoods('recommend')
      this.getHomeGoods('new')
      this.getHomeGoods('sales')
    },
    mounted() {

      // 2.获取tabControl的offsetTop
      // 所有组件都有一个属性$el：用于获取组件中的元素
      // console.log(this.$refs.tabControl.$el.offsetTop);
    },
    destroyed() {
      console.log('destroyed');
    },
    activated() {
      this.$refs.scroll.scrollTo(0, this.saveY, 0)

      this.$refs.scroll.refresh()
    },
    deactivated() {
      // 1.保存Y值
      this.saveY = this.$refs.scroll.getScrollY()
      console.log(this.saveY);

      // 2.取消全局事件的监听
      this.$bus.$off('itemImageLoad', this.itemImgListener)
    },
    methods: {
      /**
       * 事件监听相关的方法
       */
      tabClick(index) {
        console.log(index);
        switch (index) {
          case 0:
            this.currentType = 'recommend'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sales'
            break
          default:
            this.currentType = 'recommend'
        }
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      backClick() {
        console.log('---');
        this.$refs.scroll.scrollTo(0, 0, 750)
      },
      contentScroll(position) {
        // 1.判断BackTop是否显示
        this.isShowBackTop = (-position.y) > 600

        // 2.决定tabControl是否吸顶(position：fixed)
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      loadMore() {
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },
      /**
       * 网络请求相关的方法
       */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          console.log(res.slides);
          this.banners = res.slides
          this.recommends = res.slides
          // this.recommends = res.data.recommend.list
        })
      },
      // getHomeRecommend() {
      //   getHomeRecommend().then(res => {
      //     this.recommends = res.slides
      //   })
      // },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          // console.log(res.goods.data);
          this.goods[type].list.push(...res.goods.data)
          this.goods[type].page += 1

          // 完成上拉加载更多
          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    /*在使用浏览器原生滚动时，为了不让导航跟随一起滚动*/
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }

  /*.tab-control {*/
  /*  !*黏性定位，可以控制滑倒什么位置就自动设置样式为absolute*!*/
  /*  position: sticky;*/
  /*  top: 44px;*/

  /*  z-index: 9;*/
  /*}*/

  /*方法二*/
  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    right: 0;
    left: 0;
  }

  .fixed {
    position: fixed;
    right: 0;
    left: 0;
    top: 44px;
  }

  /*方法一*/
  /*.content {*/
  /*  height: calc(100% - 93px);*/
  /*  overflow: hidden;*/
  /*  margin-top: 44px;*/
  /*}*/
</style>
