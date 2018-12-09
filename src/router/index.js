import App from '../App'

import HelloWorld from '../components/HelloWorld'
const login = r => require.ensure([], () => r(require('../page/login/login')), 'login')

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
    // //登录注册页
    {
      path: '/login',
      component: login
   },
  ]
}]
 