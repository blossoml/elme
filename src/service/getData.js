

/**
 * 获取数据
 */
import {get,post} from '../util/util.js' 
/**获取localStorage项目*/
import {getStore} from '../common/localStorage' 

/**
 * 获取msite页面地址信息
 */

export const msiteAddress = geohash => get('/v2/pois/' + geohash);

/**
 * 获取msite页面食品分类列表
 */
export const msiteFoodTypes = geohash => get('/v2/index_entry', {
	geohash,
	group_type: '1',
	'flags[]': 'F'
});


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
		offset,/*偏移量*/
		limit: '12',
		'extras[]': 'activities',
		keyword: '',
		restaurant_category_id,
		'restaurant_category_ids[]': restaurant_category_ids,/*目录id*/
		order_by,/*排序选项*/
		'delivery_mode[]': delivery_mode + supportStr/*配送方式*/
	};
	return get('/shopping/restaurants', data);
};
/**
 * 获取店铺搜索结果
 */
export const searchRestaurant=(geohash, keyword) => get('/v4/restaurants', {
	'extras[]': 'restaurant_activity',
	geohash,/** */
	keyword,/*关键词*/
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
export const getUser=() => get('/v1/user',{
	user_id:getStore('user_id')
})
/**
 * 获取图片验证码
 */
export const getcaptchas=() => post('/v1/captchas');
/**
 * 改密码
 */
export const changePassword = (username, oldpassWord, newpassword, confirmpassword, captcha_code) => post('/v2/changepassword', {username, oldpassWord, newpassword, confirmpassword, captcha_code});