<template>
    
</template>
<script>
import {mapState, mapMutations} from 'vuex'
import headTop from '@/commonCon/head'
import alertTip from '@/commonCon/alertTip'
import loading from '@/commonCon/loading'
import {checkout, getAddress, placeOrders, getAddressList} from '@/service/getData'
export default {
    data(){
        return{
             geohash: '', //geohash位置信息
             shopId:null,//商店id值
             showLoading:true,//显示加载动画
             checkoutData:null,//数据返回值
             shopCart:null,//购物车数据
             imgBaseUrl:'', //图片域名
             showPayWay: false,//显示付款方式
             payWayId:1,//付款方式
             showAlert:false,//显示弹出框
             alertText: null, //弹出框内容
        }
    },
    created(){
         //获取上个页面传递过来的geohash值
         this.geohash = this.$route.query.geohash;
         //获取上个页面传递过来的shopid值
         this.shopId = this.$route.query.shopId;
         //state.cartList = JSON.parse(initCart);       
         this.INIT_BUYCART();//初始化购物车信息
         this.SAVE_SHOPID(this.shopId);//存储当前商铺id
         //获取当前商铺购物车信息
         this.shopCart=this.cartList[this.shopId];     
   },
    mounted(){
        if(this.geohash){
            this.initData();
            this.SAVE_GEOHASH(this.geohash);//保存hash地址
        }       
    },
    components:{
        headTop,
        alertTip,
        loading
    },
    computed:{
        ...mapState([
             'cartList', 'remarkText', 'inputText', 'invoice', 'choosedAddress', 'userInfo'
        ]),
        //备注页返回的评论信息进行处理
        remarklist:function(){
            let str=new String;
            if(this.remarkText){
                Object.values(this.remarkText).forEach(item=>{
                    str+=item[1]+',';
                })
            }
            //是否有自定义备注，分开处理
            if(this.inputText){
                return str+this.inputText;
            }else{
                return str.substr(0,str.str.lastIndexOf(','))
            }            
        }
    },
    methods:{
         ...mapMutations([
                'INIT_BUYCART', 'SAVE_GEOHASH', 'CHOOSE_ADDRESS', 'NEED_VALIDATION', 'SAVE_CART_ID_SIG', 'SAVE_ORDER_PARAM', 'ORDER_SUCCESS', 'SAVE_SHOPID'
            ]),
        //初始化数据
        async initData(){
            let newArr=new Array();
            Object.values(this.shopCart).forEach(categoryItem=>{
                Object.values(categoryItem).forEach(itemValue=>{
                  Object.values(itemValue).forEach(item=>{
                      newArr.push({
                        attrs: [],
                        extra: {},
                        id: item.id,
                        name: item.name,
                        packing_fee: item.packing_fee,
                        price: item.price,
                        quantity: item.num,
                        sku_id: item.sku_id,
                        specs: [item.specs],
                        stock: item.stock,
                      })
                  })
                })
            })
          //检测订单是否满足条件
           this.checkoutData = await checkout(this.geohash, [newArr], this.shopId);
           this.SAVE_CART_ID_SIG({cart_id: this.checkoutData.cart.id, sig:  this.checkoutData.sig});
           this.initAddress();
           this.showLoading=false;
        },
        //获取地址信息，第一个地址为默认选择地址
        async initAddress(){
              if (this.userInfo && this.userInfo.user_id) {
                    const addressRes = await getAddressList(this.userInfo.user_id);
                    if (addressRes instanceof Array && addressRes.length) {
                        //如果地址为数组且不为空默认选择第一个
                        this.CHOOSE_ADDRESS({address: addressRes[0], index: 0});
                    }
             }
        },
        //显示付款方式
        showPayWayFun(){
                this.showPayWay = !this.showPayWay;
        },
        //选择付款方式
        choosePayWay(is_online_payment, id){
         if(is_online_payment){
              this.showPayWay = !this.showPayWay;
              this.payWayId = id;//支付方式id
         }
        },
        //地址备注颜色
        iconColor(name)
        {
              switch(name){
                    case '公司': return '#4cd964';
                    case '学校': return '#3190e8';
             }
        },
        //确认订单
        async confirmOrder(){

        }
      },
      watch: {
            userInfo: function (value) { 
                //userInfo改变时候初始化地址
                if (value && value.user_id) {
                    this.initAddress();
                }
            },
      }
}
</script>
