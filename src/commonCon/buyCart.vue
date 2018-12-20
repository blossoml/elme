<template>
<section class="cart_module">
    <section v-if="!foods.specifications.length" class="cart_button" > 
      <transition name="showReduce">
          <span v-if="foodNum"
           @click="removeOutCart(foods.category_id,foods.item_id, foods.specfoods[0].food_id,
           foods.specfoods[0].price,'',foods.specfoods[0].packing_fee,foods.specfoods[0].sku_id,foods.specfoods[0].stock)">
               <svg>
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-minus"></use>
              </svg>
          </span>
      </transition>
       <transition name="fade">
                <span class="cart_num" v-if="foodNum">{{foodNum}}</span>
       </transition>
       
    </section>
</section>
    
</template>
<script>
import {mapState, mapMutations} from 'vuex'
export default {
    data(){
        return{
              showMoveDot: [], //控制下落的小圆点显示隐藏
        }
    },
    mounted(){

    },
    computed:{
        ...mapState(['cartList']), 
        /**
         * 监听list的变化，更新当前商铺的购物车信息shopCart，同时返回一个新对象
         */
        shopCart:function(){
        return Object.assign({},this.cartList[this.shopId])
        },
        //shopCart变化的时候重新计算当前商品的数量
        foodNum:function(){
              let category_id = this.foods.category_id;
              let item_id=this.foods.item_id;//商品id
              //商品id存在
              if(this.shopCart&this.shopCart[category_id]&&this.shopCart[category_id][item_id])
              {
                  let num=0;
                  Object.values(this.shopCart[category_id][item_id]).forEach((item,index)=>{
                      num+=item.num;  
                  });                 
             }else{
               return 0;
             }
        }
    },
   props:['foods', 'shopId'],
   methods:{
     ...mapMutations([
           'ADD_CART','REDUCE_CART',
     ]),
     //移出购物车
     removeOutCart(category_id, item_id, food_id, name, price, specs, packing_fee, sku_id, stock){
         if(this.foodNum>0){
          //将food_id里面的数量信息置为0
          this.REDUCE_CART({shopid: this.shopId, category_id, item_id, food_id, name, price, specs, packing_fee, sku_id, stock});
         }       
     },
     //加入购物车，计算按钮位置。
     addToCart(category_id, item_id, food_id, name, price, specs, packing_fee, sku_id, stock, event){
       this.ADD_CART({shopid: this.shopId, category_id, item_id, food_id, name, price, specs, packing_fee, sku_id, stock})
       let elLeft=event.target.getBoundingClientRect().left;//元素左边到视窗左边的距离
       let elBottom= event.target.getBoundingClientRect().bottom;
       this.showMoveDot.push(true);
       this.$emit('showMoveDot', this.showMoveDot, elLeft, elBottom);/**原点运动的函数 */
     },
     //显示规格列表??????????????????????????????
      showChooseList(foodScroll){
                this.$emit('showChooseList', foodScroll)
      },
      //点击多规格商品的减按钮，弹出提示
      showReduceTip(){
                this.$emit('showReduceTip')
      },      
   } 
}
</script>

<style lang="scss" scoped>
     $fensu: 1.6;  
     @import '../common/mixin';
	.cart_module{
        .add_icon{
            position: relative;
            z-index: 999;
        }
        .cart_button{
            display: flex;
            align-items: center;
        }
        svg{
            @include wh(.9rem/$fensu, .9rem/$fensu);
            fill: #3190e8;
        }
        .specs_reduce_icon{
            fill: #999;
        }
        .cart_num{
            @include sc(.65rem/$fensu, #666);
            min-width: 1rem/$fensu;
            text-align: center;
            font-family: Helvetica Neue,Tahoma;
        }
        .choose_specification{
            .choose_icon_container{
                display: flex;
                align-items: center;
                .show_chooselist{
                    display: block;
                    @include sc(.55rem/$fensu, #fff);
                    padding: .1rem/$fensu .2rem/$fensu;
                    background-color: $blue;
                    border-radius: 0.2rem/$fensu;
                    border: 1px solid $blue;
                }
            }
        }
    }
    .showReduce-enter-active, .showReduce-leave-active {
        transition: all .3s ease-out;
    }
    .showReduce-enter, .showReduce-leave-active {
        opacity: 0;
        transform: translateX(1rem/$fensu);
    }
    .fade-enter-active, .fade-leave-active {
        transition: all .3s;
    }
    .fade-enter, .fade-leave-active {
        opacity: 0;
    }
    .fadeBounce-enter-active, .fadeBounce-leave-active {
        transition: all .3s;
    }
    .fadeBounce-enter, .fadeBounce-leave-active {
        opacity: 0;
        transform: scale(.7);
    }

</style>