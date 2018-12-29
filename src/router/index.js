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
const service = r => require.ensure([], () => r(require('../page/service/service')), 'service')
const questionDetail = r => require.ensure([], () => r(require('../page/service/children/questionDetail')), 'questionDetail')
const download = r => require.ensure([], () => r(require('../page/download/download')), 'download')
const confirmOrder = r => require.ensure([], () => r(require('../page/confirmOrder/confirmOrder')), 'confirmOrder')
const remark = r => require.ensure([], () => r(require('../page/confirmOrder/children/remark')), 'remark')
/*const payment = r => require.ensure([], () => r(require('../page/confirmOrder/children/payment')), 'payment')
const userValidation = r => require.ensure([], () => r(require('../page/confirmOrder/children/userValidation')), 'userValidation')
const invoice = r => require.ensure([], () => r(require('../page/confirmOrder/children/invoice')), 'invoice')
const chooseAddress = r => require.ensure([], () => r(require('../page/confirmOrder/children/chooseAddress')), 'chooseAddress')
const addAddress = r => require.ensure([], () => r(require('../page/confirmOrder/children/children/addAddress')), 'addAddress')
const searchAddress = r => require.ensure([], () => r(require('../page/confirmOrder/children/children/children/searchAddress')), 'searchAddress')*/
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
     //确认订单页
    {
      path: '/confirmOrder',
      component: confirmOrder,  
      children: [{
        path: 'remark', //订单备注
        component: remark,
      }]   
    },
    {
      path:'/download',
      component:download, 
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
    //服务中心
     {
        path: '/service',
        component: service,    
        name:'service',
        children:[{
          path: 'questionDetail', //问题详情页
          component: questionDetail,
          name:'questionDetail'
        }]   
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
 