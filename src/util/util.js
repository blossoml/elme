import Axios from "axios";
import { resolve } from "path";
import router from '../router/index'
//axios配置
Axios.defaults.timeout=5000;
Axios.defaults.baseURL='api/'
Axios.defaults.withCredentials=true;//允许携带cookies信息
//http request 拦截器
Axios.interceptors.request.use(
    config=>{     
       // const token=getCookies('session');
        config.data=JSON.stringify(config.data);
        config.headers={
            'Accept': 'application/json',/**Accept表示客户端希望接受的数据类型 */
            'Content-Type': 'application/json'
            /**Content-Type代表发送端（客户端|服务器）发送的实体数据的数据类型 */
        }     
        /*if(token)
        {
            config.params={'token':token}
        }*/
        return config;
    },error=>{
        return  Promise.reject(error);
    }   
)
//http response拦截器
Axios.interceptors.response.use(response=>{
    if(response.data.errCode==2)
    {
        router.push({
            path:'/login',
            query:{}
        })
    }
    return response;
},error=>{
    return Promise.reject(error)
})
//get   返回promise对象。
export function get(url,params={}){
    return new Promise((resolve,reject)=>{
        Axios.get(url,{
            params:params
        }).then(response=>{
            resolve(response.data);
        }).catch(err=>{
            reject(err);
        })
    })
}
//post请求方法
export function post(url,data={}){
    return new Promise((resolve,reject)=>{
        Axios.post(url,data)
        .then(response=>{          
           resolve(response.data);
        },err=>{
            reject(err);
        })   
    })
}
//patch请求方法
export function patch(url,data={}){
    return new Promise((resolve,reject)=>{
        Axios.patch(url,data)
        .then(response=>{
            resolve(response);
        },err=>{
            reject(err);
        })   
    })
}
//put请求方法
export function put(url,data={}){
    return new Promise((resolve,reject)=>{
        Axios.put(url,data)
        .then(response=>{
            resolve(response.data);
        },err=>{
            reject(err);
        })   
    })
}



