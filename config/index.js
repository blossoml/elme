'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: { //开发环境
    assetsSubDirectory: 'staticonfic',
    assetsPublicPath: '/',  
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,//运行后项目自启
    errorOverlay: true,//查询错误
    notifyOnErrors: true,//通知错误
    poll: false, 
   // devtool: 'cheap-module-eval-source-map',
    devtool: 'source-map',
   // cacheBusting: true,
    cacheBusting:false,
    cssSourceMap: false,
    context: [ //代理路径
      '/shopping',
      '/ugc',
      '/v1',
      '/v2',
      '/v3',
      '/v4',
      '/bos',
      '/member',
      '/promotion',
      '/eus',
      '/payapi',
      '/img',
    ],
    proxyTable:{
      '/api':{
        target: 'http://cangdu.org:8001',//目标接口和域名
        changeOrigin:true,//是否跨域
        pathRewrite:{
          '^/api': ''   //重写接口
        }
      }
    }
  },
  //将本地8080端口的一个请求代理到http://cangdu.org:8001
  //'http://localhost:8080/api' ===> 'http://www.abc.com/api'
  build: {   
    //配置入口文件
    index: path.resolve(__dirname, '../dist/index.html'),
    //项目打包路径
    assetsRoot: path.resolve(__dirname, '../dist'),
    //项目资源文件路径
    assetsSubDirectory: 'static',
    //配置资源文件在项目中引用，相对路径
    assetsPublicPath: '/',//资源根目录
    productionSourceMap: true,//生产环境是否开启sourse map
    devtool: 'source-map',
    productionGzip: false,//是否开启gzip
    productionGzipExtensions: ['js', 'css'],//需要使用gizp压缩文件扩展名
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
