<template>
<div class="con" :style="{height:bodyHeight+'px'}"> <!--固定高度区域-->   
  <div class="scroll"><!--可以改变transitionY的区域--> 
         <head-top signin-up='msite'>
            <!--链接到搜索页面 search插槽-->
            <router-link :to="'/search/geohash'" class="link_search" slot="search">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
                            <circle cx="8" cy="8" r="7" stroke="rgb(255,255,255)" stroke-width="1" fill="none"/>
                            <line x1="14" y1="14" x2="20" y2="20" style="stroke:rgb(255,255,255);stroke-width:2"/>
                </svg>
            </router-link> 
            <!--链接到home页面 msite_title插槽-->
            <router-link to="/home" slot="msite-title" class="msite_title">
                <span class="title_text ellipsis">{{msiteTitle}}</span>
            </router-link>        
         </head-top>      
         <nav class="msite_nav">
         <div class="swiper-container" v-if="foodTypes.length">
            <div class="swiper-wrapper">
                <div class="swiper-slide food_types_container" v-for="(item,index) in foodTypes" :key="index">
                    <router-link :to="{path:'/food',query:{geohash,title:foodItem.title,restaurant_category_id: getCategoryId(foodItem.link)}}" :key="foodItem.id" v-for="foodItem in item" class="link_to_food">
                            <figure>
                                    <img :src="imgBaseUrl + foodItem.image_url">
                                    <figcaption>{{foodItem.title}}</figcaption>
                            </figure>
                    </router-link>           
                </div>
                </div>
                <div class="swiper-pagination"></div> 
            </div>  
         </nav>
         <div class="shop_list_container">
                <header class="shop_header">
                    <svg class="shop_icon">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#shop"></use>
                    </svg>
                    <span class="shop_header_title">附近商家</span>
                </header>
                <shop-list v-if="hasGetData" :geohash="geohash" ref="shopref" @loadOver=over></shop-list>
         </div>  
         <p class="loadTips">{{loadText}}</p> 
    </div> 
<foot-guide class="footCon"></foot-guide>
</div>
</template>
<script>
import Swiper from 'swiper'
import "../../../node_modules/swiper/dist/css/swiper.css";
import {mapMutations, mapState} from 'vuex'  //获取状态信息，以及更改状态信息
import footGuide from '@/commonCon/footGuide'
import shopList from '@/commonCon/shoplist'
import headTop from '@/commonCon/head'
import { mscroll,cssTransform } from '@/common/localStorage'
import {msiteAddress, msiteFoodTypes, cityGuess} from '@/service/getData'
export default {
    data()
    {
        return {           
            msiteTitle:'请选择地址...', // msite页面头部标题
            foodTypes: [], // 食品分类列表
            hasGetData: false, //是否已经获取地理位置数据，成功之后再获取商铺列表信息
            imgBaseUrl: 'https://fuss10.elemecdn.com', //图片域名地址  
            bodyHeight:0 ,
            loadText:"下拉加载更多...",
            isLoad:false ,
            LoadOver:false
        }
    },
    async beforeMount(){       
        this.geohash='31.223634,121.474443';
        this.SAVE_GEOHASH(this.geohash);
        let res=await msiteAddress(this.geohash);
        this.msiteTitle=res.name;
        //记录当前经纬度信息
        this.RECORD_ADDRESS(res);        
        this.hasGetData=true;   //地理位置获取成功 
    },    
    mounted(){  
        let that=this; 
        this.bodyHeight=document.body.clientHeight;    
        let wrap=document.querySelector('.con');
        let footerel=document.querySelector('#foot_guide');  
        let child=wrap.children[0];    
        let  callBack={
           start:function(){              
             that.isLoad=false;         
           },
           in:function(){ 
               if(!that.isLoad&&!that.LoadOver){              
                  if(footerel.offsetHeight+child.offsetHeight-wrap.clientHeight<-cssTransform(child,'translateY'))
                   {  
                       that.$refs.shopref.loaderMore();                      
                       that.isLoad=true;
                   } 
               }              
           },
           end:function(){
              if(!that.isLoad&&!that.LoadOver){
                   if(footerel.offsetHeight+child.offsetHeight-wrap.clientHeight<-cssTransform(child,'translateY'))
                   {                       
                        that.$refs.shopref.loaderMore();
                        that.isLoad=true;             
                   }
               }
           },
           over:function(){

           }                     
        };
        mscroll(wrap,callBack,footerel);       
        //获取导航的食品分类列表
         msiteFoodTypes(this.geohash).then(res=>{            
             let resArr=[...res];//返回一个新的数组
             let foodArr=[];           
             for(let i=0,j=0;i<res.length;i+=8, j++)
             {
              foodArr[j]=resArr.splice(0,8);
             }
             this.foodTypes=foodArr;            
          }).then(()=>{
               //初始化swiper
               new Swiper('.swiper-container', {
		        pagination: {
                     el: '.swiper-pagination',
                },
                loop:true,                
                direction: 'horizontal', // 垂直切换选项
		       });
           })
    },
    beforeDestroy:{
    
    },
     components: {
    	headTop,    	
        footGuide,
        shopList
    },
    methods:{
         ...mapState([
                'geohash'
         ]),      
         ...mapMutations([
    		'RECORD_ADDRESS', 'SAVE_GEOHASH'
          ]),
          //解码url地址，求去restaurant_category_id值
         getCategoryId(url){
             let urlData=decodeURIComponent(url.split('=')[1].replace('&target_name',''));            
             if(/restaurant_category_id/gi.test(urlData)){
                 return JSON.parse(urlData).restaurant_category_id.id;
             }else
             {
                 return '';
             }
         },
         over:function(){
             this.LoadOver=true;
             this.loadText="暂无更多数据"
         }
    }
}
</script>
<style lang="scss" scoped>
 $fenmu: 1.6;  
 @import '../../common/mixin';
    .con{
        overflow: hidden;
    } 
    .loadTips
    {
        position:absolute;
        bottom: -0.5rem;
        width:100%;
        text-align: center;
    }
    .scroll{
        position: relative;
    }
	.link_search{
		left: .8rem/$fenmu;
		@include wh(.9rem/$fenmu, .9rem/$fenmu);
		@include ct;
	}
	.msite_title{
		@include center;
        width: 50%;
        color: #fff;
        text-align: center;
        margin-left: -0.5rem/$fenmu;
        .title_text{
            @include sc(0.8rem/$fenmu, #fff);
            text-align: center;
            display: block;
        }
	}
	.msite_nav{
		padding-top: 2.1rem/$fenmu;
		background-color: #fff;
		border-bottom: 0.025rem/$fenmu solid $bc;
		height: 10.6rem/$fenmu;
		.swiper-container{
			@include wh(100%, auto);
			padding-bottom: 0.6rem/$fenmu;
			.swiper-pagination{
				bottom: 0.2rem/$fenmu;
			}
		}
		.fl_back{
			@include wh(100%, 100%);
		}
	}
	.food_types_container{
		display:flex;
		flex-wrap: wrap;
		.link_to_food{
			width: 25%;
			padding: 0.3rem/$fenmu 0rem/$fenmu;
			@include fj(center);
			figure{
				img{
					margin-bottom: 0.3rem/$fenmu;
					@include wh(1.8rem/$fenmu, 1.8rem/$fenmu);
				}
				figcaption{
					text-align: center;
					@include sc(0.55rem/$fenmu, #666);
				}
			}
		}
	}
	.shop_list_container{
		margin-top: .4rem/$fenmu;
		border-top: 0.025rem/$fenmu solid $bc;
		background-color: #fff;
		.shop_header{
			.shop_icon{
				fill: #999;
				margin-left: 0.6rem/$fenmu;
				vertical-align: middle;
				@include wh(0.6rem/$fenmu, 0.6rem/$fenmu);
			}
			.shop_header_title{
				color: #999;
				@include font(0.55rem/$fenmu, 1.6rem/$fenmu);
			}
		}
	}
</style>

