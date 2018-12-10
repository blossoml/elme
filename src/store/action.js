/**
 * Action 提交mutation，而不是直接变更状态，
 * Action可以包含任意异步操作
 */
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
     let res=await getUser();//获取用户信息
     commit(GET_USERINFO,res);//
    }, 
   async saveAddress({
    commit,
    state
   }){
       if(state.removeAddress.length>0) return;
       let addres = await getAddressList(state.userInfo.user_id);
	   commit(SAVE_ADDRESS, addres);	
   }
}
