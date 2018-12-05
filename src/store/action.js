import{
    getUser   
} from '../service/getData'
import{
    GET_USERINFO,
    SAVE_ADDRESS
} from './mutation-types.js'
export default{
    /**异步函数,返回用户信息 */
  	async getUserInfo({commit,state}){
     let res=await getUser();
     commit(GET_USERINFO,res);
    }  
}
