// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'lib-flexible'  //使用flexible.js
import {post,get} from './util/util'

Vue.prototype.$post=post;//定义全局变量
Vue.prototype.$get=get;
//安装其他插件的时候，可以使用vue.use()来注册，但是axios并不是vue插件，所以不能用
//所以只能在每个需要发送请求的组件中引入即可。
//Vue.prototype.$http=axios;
//此时就能在method中直接使用$http的命令

/*在main.js中注入vuex */
import Vuex from 'vuex'
Vue.use(Vuex)


Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
