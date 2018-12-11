<template>
	<div class="shoplist_container">
	<ul  v-if="shopListArr.length" type="1" id="">
			<router-link :to="{path: 'shop', query:{geohash, id: item.id}}" v-for="item in shopListArr" tag='li' :key="item.id" class="shop_li">
					<section>
						<img :src="imgBaseUrl + item.image_path" class="shop_img">
					</section>
					<hgroup class="shop_right">
						<header class="shop_detail_header">
							<h4 :class="item.is_premium? 'premium': ''"  class="shop_title ellipsis">{{item.name}}</h4>
							<ul class="shop_detail_ul">
								<li v-for="item in item.supports" :key="item.id" class="supports">{{item.icon_name}}</li>
							</ul>
						</header>
						<h5 class="rating_order_num">
							<section class="rating_order_num_left">
								<section class="rating_section">							
									<span class="rating_num">{{item.rating}}</span>
								</section>
								<section class="order_section">
									月售{{item.recent_order_num}}单
								</section>
							</section>
							<section class="rating_order_num_right">
								<span class="delivery_style delivery_left" v-if="item.delivery_mode">{{item.delivery_mode.text}}</span>
								<span class="delivery_style delivery_right" v-if="zhunshi(item.supports)">准时达</span>
							</section>
						</h5>
						<h5 class="fee_distance">
							<p class="fee">
								¥{{item.float_minimum_order_amount}}起送
								<span class="segmentation">/</span>
								{{item.piecewise_agent_fee.tips}}
							</p>
							<p class="distance_time">
								<span v-if="Number(item.distance)">{{item.distance > 1000? (item.distance/1000).toFixed(2) + 'km': item.distance + 'm'}}
									<span class="segmentation">/</span>
								</span>
								<span v-else>{{item.distance}}</span>
								<span class="segmentation">/</span>
								<span class="order_time">{{item.order_lead_time}}</span>
							</p>
						</h5>
					</hgroup>
			</router-link>
		</ul>	     
	
     <transition name="loading">
		<!--<loading v-show="showLoading"></loading>-->
    </transition>
	</div>	
</template>

<script>
import {mapState} from 'vuex'
import {shopList} from '@/service/getData'
import loading from './loading'

export default {
	data(){
		return {
			offset: 0, // 批次加载店铺列表，每次加载20个 limit = 20
			shopListArr:[], // 店铺列表数据
			preventRepeatReuqest: false, //到达底部加载数据，防止重复加载		
			showLoading: true, //显示加载动画
			touchend: false, //没有更多数据
			imgBaseUrl:'//elm.cangdu.org/img/',
		}
    },
    mounted(){
        this.initData();
    },
    components:{
        loading
    },
    /**接收参数
	 * 目录id,排序id,配送方式
	*/
    props: ['restaurantCategoryId', 'restaurantCategoryIds', 'sortByType', 'deliveryMode', 'supportIds', 'confirmSelect', 'geohash'],
    computed:{
        ...mapState([
			'latitude','longitude'
		]),
    },
    methods:{
        async initData(){
            //获取数据
            let res=await shopList(this.latitude, this.longitude, this.offset, this.restaurantCategoryId);
            this.shopListArr=[...res];         
            this.hideLoading();           
        },
        //监听父级传来的数据发生变化时，触发此函数重新根据属性值获取数据
		async listenPropChange(){
			this.showLoading = true;
			this.offset = 0;
			//目录id,排序id,配送方式，商家属性
			let res = await shopList(this.latitude, this.longitude, this.offset, '', this.restaurantCategoryIds, this.sortByType, this.deliveryMode, this.supportIds);
			this.hideLoading();
			//考虑到本地模拟数据是引用类型，所以返回一个新的数组
			this.shopListArr = [...res];
        },
        		//到达底部加载更多数据
		async loaderMore(){		
			//防止重复请求
			if (this.preventRepeatReuqest) {
				return
            }
			this.showLoading = true;
			this.preventRepeatReuqest = true;
			//数据的定位加20位
			this.offset += 10;
			let res = await shopList(this.latitude, this.longitude, this.offset, this.restaurantCategoryId);
			this.hideLoading();
            this.shopListArr = [...this.shopListArr, ...res];
            			
			this.preventRepeatReuqest = false;
        },
        hideLoading(){
			this.showLoading = false;
        },
        zhunshi(supports){
			let zhunStatus;
			if ((supports instanceof Array) && supports.length) {
 				supports.forEach(item => {
 					if (item.icon_name === '准') {
 						zhunStatus = true;
 					}
 				})
			}else{
				zhunStatus = false;
			}
			return zhunStatus
		},
     },
    watch: {
		//监听父级传来的restaurantCategoryIds，当值发生变化的时候重新获取餐馆数据，作用于排序和筛选
		restaurantCategoryIds: function (value){
			this.listenPropChange();
		},
		//监听父级传来的排序方式
		sortByType: function (value){
			this.listenPropChange();
		},
		//监听父级的确认按钮是否被点击，并且返回一个自定义事件通知父级，已经接收到数据，此时父级才可以清除已选状态
		confirmSelect: function (value){
			this.listenPropChange();
		}
	}   
}	
</script>

<style lang="scss" scoped>
     @import '../common/mixin'; 
     $fenmu: 1.6;  
	 
	.shoplist_container{
		background-color: #fff;
		margin-bottom: 2rem/$fenmu;
	}
	.shop_li{
		display: flex;
		border-bottom: 0.025rem/$fenmu solid #f1f1f1;
		padding: 0.7rem/$fenmu 0.4rem/$fenmu;
	}
	.shop_img{
		@include wh(2.7rem/$fenmu, 2.7rem/$fenmu);
		display: block;
		margin-right: 0.4rem/$fenmu;
	}
	.list_back_li{
		height: 4.85rem/$fenmu;
		.list_back_svg{
			@include wh(100%, 100%)
		}
	}
	.shop_right{
		flex: auto;
		.shop_detail_header{
			@include fj;
			align-items: center;
			.shop_title{
				width: 8.5rem/$fenmu;
				color: #333;
				padding-top: .01rem/$fenmu;
				@include font(0.65rem/$fenmu, 0.65rem/$fenmu, 'PingFangSC-Regular');
				font-weight: 700;
			}
			.premium::before{
				content: '品牌';
				display: inline-block;
				font-size: 0.5rem/$fenmu;
				line-height: .6rem/$fenmu;
				color: #333;
				background-color: #ffd930;
				padding: 0 0.1rem/$fenmu;
				border-radius: 0.1rem/$fenmu;
				margin-right: 0.2rem/$fenmu;
			}
			.shop_detail_ul{
				display: flex;
				transform: scale(.8);
				margin-right: -0.3rem/$fenmu;
				.supports{
					@include sc(0.5rem/$fenmu, #999);
					border: 0.025rem/$fenmu solid #f1f1f1;
					padding: 0 0.04rem/$fenmu;
					border-radius: 0.08rem/$fenmu;
					margin-left: 0.05rem/$fenmu;
				}
			}
		}
		.rating_order_num{
			@include fj(space-between);
			height: 0.6rem/$fenmu;
			margin-top: 0.52rem/$fenmu;
			.rating_order_num_left{
				@include fj(flex-start);
				.rating_section{
					display: flex;
					.rating_num{
						@include sc(0.4rem/$fenmu, #ff6000);
						margin: 0 0.2rem/$fenmu;
					}
				}
				.order_section{
					transform: scale(.8);
					margin-left: -0.2rem/$fenmu;
					@include sc(0.4rem/$fenmu, #666);
				}
			}
			.rating_order_num_right{
				display: flex;
				align-items: center;
				transform: scale(.7);
				min-width: 5rem/$fenmu;
				justify-content: flex-end;
				margin-right: -0.8rem/$fenmu;
				.delivery_style{
					font-size: 0.4rem/$fenmu;
					padding: 0.04rem/$fenmu 0.08rem/$fenmu 0;
					border-radius: 0.08rem/$fenmu;
					margin-left: 0.08rem/$fenmu;
					border: 1px;
				}
				.delivery_left{
					color: #fff;
					background-color: $blue;
					border: 0.025rem/$fenmu solid $blue;
				}
				.delivery_right{
					color: $blue;
					border: 0.025rem/$fenmu solid $blue;
				}
			}
		}
		.fee_distance{
			margin-top: 0.52rem/$fenmu;
			@include fj;
			@include sc(0.5rem/$fenmu, #333);
			.fee{
				transform: scale(.9);
				@include sc(0.5rem/$fenmu, #666);
			}
			.distance_time{
				transform: scale(.9);
				span{
					color: #999;
				}
				.order_time{
					color: $blue;
				}
				.segmentation{
					color: #ccc;
				}
			}
		}
	}
	.loader_more{
		@include font(0.6rem/$fenmu, 3);
		text-align: center;
	    color: #999;
	}
	.empty_data{
		@include sc(0.5rem/$fenmu, #666);
		text-align: center;
		line-height: 2rem/$fenmu;
	}
	.return_top{
		position: fixed;
		bottom: 3rem/$fenmu;
		right: 1rem/$fenmu;
		.back_top_svg{
			@include wh(2rem/$fenmu, 2rem/$fenmu);
		}
	}
	.loading-enter-active, .loading-leave-active {
		transition: opacity 1s
	}
	.loading-enter, .loading-leave-active {
		opacity: 0
	}
</style>
