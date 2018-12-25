// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/index'
import store from './store/'
import FastClick from 'fastclick'
//移动设备游览器默认会在用户点击屏幕大约延迟300ms后才会触发点击事件
//是为了检查用户是否在做双击。为了能立即响应用户的点击事件，用fastclick
import 'lib-flexible'  //使用flexible.js
import {post,get} from './util/util'
import axios from 'axios'
Vue.prototype.$post=post;//定义全局变量
Vue.prototype.$get=get;
Vue.prototype.$http = axios
//安装其他插件的时候，可以使用vue.use()来注册，但是axios并不是vue插件，所以不能用
//所以只能在每个需要发送请求的组件中引入即可。
//Vue.prototype.$http=axios;
//此时就能在method中直接使用$http的命令

/*在main.js中注入vuex */
import Vuex from 'vuex'
//Vue.use(Vuex)
Vue.use(VueRouter)

if('addEventListenter' in document){
  document.addEventListener('DOMContentLoaded',function(){
    FastClick.attach(document.body);
  },false);
}
const router=new VueRouter({
  routes,
  mode:'hash',
  strict: process.env.NODE_ENV !== 'production',
  scrollBehavior(to,from,savedPosition){
    //第三个参数 savedPosition 当且仅当 popstate 导航 (通过浏览器的 前进/后退 按钮触发) 时才可用。
    if(savedPosition){
      return savedPosition;//如果savePosition存在
    }else{
      //如果是缓存组件，那么通过元信息保存缓存组件scrollTop值
      if(from.meta.keepAlive){
        from.meta.savedPosition=document.body.scrollTop;
      }
      return{x:0, y:to.meta.savedPosition || 0 }
      }
    }  
})
new Vue({
  el:'#app',
  router,
  store
})
