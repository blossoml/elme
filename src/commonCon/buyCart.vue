<template>
<section class="cart_module">
    <section v-if="!foods.specifications.length" class="cart_button" >
      <!--减按钮-->   
      <transition name="showReduce">       
          <section v-if="foodNum" class="add_icon"
           @click="removeOutCart(foods.category_id,foods.item_id, foods.specfoods[0].food_id,
           foods.specfoods[0].price,'',foods.specfoods[0].packing_fee,foods.specfoods[0].sku_id,foods.specfoods[0].stock)">
               <p> - </p>
          </section>
      </transition>
      <!--foodNum按钮-->   
       <transition name="fade">
              <span class="cart_num" v-if="foodNum">{{foodNum}}</span>
       </transition>  
      <section class="add_icon" @click="addToCart(foods.category_id, foods.item_id, foods.specfoods[0].food_id, foods.specfoods[0].name, foods.specfoods[0].price, '', foods.specfoods[0].packing_fee, foods.specfoods[0].sku_id, foods.specfoods[0].stock, $event)">
              <p> + </p>
      </section>
    </section>
     <!--选规格按钮--> 
     <section v-else class="choose_specification">
            <section class="choose_icon_container">
                <transition name="showReduce">
                    <svg class="specs_reduce_icon" v-if="foodNum" @click="showReduceTip">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-minus"></use>
                    </svg>
                </transition>
                <transition name="fade">
                    <span class="cart_num" v-if="foodNum">{{foodNum}}</span>
                </transition>
                <span class="show_chooselist" @click="showChooseList(foods)">选规格</span>
            </section>
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
    props:['foods', 'shopId'],
    computed:{
       ...mapState([
                'cartList'
        ]),       
        shopCart:function(){
        return Object.assign({},this.cartList[this.shopId])
        },       
        foodNum:function(){          
              let category_id = this.foods.category_id;
              let item_id=this.foods.item_id;//商品id
              //商品id存在             
              if(this.shopCart&&this.shopCart[category_id]&&this.shopCart[category_id][item_id])
              {
                  let num=0;
                  Object.values(this.shopCart[category_id][item_id]).forEach((item,index)=>{
                      num += item.num;  
                  });                      
                  return num; 
             }else{
               return 0;
             }
        }
    }, 
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
       let elLeft=event.target.getBoundingClientRect().left;//距离左边的距离
       let elBottom= event.target.getBoundingClientRect().bottom;//距离底部的距离
       this.showMoveDot.push(true);
       //this.$emit('showMoveDot', this.showMoveDot, elLeft, elBottom);/**原点运动的函数 */
     },
     //显示规格列表??????????????????????????????
      showChooseList(foods){
                this.$emit('showChooseList', foods)
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
            z-index: 10;
            border-radius: 50%;   
            font-size: 16px;
            font-weight: bold;    
            @include wh(.9rem/$fensu, .9rem/$fensu);
            background-color: #3190e8;
            text-align: center;
        }
        .add_icon p{
            color: #fff;
        }
        .cart_button{
            display: flex;
            align-items: center;
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
    .showReduce-enter, .showReduce-leave-to {
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