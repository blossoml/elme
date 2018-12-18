import App from '../App'

import HelloWorld from '../components/HelloWorld'
const login = r => require.ensure([], () => r(require('../page/login/login')), 'login')
const forget = r => require.ensure([], () => r(require('../page/forget/forget')), 'forget')
const msite = r => require.ensure([], () => r(require('../page/msite/msite')), 'msite')
const search = r => require.ensure([], () => r(require('../page/search/search')), 'search')
const food=r=>require.ensure([],()=>r(require('../page/food/food')),'food')
export default[{
  path:'/',
  component: App, //顶层路由，对应index.html 
  children:[//二级路由,对应app.vue
    //地址为空的时候
    {
    path:'',
    redirect:'/HelloWorld'
    },
    {
      path:'/HelloWorld',
      component: HelloWorld,
      meta: { keepAlive: false },
    },
      //修改密码页
    {
        path: '/forget',
        component: forget
    },
    // //登录注册页
    {
      path: '/login',
      component: login
    },
    //所有商铺列表页
    {
      path: '/msite',
      component: msite,
      meta: { keepAlive: true },
     },
     //搜索页面
     {
      path: '/search/:geohash',
      component: search     
     },
     //特色商铺列表页
     {
        path: '/food',
        component: food
     },
  ]
}]
 