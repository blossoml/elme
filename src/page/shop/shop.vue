<template>
    <div>
        <section v-if="!showLoading" class="shop_container">
            <nav class="goback" @click="goback">
                <svg width="4rem/$fensu" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:3"/>
                </svg>
            </nav>
            <header class="shop_detail_header" ref="shopheader"  :style="{zIndex:showActivities ?'14':'10'}">
               <section class="description_header" >
                   <!--跳转到商铺详情页面-->
                   <router-link to="/shop/shopDetail" class="description_top">
                    <section class="description_left">
                        <img :src="imgBaseUrl+shopDetailData.image_path">                       
                    </section>
                    <section class="description_right">
                        <h4 class="description_title ellipsis">{{shopDetailData.name}}</h4>
                        <p class="description_text">商家配送／{{shopDetailData.order_lead_time}}分钟送达／配送费¥{{shopDetailData.float_delivery_fee}}</p>
                        <p class="description_promotion ellipsis">公告：{{promotionInfo}}</p>
                    </section>
                  </router-link> 
                  <!--底部活动信息栏-->
                  <footer class="description_footer" v-if="shopDetailData.activities.length"  @click="showActivitiesFun">
                    <p class="ellipsis">
                        <span class="tip_icon" :style="{backgroundColor: '#' + shopDetailData.activities[0].icon_color, borderColor: '#' + shopDetailData.activities[0].icon_color}">
                         {{shopDetailData.activities[0].icon_name}}</span>
                        <span>{{shopDetailData.activities[0].description}}（APP专享）</span>                         
                    </p>
                    <p>{{shopDetailData.activities.length}}个活动</p>
                    <svg class="footer_arrow">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-left"></use>
                    </svg>
                  </footer>          
                 </section>
            </header>  
            <!--头部信息栏目-->
            <transition name="fade">
                <section class="activities_details" v-if="showActivities">
                      <h2 class="activities_shoptitle">{{shopDetailData.name}}</h2>                      
                </section>
                <section  class="activities_list">
                       <header class="activities_title_style"><span>优惠信息</span></header>
                       <ul>
                           <li v-for="item in shopDetailData.activities" :key=item.id>
                                <span class="activities_icon" :style="{backgroundColor: '#' + item.icon_color, borderColor: '#' + item.icon_color}">{{item.icon_name}}</span>
                                 <span>{{item.description}}（APP专享）</span> 
                           </li>
                       </ul>
                </section>
                 <section class="activities_shopinfo">
                        <header class="activities_title_style"><span>商家公告</span></header>
                        <p>{{promotionInfo}}</p>
                    </section>
                    <svg width="60" height="60" class="close_activities" @click.stop="showActivitiesFun">
                        <circle cx="30" cy="30" r="25" stroke="#555" stroke-width="1" fill="none"/>
                        <line x1="22" y1="38" x2="38" y2="22" style="stroke:#999;stroke-width:2"/>
                        <line x1="22" y1="22" x2="38" y2="38" style="stroke:#999;stroke-width:2"/>
                    </svg>                    
            </transition>     
            <!--切换导航条-->        
            <section class="change_show_type"  ref="chooseType">
                <div>
                <span :class='{activity_show: changeShowType =="food"}'  @click="changeShowType='food'"></span>
                </div>
                <div>
                 <span :class='{activity_show: changeShowType =="rating"}' @click="changeShowType='rating'"></span>
                </div>
            </section> 
           <transition name="fade-chodse">
               
           </transition>
          </section>
    </div>
</template>
<script>
import { mapMutations, mapState } from "vuex"; //获取状态信息，以及更改状态信息
import { mscroll, cssTransform } from "@/common/localStorage";
import {
  msiteAddress,
  shopDetails,
  foodMenu,
  getRatingList,
  ratingScores,
  ratingTags
} from "@/service/getData";
import loading from "@/commonCon/loading";
import shopList from "@/commonCon/shoplist";
import { getImgPath } from "@/common/mixin";
export default {
  data() {
    return {
      geohash: "", //geohash位置信息
      shopId: null, //商店id值
      showLoading: true, //显示加载动画
      changeShowType: "food", //切换显示商品或者评价
      shopDetailData: null, //商铺详情
      showActivities: false, //是否显示活动详情
      menuList: [], //食品列表
      menuIndex: 0, //已选菜单索引值，默认为0
      menuIndexChange: true, //解决选中index时，scroll监听事件重复判断设置index的bug
      shopListTop: [], //商品列表的高度集合
      TitleDetailIndex: null, //点击展示列表头部详情
      categoryNum: [], //商品类型右上角已加入购物车的数量
      totalPrice: 0, //总共价格
      cartFoodList: [], //购物车商品列表
      showCartList: false, //显示购物车列表
      receiveInCart: false, //购物车组件下落的圆点是否到达目标位置
      ratingList: null, //评价列表
      ratingOffset: 0, //评价获取数据offset值
      ratingScoresData: null, //评价总体分数
      ratingTagsList: null, //评价分类列表
      ratingTageIndex: 0, //评价分类索引
      preventRepeatRequest: false, // 防止多次触发数据请求
      ratingTagName: "", //评论的类型
      loadRatings: false, //加载更多评论是显示加载组件
      foodScroll: null, //食品列表scroll
      showSpecs: false, //控制显示食品规格
      specsIndex: 0, //当前选中的规格索引值
      choosedFoods: null, //当前选中视频数据
      showDeleteTip: false, //多规格商品点击减按钮，弹出提示框
      showMoveDot: [], //控制下落的小圆点显示隐藏
      windowHeight: null, //屏幕的高度
      elLeft: 0, //当前点击加按钮在网页中的绝对top值
      elBottom: 0, //当前点击加按钮在网页中的绝对left值
      ratingScroll: null, //评论页Scroll
      imgBaseUrl: "//elm.cangdu.org/img/"
    };
  },
  created() {
    this.geohash = this.$route.query.geohash;
    this.shopId = this.$route.query.id;
    //this.INIT_BUYCART();
  },
  methods:{
      showActivitiesFun() {
       this.showActivities = !this.showActivities;
      }
  }
};
</script>

<style lang="scss" scoped>
@import "./shop.scss";
</style>
