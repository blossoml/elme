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
         
         this.INIT_BUYCART();
         this.SAVE_SHOPID(this.shopId);
         //获取当前商铺购物车信息
        
    },
    mounted(){
        if(this.geohash){
            this.initData();
            this.SAVE_GEOHASH(this.geohash);//保存hash地址
        }
        if(!(this.userInfo&&this.userInfo.user_id)){

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
        //备注页返回的信息进行处理
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
            
        }
        
    }
}
</script>
