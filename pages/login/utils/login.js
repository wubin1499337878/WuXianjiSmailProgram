import Ajax from './ajax/index.js'
import config from '../../assets/js/config.js'
import common from '../../../common/js/common.js'

const login = (data, type) => {
	Ajax({
		url: config.login,
		method: 'post',
		contentType: 'form',
		data: data
	}).then((res) => {
		if (!res.data.error_code) {
			if (res.data.access_token) {
				// 缓存数据
				uni.setStorageSync('token', res.data.access_token)
				//缓存过期时间- 一年
				let expirationTime = new Date();
				expirationTime.setFullYear(expirationTime.getFullYear()+1);
				expirationTime = Date.parse(expirationTime)
				uni.setStorageSync('expirationTime', expirationTime)
				
				// let nowTime = new Date().getTime();
				// let loginAccout = []
				// let loginObj = {
				// 	account: data.username, //账户
				// 	time: nowTime
				// }
				// let storageLoginAccout = uni.getStorageSync('loginAccout');
				// loginAccout = storageLoginAccout.filter((item) => {
				// 	return item.account != data.username
				// })
				// loginAccout.push(loginObj)
				// uni.setStorageSync('loginAccout', loginAccout);
				//緩存結束
				getUserInfoData(res.data.access_token);
			}
		} else {
			//微信一键登录
			let mobile = data.error_mobile_no;
			let userName = data.error_username;
			if (type == 'wechatPhone' && mobile && userName) {
				this.common.openUrl({
					url:'/pages/login/loginCode?phoneVal=' + mobile
				})
			} else {
				let toastMsg = res.data.exception_code ? res.data.exception_code : res.data.error_msg
				if (toastMsg) {
					common.showToast(toastMsg)
				}
			}
		}
	})
}
//获取用户信息
const getUserInfoData = (token) => {
	let url = config.getUserInfo + '/' + token
	Ajax.post(url, {
		hideLoading: false,
		returnAll: true
	}).then((res) => {
		if (res.data.success) {
			let dealerNO = res.data.returnObject.name
			let robotInitParams = common.robotInitParams
			common.openUrl({
				url: config.xiaoJi + '&dealerNO=' + dealerNO + robotInitParams,
				type: 'redirect',
				title: '',
				inWhiteList: true,
				isExternal: true
			})
		} else {
			uni.removeStorageSync('token');
			uni.removeStorageSync('expirationTime');
			common.showToast('没有该用户的会员信息！请重新登录')
			common.openUrl({
				url:'../login',
				type:'redirect',
			})
		}
	}).catch(e => {
		uni.removeStorageSync('token');
		uni.removeStorageSync('expirationTime');
		common.openUrl({
			url:'../login',
			type:'redirect',
			})
	});
}

export { login , getUserInfoData }
