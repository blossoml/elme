<template>
    <header id="head_top">      
        <!--search插槽-->
        <slot name='search'></slot>   
        <!--返回上一页的部分-->
        <section class="head_goback" v-if="goBack" @click="$router.go(-1)">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
            </svg>
        </section>
         <!--router-link to的值传到router.push(),所以这个值可以是一个字符串或者描述目标位置的对象-->            
        <router-link :to="userInfo?'/profile':'/login'" v-if='signinUp' class="head_login">
               <!--userInfo存在的时候显示图标-->
               <svg class="user_avatar" v-if="userInfo">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#user"></use>
               </svg>
               <span class="login_span" v-else>登录|注册</span>
        </router-link>
        <!--标题部分-->
        <section class="title_head ellipsis" v-if="headTitle">
            <span class="title_text">{{headTitle}}</span>
        </section>   
        <!--首页标题插槽-->   
        <slot name="msite-title"></slot>
   </header>
</template>
<script>
import {mapState,mapActions} from 'vuex'
export default {
   data(){
       return{
 
       }
   },
   mounted(){
       //vue实例创建之后，dom挂载完成
       //获取用户信息
       this.getUserInfo();
       console.log(this.userInfo);
   },
   //接收父组件传递过来的参数包括title,返回和登录
   props: ['signinUp', 'headTitle', 'goBack'],
   computed:{
       //计算属性，使用对象展开运算符将此对象混入到外部对象中
       ...mapState(['userInfo']),      
   },
   methods:{
       ...mapActions(['getUserInfo'])
   }
}
</script>
<style lang="scss" scoped>
 @import '../common/mixin'; 
  $fenmu: 1.6;  
  #head_top{
        background-color: $blue;
        position: fixed;
        z-index: 100;
        left: 0;
        top: 0;
        @include wh(100%, 1.95rem/$fenmu);
    }
    .head_goback{
        left: 0.4rem/$fenmu;
        @include wh(0.6rem/$fenmu, 1rem/$fenmu);
        line-height: 2.2rem/$fenmu;
        margin-left: .4rem/$fenmu;
    }
    .head_login{
        right: 0.55rem/$fenmu;
        @include sc(0.65rem/$fenmu, #fff);
        @include ct;
        .login_span{
            color: #fff;
        }
        .user_avatar{
            fill: #fff;
            @include wh(.8rem/$fenmu, .8rem/$fenmu);
        }
    }
    .title_head{
        @include center;
        width: 50%;
        color: #fff;
        text-align: center;
        .title_text{
            @include sc(0.8rem/$fenmu, #fff);
            text-align: center;
            font-weight: bold;
        }
    }
</style>
