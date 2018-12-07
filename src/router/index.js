import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import detail from '@/components/detail/detail'
import ratings from '@/components/ratings/ratings'
import seller from '@/components/seller/seller'
import goods from '@/components/goods/goods'
//使用注册路由
Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }, 
    {
      path: '/ratings',
      name: 'ratings',
      component: ratings
    },
    {
      path: '/seller',
      name: 'seller',
      component: seller
    } ,
    {
      path: '/detail',
      name: 'detail',
      component: detail
    } ,
    {
      path: '/goods',
      name: 'goods',
      component: goods
    } 
 ]
})
