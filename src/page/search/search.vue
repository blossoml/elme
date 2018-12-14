<template>
    <div class="paddingTop search_page">
      <head-top head-title="搜索" goBack="true"></head-top>
      <form class="search_form">
          <input type="search" name="search" placeholder="请输入商家或者美食" class="search_input"  v-model="searchValue" @input="checkInput">
          <input type="submit" name="submit" class="search_submit"  @click.prevent="searchTarget('')">
      </form>
      <section v-if="restaurantList.length">
          <h4 class="title_restaurant"></h4>
          <ul class="list_container">
              <router-link :to="{path:'/shop',query:{id:item.id}}"  tag="li" v-for="item in restaurantList" :key="item.id"  class="list_li">
               <section class="item_left">
                  <img :src="imgBaseUrl+item.image_path"  class="restaurant_img">                  
               </section>   
               <section class="item_right">
                   <div class="item_right_text">
                       <p>
                           <span>{{item.name}}</span>
                             <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="24" height="14" class="pay_icon">
                                    <polygon points="0,14 4,0 24,0 20,14" style="fill:none;stroke:#FF6000;stroke-width:1" />
                                    <line x1="1.5" y1="12" x2="20" y2="12" style="stroke:#FF6000;stroke-width:1.5"/>
                                    <text x="3.5" y="9" style="fill:#FF6000;font-size:9;font-weight:bold;">支付</text>
                             </svg>
                       </p>
                       <p>月售 {{item.month_sales||item.recent_order_num}} 单</p>
                       <p>{{item.delivery_fee||item.float_minimum_order_amount}} 元起送 / 距离{{item.distance}}</p>
                   </div>
                   <ul class="item_right_detail">
                       <li v-for="activities in item.restaurant_activity" :key="activities.id">
                           <span :style="{backgroundColor:'#'+activities.icon_color}" class="activities_icon">{{activities.icon_name}}</span>
                           <span>{{activities.name}}</span>
                           <span class="only_phone">(手机客户端专享)</span>
                       </li>
                   </ul>
               </section>
              </router-link>
          </ul>
      </section>
      <section class="search_history" v-if="searchHistory.length&&showHistory">
          <h4 class="title_restaurant">搜索历史</h4>
          <ul>
              <li v-for="(item,index) in searchHistory" :key=index class="history_list">
                   <span class="history_text ellipsis" @click="searchTarget(item)">{{item}}</span>
                     <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="delete_icon" @click="deleteHistory(index)">
                        <line x1="8" y1="8" x2="18" y2="18" style="stroke:#999;stroke-width:3" />
                        <line x1="18" y1="8" x2="8" y2="18" style="stroke:#999;stroke-width:3" />
                    </svg>
              </li>              
          </ul>
      </section>
      <footer class="clear_history" @click="clearAllHistory">清空历史</footer>
      <foot-guide></foot-guide>
    </div>   
</template>
<script>
//import {mapMutations, mapState} from 'vuex'  //获取状态信息，以及更改状态信息
import footGuide from '@/commonCon/footGuide'
import {searchRestaurant} from '@/service/getData'
import headTop from '@/commonCon/head'
import {getStore, setStore} from '@/common/localStorage'
export default {
    data(){
        return{
            geohash:'',//msite页面传递过来的地址
            searchValue:'',//搜索内容
            restaurantList:[],//搜索返回的结果
            imgBaseUrl: 'https://fuss10.elemecdn.com', //图片域名地址  
            searchHistory:[],//搜索历史记录
            showHistory:true,//是否显示历史记录
            emptyResult:false//搜索结果为空时候            
        }
    },
    created(){

    },
    mounted(){
        this.geohash=this.$router.params.geohash;//获取传递过来的hash地址
        //获取搜索历史记录
        if(getStore('searchHistory'))
        {
         this.searchHistory=JSON.parse(getStore('searchHistory'));
        }
    },
    components:{
        headTop,
        footGuide
    },
    methods:{
        //点击提交按钮，搜索结果并显示，同时将搜索内容存入历史记录
        async:searchTarget(historyValue){
            if(historyValue){
                this.searchValue=historyValue
            }else if(!this.searchValue)
            {
                return;
            }
            //隐藏历史记录
            this.showHistory=false;
            //获取搜索结果
            this.restaurantList=await searchRestaurant(this.geohash,this.sesearchValue);
            this.emptyResult=!this.restaurantList.length;
            /**
             * 点击搜索结果进入下一页面时候进行判断是否已经有一样的历史记录
             * 如果没有则新增，如果有则不做重复储存，判断完成后再进入下一页
             */
            let history=getStore('searchHistory');
            if(history){
                let repeat=false;
               

            }

        
        }
      
    }   

}
</script>
<style lang="scss" scoped>
     @import '../common/mixin'; 
     $fenmu: 1.6;
	.search_page{
        margin-bottom: 2rem/$fenmu;
    }
    .search_form{
        background-color: #fff;
        padding: 0.5rem/$fenmu;
        display: flex;
        input{
            height: 1.5rem/$fenmu;
        }
        .search_input{
            flex: 4;
            border: 0.025rem/$fenmu solid $bc;
            @include sc(0.65rem/$fenmu, #333);
            border-radius: 0.125rem/$fenmu;
            background-color: #f2f2f2;
            font-weight: bold;
            padding: 0 0.25rem/$fenmu;
        }
        .search_submit{
            flex: 1;
            border: 0.025rem/$fenmu solid $blue;
            margin-left: .2rem/$fenmu;
            @include sc(0.65rem/$fenmu, #fff);
            border-radius: 0.125rem/$fenmu;
            background-color: $blue;
            font-weight: bold;
            padding: 0 0.25rem/$fenmu;
        }
    }
    .title_restaurant{
        font-size: 0.6rem/$fenmu;
        line-height: 2rem/$fenmu;
        text-indent: 0.5rem/$fenmu;
        font-weight: bold;
        color: #666;
    }
    .list_container{
        background-color: #fff;
    }
    .list_li{
        display: flex;
        justify-content: 'center';
        padding: 0.5rem/$fenmu;
        border-bottom: 0.025rem/$fenmu solid $bc;
        .item_left{
            margin-right: 0.25rem/$fenmu;
            .restaurant_img{
                @include wh(1.7rem/$fenmu, 1.7rem/$fenmu);
            }
        }
        .item_right{
            font-size: 0.55rem/$fenmu;
            flex: 1;
            .item_right_text{
                padding-bottom: 0.25rem/$fenmu;
                border-bottom: 0.025rem/$fenmu solid $bc;
                p{
                    line-height: .9rem/$fenmu;
                }
                .pay_icon{
                    margin-bottom: -0.08rem/$fenmu;
                }
            }
            .item_right_detail{
                margin-top: 0.25rem/$fenmu;
                li{
                    font-size: 0;
                    span{
                        font-size: .5rem/$fenmu;
                        vertical-align: middle;
                        display: inline-block;
                        margin-bottom: 0.2rem/$fenmu;
                    }
                    .activities_icon{
                        @include sc(.5rem/$fenmu, #fff);
                        font-weight: bold;
                        padding: .04rem/$fenmu;
                        border-radius: 0.15rem/$fenmu;
                        margin-right: 0.125rem/$fenmu;
                    }
                    .only_phone{
                        color: #FF6000;
                    }
                }
            }
        }
    }
    .search_history{
        .history_list{
            background-color: #fff;
            border-bottom: 0.025rem/$fenmu solid $bc;
            @include font(0.7rem/$fenmu, 2rem/$fenmu);
            padding: 0 0.3rem/$fenmu;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .history_text{
                display: inline-block;
                width: 80%;
            }
            .delete_icon{
                @include wh(1rem/$fenmu, 1rem/$fenmu);
            }
        }
        .clear_history{
            background-color: #fff;
            color: $blue;
            @include font(.7rem/$fenmu, 2rem/$fenmu);
            font-weight: bold;
            text-align: center;
        }
    }
    .search_none{
        margin: 0 auto;
        @include font(0.65rem/$fenmu, 1.75rem/$fenmu);
        color: #333;
        background-color: #fff;
        text-align: center;
        margin-top: 0.125rem/$fenmu;
    }
</style>
