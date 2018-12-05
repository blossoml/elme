
import {get,post} from '../util/util.js' 
/**获取localStorage项目*/
import {getStore} from '../common/mUtils.js' 

/**
 * 获取当前所在城市
 */ 
export const  currentcity=number=>get('/v1/cities/' + number);

/**
 *获取搜索地址
 */
export const searchplace=(cityid,value)=>post('/v1/pois',{
    type: 'search',
	city_id: cityid,
	keyword: value
})
/**
 * 获取msite页面食品分类列表
 */
export const misteFoodTypes=geohash=>post('/v2/index_entry',{
geohash,
group_type:'1',
'flags[]':'F'
})

/**
 * 获取msite商铺列表
 */
export const shopList = (latitude, longitude, offset, restaurant_category_id = '', restaurant_category_ids = '', order_by = '', delivery_mode = '', support_ids = []) => {
	let supportStr = '';
	support_ids.forEach(item => {
		if (item.status) {
			supportStr += '&support_ids[]=' + item.id;
		}
	});
	let data = {
		latitude,
		longitude,
		offset,
		limit: '20',
		'extras[]': 'activities',
		keyword: '',
		restaurant_category_id,
		'restaurant_category_ids[]': restaurant_category_ids,
		order_by,
		'delivery_mode[]': delivery_mode + supportStr
	};
	return post('/shopping/restaurants', data);
};
/**
 * 获取店铺搜索结果
 */
export const searchRestastaurant=(geohash, keyword) => post('/v4/restaurants', {
	'extras[]': 'restaurant_activity',
	geohash,
	keyword,
	type: 'search'
});
/**
 * 获取food的配送方式
 */
export const foodDelivery = (latitude, longitude) => get('/shopping/v1/restaurants/delivery_modes', {
	latitude,
	longitude,
	kw: ''
});
/**
 * 退出登录
 */
export const signout = () => get('/v2/signout');

/**
 * 账号密码登录
 */
export const accountLogin = (username, password, captcha_code) => post('/v2/login', {username, password, captcha_code});


/**
 * 获取用户信息
 */
export const getUser=()=>post('/v1/user',{
	user_id:getStore('user_id')
})
 