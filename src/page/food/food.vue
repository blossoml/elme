<template>
      <div class="food_container">
         <head-top :head-title="headTitle" goBack="true"></head-top>
         <!--分类-->
         <section class="sort_container">
             <div class="sort_item" :class="{choose_type:sortBy=='food'}">
                <div class="sort_item_container" @click="chooseType('food')">
                    <!--头部分类行-->
                  <div class="sort_item_border">
                    <span :class="{category_title: sortBy == 'food'}">{{foodTitle}}</span>
                    <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
                      <polygon points="0,3 10,3 5,8"/>
                    </svg>
                  </div>
                </div>
               <transition name="showlist" v-show="category">
                	<section v-show="sortBy == 'food'" class="category_container sort_detail_type">
                		<section class="category_left">
                            <ul>
                                <li v-for="(item,index) in category" :key="index" 
                                class="category_left_li" :class="{category_active:restaurant_category_id == item.id}"
                                @click="selectCategoryName(item.id, index)"><!--点击事件传递id和index-->                                
                                <section>
                                 <img :src="getImgPath(item.image_url)" v-if="index"  class="category_icon"><!--icon-->
                                 <span>{{item.name}}</span>
                                </section>
                                <section>
                                    <span class="category_count">{{item.count}}</span><!--num-->
            	                     <svg v-if="index" width="8" height="8" xmlns="http://www.w3.org/2000/svg" version="1.1" class="category_arrow" >
							    			<path d="M0 0 L6 4 L0 8"  stroke="#bbb" stroke-width="1" fill="none"/>
							    	</svg>   <!--arrow-->                                 
                                </section>                                                                 
                                </li>                               
                            </ul>  
                        </section>
                        <section class="category_right">
                              <ul>
                                  <li v-for="(item,index) in categoryDetail" v-if="index" 
                                  :key="index" class="category_right_li" @click="getCategoryIds(item.id, item.name)" 
                                  :class="{category_right_choosed: restaurant_category_ids == item.id || (!restaurant_category_ids)&&index == 0}"
                                  >
                                   <span> {{item.name}}</span>
                                    <span>{{item.count}} </span>
                                  </li>
                              </ul>
                        </section>
                    </section>
               </transition>
             </div>
         <!--排序-->
         <div class="sort_item" :class="{choose_type:sortBy == 'sort'}">
            <div class="sort_item_container" @click="chooseType('sort')">
    				<div class="sort_item_border">
		    			<span :class="{category_title: sortBy == 'sort'}">排序</span>
		    			<svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
			    			<polygon points="0,3 10,3 5,8"/>
			    		</svg>
    				</div>
    			</div>
              	<transition name="showlist">
	    			<section v-show="sortBy == 'sort'" class="sort_detail_type">
	    				<ul class="sort_list_container" @click="sortList($event)">
	    					<li class="sort_list_li">
	    						<svg>
									<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#default"></use>
								</svg>
	    						<p data="0" :class="{sort_select: sortByType == 0}">
	    							<span>智能排序</span>
	    							<svg v-if="sortByType == 0">
										<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
									</svg>
	    						</p>
	    					</li>
	    					<li class="sort_list_li">
	    						<svg>
									<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#distance"></use>
								</svg>
	    						<p data="5" :class="{sort_select: sortByType == 5}">
	    							<span>距离最近</span>
	    							<svg v-if="sortByType == 5">
										<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
									</svg>
	    						</p>
	    					</li>
	    					<li class="sort_list_li">
	    						<svg>
									<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#hot"></use>
								</svg>
	    						<p data="6" :class="{sort_select: sortByType == 6}">
	    							<span>销量最高</span>
	    							<svg v-if="sortByType == 6">
										<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
									</svg>
	    						</p>
	    					</li>
	    					<li class="sort_list_li">
	    						<svg>
									<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#price"></use>
								</svg>
	    						<p data="1" :class="{sort_select: sortByType == 1}">
	    							<span>起送价最低</span>
	    							<svg v-if="sortByType == 1">
										<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
									</svg>
								</p>
	    					</li>
	    					<li class="sort_list_li">
	    						<svg>
									<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#speed"></use>
								</svg>
	    						<p data="2" :class="{sort_select: sortByType == 2}">
	    							<span>配送速度最快</span>
	    							<svg v-if="sortByType == 2">
										<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
									</svg>
	    						</p>
	    					</li>
	    					<li class="sort_list_li">
	    						<svg>
									<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#rating"></use>
								</svg>
	    						<p data="3" :class="{sort_select: sortByType == 3}">
	    							<span>评分最高</span>
	    							<svg v-if="sortByType == 3">
										<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
									</svg>
	    						</p>
	    					</li>
	    				</ul>
	    			</section>
	    		</transition>  
         </div>
         </section>
        <transition name="showcover">
    		<div class="back_cover" v-show="sortBy"></div>
    	</transition>      
       <section class="shop_list_container">
	    	<shop-list :geohash="geohash" :restaurantCategoryId="restaurant_category_id" :restaurantCategoryIds="restaurant_category_ids" :sortByType='sortByType' :deliveryMode="delivery_mode" :confirmSelect="confirmStatus" :supportIds="support_ids" v-if="latitude"></shop-list>
    	</section>  
      </div> 
</template>
<script>
import {} from "vuex";
import {mapMutations, mapState} from 'vuex'  //获取状态信息，以及更改状态信息
import headTop from '@/commonCon/head'
import footGuide from '@/commonCon/footGuide'
import shopList from '@/commonCon/shoplist'
import { getImgPath } from '@/common/mixin'
import {
  msiteAddress,
  foodCategory,
  foodDelivery,
  foodActivity
}  from '@/service/getData'

export default {
    data(){
        return {
            geohash:"",
            headTitle:"",//头部标题
            foodTitle:"",//排序左侧头部标题
            restaurant_category_id: "", // 食品类型id值
            restaurant_category_ids: "", //筛选类型的id
            sortBy:"",// 筛选的条件
            category:null,//category分类左侧数据
            categoryDetail:null,// category分类右侧的详细数据
            sortByType:null,//根据何种方式排序
            Delivery:null,//配送方式数据
            Activity:null,//商家支持活动数据            
            delivery_mode: null, // 选中的配送方式
            support_ids:[],//选中商铺活动列表
            filterNum:0,//所选中的所有样式的集合
            confirmStatus:false//确认选择        
        }
    },
    created(){
        this.initData();
    },
    mixins: [getImgPath],
    components:{
      headTop,
      shopList
    },
    computed:{
      ...mapState(["latitude", "longitude"])
    },
    methods:{
    ...mapMutations(["RECORD_ADDRESS"]),
    //初始化数据
    async initData(){
    //获取从页面传递过来的参数    
      this.geohash=this.$route.query.geohash;
      this.headTitle=this.$route.query.title;
      this.foodTitle=this.headTitle;
      this.restaurant_category_id=this.$route.query.restaurant_category_id;
        //获取位置信息
        if(!this.latitude)  {   
        let res= await msiteAddress(this.geohash);
        //记录当前精度维度记录进vuex
          this.RECORD_ADDRESS(res);
        }
        //获取目录分类左侧的数据
         this.category=await foodCategory(this.latitude,this.longitude);
         //初始化当前category分类左侧默认选择项，在右侧展示出其sub_categories列表
         this.category.forEach(item=>{
           if(this.restaurant_category_id==item.id)
           {
             this.categoryDetail=item.sub_categories;
           }
         })
         //获取筛选列表的配送方式
          this.Delivery = await foodDelivery(this.latitude, this.longitude);
          //获取suports-ids状态
          this.Activity = await foodActivity(this.latitude, this.longitude);
          //记录商铺活动的id,默认不选中,点击状态取反，status为true时为选中状态
          this.Activity.forEach((intem,index)=>{
            this.support_ids[index]={ status: false, id: item.id };
          });
      },
      //点击顶部三个选项，展示不同的列表，选中当前选项进行展示，同时收回其他选项
      async chooseType(type){
        if(this.sortBy!=type){      
          this.sortBy=type;          
          if(type=="food"){
            this.foodTitle="分类"
          }else{
              //将foodTitle 和 headTitle 进行同步
              this.foodTitle=this.headTitle;
          }
        } else{
                //再次点击相同选项时收回列表
         this.sortBy = "";
         if (type == "food") {
          //将foodTitle 和 headTitle 进行同步
          this.foodTitle = this.headTitle;
         }
        }              
      },
      //选中Category左侧列表的某个选项时，右侧渲染相应的sub_categories列表
       selectCategoryName(id, index) {
      //第一个选项 -- 全部商家 因为没有自己的列表，所以点击则默认获取选所有数据
         if(index===0)
         {
             this.restaurant_category_ids = null;//改变分类ids
             this.sortBy = "";//sortby为空            
         }else
         {
            //展示右侧
            this.restaurant_category_id = id;
            this.categoryDetail =this.category[index].sub_categories;
         }
       },
       //选中右侧列表选项时候，进行筛选，重新获取数据并渲染
        getCategoryIds(id, name) {
            this.restaurant_category_ids = id;
            this.sortBy="";
            this.foodTitle = this.headTitle = name;
        },
        //点击某个排序方式，获取事件对象的data值，并根据获取的值重新渲染
        sortList(event){
           let node;
         // 如果点击的是 span 中的文字，则需要获取到 span 的父标签 p
           if(event.target.nodeName.toUpperCase() !== "P") {
             node=event.target.parentNode;
           }else{
              node=event.target;
           }
           console.log(node.getAttribute("data"));
           this.sortByType = node.getAttribute("data");           
           this.sortBy="";
        },
        //筛选配送


       
    }
}
</script>

<style lang="scss" scoped>
 $fensu: 1.6;  
 @import '../../common/mixin';
.food_container {
  padding-top: 3.6rem/$fensu;
}
.sort_container {
  background-color: #fff;
  border-bottom: 0.025rem/$fensu solid #f1f1f1;
  position: fixed;
  top: 1.95rem/$fensu;
  right: 0;
  width: 100%;
  display: flex;
  z-index: 13;
  box-sizing: border-box;
  .sort_item {
    @include sc(0.55rem/$fensu, #444);
    @include wh(33.3%, 1.6rem/$fensu);
    text-align: center;
    line-height: 1rem/$fensu;
    .sort_item_container {
      @include wh(100%, 100%);
      position: relative;
      z-index: 14;
      background-color: #fff;
      box-sizing: border-box;
      padding-top: 0.3rem/$fensu;
      .sort_item_border {
        height: 1rem/$fensu;
        border-right: 0.025rem/$fensu solid $bc;
      }
    }
    .sort_icon {
      vertical-align: middle;
      transition: all 0.3s;
      fill: #666;
    }
  }
  .choose_type {
    .sort_item_container {
      .category_title {
        color: $blue;
      }
      .sort_icon {
        transform: rotate(180deg);
        fill: $blue;
      }
    }
  }
  .showlist-enter-active,
  .showlist-leave-active {
    transition: all 0.3s;
    transform: translateY(0);
  }
  .showlist-enter,
  .showlist-leave-to {
    opacity: 0;
    transform: translateY(-100%); 
  }
  .sort_detail_type {
    width: 100%;
    position: absolute;
    display: flex;
    top: 1.6rem/$fensu;
    left: 0;
    border-top: 0.025rem/$fensu solid $bc;
    background-color: #fff;
  }
  .category_container {
    .category_left {
      flex: 1;
      background-color: #f1f1f1;
      height: 16rem/$fensu;
      overflow-y: auto;
      span {
        @include sc(0.5rem/$fensu, #666);
        line-height: 1.8rem/$fensu;
      }
      .category_left_li {
        @include fj;
        padding: 0 0.5rem/$fensu;
        .category_icon {
          @include wh(0.8rem/$fensu, 0.8rem/$fensu);
          vertical-align: middle;
          margin-right: 0.2rem/$fensu;
        }
        .category_count {
          background-color: #ccc;
          @include sc(0.4rem/$fensu, #fff);
          padding: 0 0.1rem/$fensu;
          border: 0.025rem/$fensu solid #ccc;
          border-radius: 0.8rem/$fensu;
          vertical-align: middle;
          margin-right: 0.25rem/$fensu;
        }
        .category_arrow {
          vertical-align: middle;
        }
      }
      .category_active {
        background-color: #fff;
      }
    }
    .category_right {
      flex: 1;
      background-color: #fff;
      padding-left: 0.5rem/$fensu;
      height: 16rem/$fensu;
      overflow-y: auto;
      .category_right_li {
        @include fj;
        height: 1.8rem/$fensu;
        line-height: 1.8rem/$fensu;
        padding-right: 0.5rem/$fensu;
        border-bottom: 0.025rem/$fensu solid $bc;
        span {
          color: #666;
        }
      }
      .category_right_choosed {
        span {
          color: $blue;
        }
      }
    }
  }
  .sort_list_container {
    width: 100%;
    .sort_list_li {
      height: 2.5rem/$fensu;
      display: flex;
      align-items: center;
      svg {
        @include wh(0.7rem/$fensu, 0.7rem/$fensu);
        margin: 0 0.3rem/$fensu 0 0.8rem/$fensu;
      }
      p {
        line-height: 2.5rem/$fensu;
        flex: auto;
        text-align: left;
        text-indent: 0.25rem/$fensu;
        border-bottom: 0.025rem/$fensu solid $bc;
        @include fj;
        align-items: center;
        span {
          color: #666;
        }
      }
      .sort_select {
        span {
          color: $blue;
        }
      }
    }
  }
  .filter_container {
    flex-direction: column;
    align-items: flex-start;
    min-height: 10.6rem/$fensu;
    background-color: #f1f1f1;
    .filter_header_style {
      @include sc(0.4rem/$fensu, #333);
      line-height: 1.5rem/$fensu;
      height: 1.5rem/$fensu;
      text-align: left;
      padding-left: 0.5rem/$fensu;
      background-color: #fff;
    }
    .filter_ul {
      display: flex;
      flex-wrap: wrap;
      padding: 0 0.5rem/$fensu;
      background-color: #fff;
      .filter_li {
        display: flex;
        align-items: center;
        border: 0.025rem/$fensu solid #eee;
        @include wh(4.7rem/$fensu, 1.4rem/$fensu);
        margin-right: 0.25rem/$fensu;
        border-radius: 0.125rem/$fensu;
        padding: 0 0.25rem/$fensu;
        margin-bottom: 0.25rem/$fensu;
        svg {
          @include wh(0.8rem/$fensu, 0.8rem/$fensu);
          margin-right: 0.125rem/$fensu;
        }
        span {
          @include sc(0.4rem/$fensu, #333);
        }
        .filter_icon {
          @include wh(0.8rem/$fensu, 0.8rem/$fensu);
          font-size: 0.5rem/$fensu;
          border: 0.025rem/$fensu solid $bc;
          border-radius: 0.15rem/$fensu;
          margin-right: 0.25rem/$fensu;
          line-height: 0.8rem/$fensu;
          text-align: center;
        }
        .activity_svg {
          margin-right: 0.25rem/$fensu;
        }
        .selected_filter {
          color: $blue;
        }
      }
    }
    .confirm_filter {
      display: flex;
      background-color: #f1f1f1;
      width: 100%;
      padding: 0.3rem/$fensu 0.2rem/$fensu;
      .filter_button_style {
        @include wh(50%, 1.8rem/$fensu);
        font-size: 0.8rem/$fensu;
        line-height: 1.8rem/$fensu;
        border-radius: 0.2rem/$fensu;
      }
      .clear_all {
        background-color: #fff;
        margin-right: 0.5rem/$fensu;
        border: 0.025rem/$fensu solid #fff;
      }
      .confirm_select {
        background-color: #56d176;
        color: #fff;
        border: 0.025rem/$fensu solid #56d176;
        span {
          color: #fff;
        }
      }
    }
  }
}
.showcover-enter-active,
.showcover-leave-active {
  transition: opacity 0.3s;//0.3s
}
.showcover-enter,
.showcover-leave-to {
  opacity: 0;
}
.back_cover {
  position: fixed;
  @include wh(100%, 100%);
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.3);
}


</style>
