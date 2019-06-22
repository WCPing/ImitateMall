<template>
  <div>
    <div class="search-bar">
      <van-row>
        <van-col span="3">
          <img :src="locationIcon" width="60%" class="location-icon">
        </van-col>
        <van-col span="16">
          <input type="text" class="search-input" placeholder="">
        </van-col>
        <van-col span="5">
          <van-button size="mini" class="search-btn">查找 </van-button>
        </van-col>
      </van-row>
    </div>
    <!--swiper-->
    <div class="swiper-area">
      <van-swipe :autoplay="1000">
        <van-swipe-item v-for="(banner, index) in bannerPicArray" :key="index">
          <img v-lazy="banner.image" width="100%" height="100%">
        </van-swipe-item>
      </van-swipe>
    </div>
    <!--bar-->
    <div class="type-bar">
      <div v-for="(cate, index) in category" :key="index">
        <img v-lazy="cate.image" width="90%">
        <span>{{cate.mallCategoryName}}</span>
      </div>
    </div>
    <!--adBanner area-->
    <div>
      <img v-lazy="adBanner" width="100%">
    </div>
    <!--recommend area-->
    <div class="recommend-area">
      <div class="recommend-title">
        商品推荐
      </div>
      <div class="recommend-body">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item, index) in recommendGoods" :key="index">
            <div class="recommend-item">
              <img :src="item.image" width="80%">
              <div>{{item.goodsName}}</div>
              <div>￥{{item.price | moneyFmt}}(￥{{item.mallPrice | moneyFmt}})</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <!-- <SwiperText></SwiperText> -->
    <floor :floorDate="floor1" :floorTitle="floorName.floor1"></floor>
    <floor :floorDate="floor2" :floorTitle="floorName.floor2"></floor>
    <floor :floorDate="floor3" :floorTitle="floorName.floor3"></floor>
    <!--hot area-->
    <div class="hot-area">
      <div class="hot-title">热卖商品</div>
      <div class="hot-goods">
        <!--list组件-->
        <van-list>
          <van-row gutter="20">
            <van-col span="12" v-for="(item, index) in hotGoods" :key="index">
              <goods-info :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price" :goodsId="item.goodsId"></goods-info>
            </van-col>
          </van-row>
        </van-list>
      </div>
    </div>
    
  </div>
</template>

<script>
    import axios from 'axios'
    import 'swiper/dist/css/swiper.css'
    import { swiper, swiperSlide } from "vue-awesome-swiper"
    import SwiperText from '../swiper/SwiperText.vue'
    import floor from '../floor/floor.vue'
    import { toMoney } from '@/filter/filter.js'
    import goodsInfo from '@/components/component/goodsInfo.vue'
    import url from '@/apiConfig.js'

    export default {
      name: "shopping-mail",
      data() {
        return {
          swiperOption: {
            slidesPerView: 3
          },
          msg: 'shopping mail',
          locationIcon: require('../../assets/images/location.png'),
          /*bannerPicArray: [
            {imageUrl: 'https://desk-fd.zol-img.com.cn/t_s960x600c5/g5/M00/0C/08/ChMkJlwjWC2IL_xNABSi2nGf5toAAuAJwBcvSoAFKLy959.jpg'},
            {imageUrl: 'https://desk-fd.zol-img.com.cn/t_s960x600c5/g5/M00/0C/08/ChMkJlwjWDOIIfWpAAmOsbbwM1QAAuAJwDu2cIACY7J481.jpg'},
            {imageUrl: 'https://desk-fd.zol-img.com.cn/t_s960x600c5/g5/M00/0C/08/ChMkJlwjWDKICkNCAB68Z3FeR_AAAuAJwC4SK0AHrx_359.jpg'}
          ],*/
          bannerPicArray: [],
          category: [],
          adBanner: '',
          recommendGoods: [],
          floor1: [],
          floor2: [],
          floor3: [],
          floorName: {},
          hotGoods: [], // 热卖桑品
        }
      },
      components: {
        swiper,
        swiperSlide,
        SwiperText,
        floor,
        goodsInfo
      },
      filters: {
        moneyFmt(money) {
          return toMoney(money)
        }
      },
      created() {
        axios({
          url: url.getShoppingMailInfo,
          // url: 'http://192.168.2.127:8080/index',
          method: 'get',
        }).then(response => {url
          console.log(response)
           if (response.status === 200) {
             this.category = response.data.data.category
             this.adBanner = response.data.data.advertesPicture.PICTURE_ADDRESS
             this.bannerPicArray = response.data.data.slides
             this.recommendGoods = response.data.data.recommend
             this.floor1 = response.data.data.floor1
             this.floor2 = response.data.data.floor2
             this.floor3 = response.data.data.floor3
             this.floorName = response.data.data.floorName
             this.hotGoods = response.data.data.hotGoods
          }
        }).catch(error => {
          console.log(error)
        })
      }
    }
</script>

<style lang="scss" scoped>
.search-bar{
  height: 2.2rem;
  background-color: #e5017d;
  line-height: 2.2rem;
  overflow: hidden;
  .location-icon{
    text-align: center;
    vertical-align: middle;
  }
  .search-input{
    width: 100%;
    height: 1.3rem;
    border: none;
    border-bottom: 1px solid #ffffff !important;
    background-color: #e5017d;
    color: #ffffff;
  }
  .search-btn{
    margin-left: 1rem;
  }
}
  .swiper-area{
     clear: both;
     overflow: hidden;
   }

  .type-bar{
    background-color: #ffffff;
    margin: 0 0.3rem 0.3rem 0.3rem;
    border-radius: 0.3rem;
    font-size: 14px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    img {
      width: 60px;
    }
    div{
      font-size: 12px;
      text-align: center ;
    }
  }
  .recommend-area{
    background-color: #ffffff;
    margin-top: 0.3rem;
    .recommend-title {
      border-bottom: 1px solid #eee;
      font-size: 14px;
      padding: 0.2rem;
      color: #e5017d;
    }
    .recommend-body{
      border-bottom: 1px solid #eee;
      .recommend-item{
        width: 99%;
        border-right: 1px solid #eee;
        font-size: 12px;
        text-align: center;
      }
    }
  }
  .hot-area {
    text-align: center;
    font-size: 14px;
    height: 1.8rem;
    line-height: 1.8rem;
    .hot-goods {
      height: 130rem;
      overflow: hidden;
      background: #ffffff;
    }
  }
</style>
