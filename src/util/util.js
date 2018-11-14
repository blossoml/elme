import Axios from "axios";
import { resolve } from "path";
//axios配置
Axios.defaults.timeout=5000;
Axios.defaults.baseURL='http://cangdu.org:8001/';
//http request 拦截器
Axios.interceptors.request.use(
    config=>{     
       // const token=getCookies('session');
        config.data=JSON.stringify(config.data);
        config.headers={
        'Content-Type':'application/x-www-form-urlencoded'
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
//get
export function get(url,params={}){
    return new Promise((resolve,reject)=>{
        Axios.get(url,{
            params:params
        }).then(response=>{
            resolve(response);
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
            resolve(response);
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
//post请求方法
export function put(url,data={}){
    return new Promise((resolve,reject)=>{
        Axios.put(url,data)
        .then(response=>{
            resolve(response);
        },err=>{
            reject(err);
        })   
    })
}



