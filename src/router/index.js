import App from '../App'
import HelloWorld from '../components/HelloWorld'
const login = r => require.ensure([], () => r(require('../page/login/login')), 'login')
const forget = r => require.ensure([], () => r(require('../page/forget/forget')), 'forget')
const msite = r => require.ensure([], () => r(require('../page/msite/msite')), 'msite')
const search = r => require.ensure([], () => r(require('../page/search/search')), 'search')
const food=r=>require.ensure([],()=>r(require('../page/food/food')),'food')
const shop=r=>require.ensure([],()=>r(require('../page/shop/shop')),'shop')
const foodDetail = r => require.ensure([], () => r(require('../page/shop/children/foodDetail')), 'foodDetail')
const shopDetail = r => require.ensure([], () => r(require('../page/shop/children/shopDetail')), 'shopDetail')
const shopSafe = r => require.ensure([], () => r(require('../page/shop/children/children/shopSafe')), 'shopSafe')
const profile = r => require.ensure([], () => r(require('../page/profile/profile')), 'profile')
const info = r => require.ensure([], () => r(require('../page/profile/children/info')), 'info')

export default[{
  path:'/',
  component: App, //顶层路由，对应index.html 
  children:[//二级路由,对应app.vue
    //地址为空的时候
    {
    path:'',
    redirect:'/HelloWorld'
    },
    //个人信息页
    {
      path:'/profile',
      component:profile, 
      children: [{
        path: 'info', //个人信息详情页
        component: info,
      }]
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
     {
       path:'/shop',
       component:shop,
       children:[{
         path:'foodDetail',
         component: foodDetail,
       },{
         path:'shopDetail',//商铺详情页
         component:shopDetail,
         children:[{    
          path: 'shopSafe', //商铺安全认证页
          component: shopSafe,
         }]
       }]
     }
  ]
}]
 