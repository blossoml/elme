<template>
    <div>
        <section v-if="!showLoading" class="shop_container">
            <nav class="goback" @click="goback">
                <svg width="2.2rem" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
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
            <!--商家活动信息详情--><!--淡入淡出效果-->
            <transition name="fade">  
                <section class="activities_details" v-if="showActivities">
                      <h2 class="activities_shoptitle">{{shopDetailData.name}}</h2>                      
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
                </section>                
            </transition>     
            <!--切换导航条-->        
            <section class="change_show_type"  ref="chooseType">
                <div>
                <span :class='{activity_show: changeShowType =="food"}'  @click="changeShowType='food'">商品</span>
                </div>
                <div>
                 <span :class='{activity_show: changeShowType =="rating"}' @click="changeShowType='rating'">评价</span>
                </div>
            </section> 
            <!--商品页面                                   -->
           <transition name="fade-choose" mode="out-in">
           <section v-show="changeShowType=='food'" class="food_container">
                <section class="menu_container">
                    <section class="menu_left" id="wrapper_menu" ref="wrapperMenu">
                        <ul>
                            <li v-for="(item,index) in menuList" :key="index"  class="menu_left_li" :class="{activity_menu: index == menuIndex}">
                            <img :src="getImgPath(item.icon_url)" v-if="item.icon_url">
                            <span>{{item.name}}</span>
                            <span class="category_num" v-if="categoryNum[index]&&item.type==1">{{categoryNum[index]}}</span>
                            </li>
                        </ul>
                    </section>
                    <!--全部的商品列表-->
                    <section class="menu_right" ref="menuFoodList">
                    <ul>
                    <li v-for="(item,index) in menuList" :key="index">
                        <header class="menu_detail_header">
                            <section class="menu_detail_header_left">
                                <strong class="menu_item_title">{{item.name}}</strong>
                                    <span class="menu_item_description">{{item.description}}</span>
                            </section>
                            <span class="menu_detail_header_right" @click="showTitleDetail(index)"></span>                         
                        </header>
                        <section v-for="(foods,foodindex) in item.foods" :key="foodindex" class="menu_detail_list">
                        <router-link :to="{path: 'shop/foodDetail', query:{image_path:foods.image_path, description: foods.description, month_sales: foods.month_sales, name: foods.name, rating: foods.rating, rating_count: foods.rating_count, satisfy_rate: foods.satisfy_rate, foods, shopId}}" tag="div" class="menu_detail_link">
                                <section class="menu_food_img">
                                                    <img :src="imgBaseUrl + foods.image_path">
                                </section>
                                <section class="menu_food_description">
                                    <h3>
                                        <strong class="description_foodname">{{foods.name}}</strong>
                                                <ul v-if="foods.attributes.length" class="attributes_ul">
                                                    <li v-if="attribute" v-for="(attribute, foodindex) in foods.attributes" :key="foodindex" :style="{color: '#' + attribute.icon_color,borderColor:'#' + attribute.icon_color}" :class="{attribute_new: attribute.icon_name == '新'}">
                                                        <p :style="{color: attribute.icon_name == '新'? '#fff' : '#' + attribute.icon_color}">{{attribute.icon_name == '新'? '新品':attribute.icon_name}}</p>
                                                    </li>
                                                </ul>                                    
                                    </h3>                            
                                    <p class="food_description_content">{{foods.description}}</p>
                                    <p class="food_description_sale_rating">
                                                        <span>月售{{foods.month_sales}}份</span>
                                                        <span>好评率{{foods.satisfy_rate}}%</span>
                                    </p>
                                    <p v-if="foods.activity" class="food_activity">
                                    <span :style="{color: '#' + foods.activity.image_text_color,borderColor:'#' +foods.activity.icon_color}">{{foods.activity.image_text}}</span>
                                </p>
                                </section>
                        </router-link>    
                        <footer class="menu_detail_footer">
                                                <section class="food_price">
                                                    <span>¥</span>
                                                    <span>{{foods.specfoods[0].price}}</span>
                                                    <span v-if="foods.specifications.length">起</span>
                                                </section>  
                            <!--加减组件-->    
                            <buy-cart :shopId='shopId' 
                            :foods='foods' @moveInCart="listenInCart"                       
                            ></buy-cart> 
                        </footer>     
                      </section>
                    </li>
                    </ul>
                    </section>               
                </section>
                <!--购物车模块-->
                <section class="buy_cart_container">
                    <section @click="toggleCartList" class="cart_icon_num">
                        <div class="cart_icon_container" :class="{cart_icon_activity: totalPrice > 0, move_in_cart:receiveInCart}" ref="cartContainer">
                            <span v-if="totalNum" class="cart_list_length">
                                        {{totalNum}}
                            </span>  
                            <svg class="cart_icon">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-icon"></use>
                            </svg>
                        </div>
                        <div class="cart_num">
                            <div>¥ {{totalPrice}}</div>
                            <div>配送费¥{{deliveryFee}}</div>
                        </div>
                        <!--购物车前往付款-->
                        <section class="gotopay" :class="{gotopay_acitvity: minimumOrderAmount <= 0}">
                            <span class="gotopay_button_style" v-if="minimumOrderAmount > 0">还差¥{{minimumOrderAmount}}起送</span>
                            <router-link :to="{
                                path:'/confirmOrder',query:{geohash,shopId}
                            }"  class="gotopay_button_style" v-else >去结算
                            </router-link>
                        </section>
                    </section>
                    </section>
                    <!--购物车详细，需要过渡-->
                    <transition name="toggle-cart">
                        <section class="cart_food_list" v-show="showCartList&&cartFoodList.length"  >
                            <header>
                            <h4>购物车</h4>
                            <div @click="clearCart">
                                <svg>
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-remove"></use>
                                </svg>
                                <span class="clear_cart">清空</span>
                            </div>
                            </header>
                            <section class="cart_food_details" id="cartFood">
                                <ul>
                                    <li v-for="(item,index) in cartFoodList" :key="index" 
                                    class="cart_food_li"
                                    >
                                    <div class="cart_list_num">
                                        <p class="ellipsis">{{item.name}}</p>
                                        <p class="ellipsis">{{item.specs}}</p>
                                    </div>
                                    <div  class="cart_list_price">
                                        <span>¥</span>
                                        <span>{{item.price}}</span>
                                    </div>
                                    <section  class="cart_list_control">
                                    <span 
                                    @click="removeOutCart(item.category_id, item.item_id, item.food_id, item.name, item.price, item.specs)">
                                        <svg>
                                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-minus"></use>
                                        </svg>
                                    </span>
                                        <span class="cart_num">{{item.num}}</span>
                                        <svg class="cart_add" @click="addToCart(item.category_id, item.item_id, item.food_id, item.name, item.price, item.specs)">
                                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-add"></use>
                                    </svg>
                                    </section>
                                    </li>
                                </ul>
                            </section>      
                        </section>
                    </transition>
                    <transition name="fade">
                        <!--当购物车详细展示出来的时候。遮罩层也展示出来-->
                            <div class="screen_cover" v-show="showCartList&&cartFoodList.length" @click="toggleCartList"></div>
                    </transition>
                </section>    
           </transition>
           <!--商品评价页面                                -->
            <transition name="fade-choose" mode="out-in">
                <section class="rating_container" id="ratingContainer" v-show="changeShowType =='rating'">
                    <section  type="2">
                        <section>

                            <header class="rating_header">
                                <section class="rating_header_left">
                                    <p>{{shopDetailData.rating}}</p>
                                    <p>综合评价</p>
                                    <p>高于周边商家{{(ratingScoresData.compare_rating*100).toFixed(1)}}%</p>
                                </section>
                                <section class="rating_header_right">
                                    <p>
                                        <span>服务态度</span>                                     
                                        <span class="rating_num">{{ratingScoresData.service_score.toFixed(1)}}</span>
                                    </p>
                                    <p>
                                        <span>菜品评价</span>                                       
                                        <span class="rating_num">{{ratingScoresData.food_score.toFixed(1)}}</span>
                                    </p>
                                    <p>
                                        <span>送达时间</span>
                                        <span class="delivery_time">{{shopDetailData.order_lead_time}}分钟</span>
                                    </p>
                                </section>
                            </header>
                            <ul class="tag_list_ul">
                                <li v-for="(item, index) in ratingTagsList" :key="index" :class="{unsatisfied: item.unsatisfied, tagActivity: ratingTageIndex == index}" @click="changeTgeIndex(index, item.name)">{{item.name}}({{item.count}})</li>
                            </ul>
                            <ul class="rating_list_ul">
                                <li v-for="(item, index) in ratingList" :key="index" class="rating_list_li">
                                    <img :src="getImgPath(item.avatar)" class="user_avatar">
                                    <section class="rating_list_details">
                                        <header>
                                            <section class="username_star">
                                                <p class="username">{{item.username}}</p>
                                                <p class="star_desc">                                                 
                                                    <span class="time_spent_desc">{{item.time_spent_desc}}</span>
                                                </p>
                                            </section>
                                            <time class="rated_at">{{item.rated_at}}</time>
                                        </header>
                                        <ul class="food_img_ul">
                                            <li v-for="(item, index) in item.item_ratings" :key="index">
                                                <img :src="getImgPath(item.image_hash)" v-if="item.image_hash">
                                            </li>
                                        </ul>
                                        <ul class="food_name_ul">
                                            <li v-for="(item, index) in item.item_ratings" :key="index" class="ellipsis">
                                                {{item.food_name}}
                                            </li>
                                        </ul>
                                    </section>
                                </li>
                            </ul>
                        </section>
                    </section>
                </section>
            </transition>
         </section>
         <loading v-show="showLoading || loadRatings"></loading>
         <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
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
import buyCart from "@/commonCon/buyCart";
import { getImgPath } from "@/common/mixin.js";
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
  mixins:[
     getImgPath
  ],
  components:{
         loading,          
         buyCart,
         shopDetails,
  },
  computed:{
       //计算属性。。。。。。。。。
      ...mapState(['latitude','longitude','cartList']),
       promotionInfo: function (){
                return this.shopDetailData.promotion_info || '欢迎光临，用餐高峰期请提前下单，谢谢。'
       },
       //配送费
       deliveryFee:function () {
                if (this.shopDetailData) {
                    return this.shopDetailData.float_delivery_fee;
                }else{
                    return null;
                }
        },
        //还差多少元起送，为负数时候显示结算按钮
        minimumOrderAmount:function(){
          if(this.shopDetailData)
          {
            return this.shopDetailData.float_minimum_order_amount - this.totalPrice;
          }else
          {
              return null;
          }
        },
        //当前商店id的购物车信息
        shopCart:function(){
            return {...this.cartList[this.shopId]}            
        }, 
        //购物车总共商品的数量
        totalNum:function(){
            let num=0;
            this.cartFoodList.forEach(item=>{
                num+=item.num;
            })
            return num;
        }             
 },
  created() {
    this.geohash = this.$route.query.geohash;
    this.shopId = this.$route.query.id;
    this.INIT_BUYCART();
  },
  mounted(){
      this.initData();//挂载完成后初始化数据
      this.windowHeight = window.innerHeight;//设置window高度
  }, 
  methods:{
      ...mapMutations([
          'RECORD_ADDRESS','ADD_CART','REDUCE_CART','INIT_BUYCART','CLEAR_CART','RECORD_SHOPDETAIL'
      ]),
      //控制活动详情页的隐藏和显示
      showActivitiesFun() {
       this.showActivities = !this.showActivities;
      },
      //隐藏加载动画
      hideLoading(){
          this.showLoading=false;
      },
     //获取食品分类列表的高度，存入shopListTop数组中
     getFoodListHeight(){
         const listContainer = this.$refs.menuFoodList;//右侧食品列表dom
         if(listContainer){
           //Array.from方法用于将两类对象转为真正的数组：
           //类似数组的对象（array-like object）和可遍历（iterable）的对象
           const listArr= Array.from(listContainer.children[0].children);
           listArr.forEach((item,index)=>{
               this.shopListTop[index]=item.offsetTop;               
           })
         }        
     },
     //初始化的时候获取基本数据
      async initData(){
      if(!this.latitude){
          //获取位置信息
          let res=await msiteAddress(this.geohash);
          //记录当前经纬度
          this.RECORD_ADDRESS(res);
      }      
      //获取商铺信息
      this.shopDetailData=await shopDetails(this.shopId, this.latitude, this.longitude);
      //获取食品列表
      this.menuList=await foodMenu(this.shopId);
      //评论列表
      this.ratingList=await getRatingList(this.shopId, this.ratingOffset);
      //商铺评价分数详情
      this.ratingScoresData= await ratingScores(this.shopId); 
      //评论tag列表
      this.ratingTagsList=await ratingTags(this.shopId);
      this.RECORD_SHOPDETAIL(this.shopDetailData);
       //隐藏加载动画
      this.hideLoading();
     },
     /* * 初始化和shopCart变化时，
             * 重新获取购物车改变过的数据，
             * 赋值 categoryNum，totalPrice，cartFoodList，
             * 整个数据流是自上而下的形式，所有的购物车数据都交给vuex统一管理，
             * 包括购物车组件中自身的商品数量，使整个数据流更加清晰
    */
     initCategoryNum(){   
         let newArr=[];
         let cartFoodNum=0;        
         this.totalPrice=0;
         this.cartFoodList=[]; 
         /**
          * shopCart的结构
          * 目录id=>可能存在多个
          * 商品id=>包含在目录id下
          * 食品规格id=>包含在商品id里面
          * menuList结构 json数组
          * 目录id 
          * foods属性，包含所有该目录下的商品信息.对象数组 
          */
         this.menuList.forEach((item,index)=>{
            if(this.shopCart&&this.shopCart[item.foods[0].category_id]){
                //如果缓存中存在购物车信息，且购物车当前目录下信息存在
               let num=0;
               //遍历目录下的商品id
               Object.keys(this.shopCart[item.foods[0].category_id]).forEach(itemid=>{
                    Object.keys(this.shopCart[item.foods[0].category_id][itemid]).forEach(foodid => {
                        //商品规格id                      
                         let foodItem = this.shopCart[item.foods[0].category_id][itemid][foodid];
                         num+=foodItem.num;
                         if(item.type==1)
                         {    this.totalPrice += foodItem.num*foodItem.price;
                              console.log(foodItem.num*foodItem.price)
                               if (foodItem.num > 0) {
                                        this.cartFoodList[cartFoodNum] = {};
                                        this.cartFoodList[cartFoodNum].category_id = item.foods[0].category_id;
                                        this.cartFoodList[cartFoodNum].item_id = itemid;
                                        this.cartFoodList[cartFoodNum].food_id = foodid;
                                        this.cartFoodList[cartFoodNum].num = foodItem.num;
                                        this.cartFoodList[cartFoodNum].price = foodItem.price;
                                        this.cartFoodList[cartFoodNum].name = foodItem.name;
                                        this.cartFoodList[cartFoodNum].specs = foodItem.specs;
                                        cartFoodNum ++;
                               }
                         }
                    })
               }) 
              newArr[index] = num;           
            }  else{
                newArr[index]=0;
            }  
          })
          this.totalPrice = this.totalPrice.toFixed(2);
          this.categoryNum=[...newArr];             
     },
     //控制购物列表是否显示
     toggleCartList(){
           this.cartFoodList.length ? this.showCartList = !this.showCartList : true;     
           //如果length大于0，则改变购物车伸缩状态。否则不作改变       
     },     
     //清除购物车
     clearCart(){
         this.toggleCartList();
         this.CLEAR_CART(this.shopId);
     },
     //监听原点进入购物车
      listenInCart(){       

      },
      goback(){
                this.$router.go(-1);
      },
     //加入购物车，所需7个参数，商铺id，食品分类id，食品id，食品规格id，食品名字，食品价格，食品规格
      addToCart(category_id, item_id, food_id, name, price, specs){
        this.ADD_CART({shopid: this.shopId, category_id, item_id, food_id, name, price, specs});
      },
    //移出购物车，所需7个参数，商铺id，食品分类id，食品id，食品规格id，食品名字，食品价格，食品规格
      removeOutCart(category_id, item_id, food_id, name, price, specs){
        this.REDUCE_CART({shopid: this.shopId, category_id, item_id, food_id, name, price, specs});
      },
    },
    watch:{
        shopCart: function (value){
                this.initCategoryNum();
        },          
		showLoading: function(value){	
            console.log(value);	
			if(!value){
            //nextTick：下次dom更新循环结束后执行延迟回调，在修改数据之后立即使用这个方法，
            //获取更新后的dom
            //数据加载完成后，获取高度并且初始化购物车
			 this.$nextTick(()=>{
                this.getFoodListHeight();
                this.initCategoryNum();                
			 })
            }
        }     
      }   
    }

</script>

<style lang="scss" scoped>
@import "./shop.scss";
</style>
