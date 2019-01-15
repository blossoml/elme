// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router/index'
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
//import Vuex from 'vuex'
//Vue.use(Vuex)
if('addEventListenter' in document){
  document.addEventListener('DOMContentLoaded',function(){
    FastClick.attach(document.body);
  },false);
}
new Vue({
  el:'#app',
  router,
  store
})
