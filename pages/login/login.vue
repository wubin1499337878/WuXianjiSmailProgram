<template>
	<view>
		<view class="page">
			<logo></logo>
			<button v-if="infoModel" open-type="getPhoneNumber" class="btn" @getphonenumber="onGetPhoneNumber($event)">
				<uni-icons type="weixin" color="#fff" size="20" class="WeChat" name="WeChat"></uni-icons>
				<text class="phoneName">微信手机号登录</text>
			</button>
			<button v-else @click="this.common.openUrl({url:'./loginPhone'})" data-type='phone' class="btn">手机号登录</button>
			<view class="login_or"><text class="x" selectable="false" space="false" decode="false">或</text></view>
			<view class="login_num" :class="!infoModel?'justifyCenter':''">
				<view class="left" @click="this.common.openUrl({url:'./loginPhone'})" v-if="infoModel">
					<img :src="urlImage.phone_icon" class="icon" />
					<text class="phone">其他手机号</text>
				</view>
				<view class="right" @click="this.common.openUrl({url:'./loginAccount'})">
					<img :src="urlImage.lock_icon" class="icon" />
					<text class="account">账号密码</text>
				</view>
			</view>
			<!-- 用户同意协议 -->
			<user-agree></user-agree>
		</view>
	</view>
</template>

<script>
	import { staticDomain } from '../assets/js/env';
	import Ajax from './utils/ajax/index.js'
	import {login, getUserInfoData} from './utils/login.js'
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import logo from './components/logo.vue'
	import userAgree from './components/userAgree.vue'
	export default {
		components: {
			logo,
			uniIcons,
			userAgree
		},
		data() {
			return {
				infoModel: true, // 默认个人微信，false为企业微信
				urlImage: {
					phone_icon: `${staticDomain}/images/mall-images/phone_icon.png`,
					lock_icon: `${staticDomain}/images/mall-images/lock_icon.png`,
				}
			}
		},
		onLoad: function(options) {
			this.init(options)
		},
		methods:{
			init(options){
				// 判断是否为企业微信
				try {
				  const res = uni.getSystemInfoSync()
				  this.infoModel = res.environment ? false : true		
				} catch (e) {
				  console.log(e)
				}
				
				//获取机器人动态字段
				let robotInitParams = ''
				for (let key in options) {
					robotInitParams += '&' + (key + '=' + options[key])
				}
				this.common.robotInitParams = robotInitParams
				
				//获取openid
				this.getOpenId()
				//判断是否重新登陆
				// let expirationTime = uni.getStorageSync('expirationTime')
				// let nowTime = Date.parse(new Date())
				// let tokenIsVaild = nowTime > expirationTime ? false : true
				// if(uni.getStorageSync('token') && tokenIsVaild){
				// 	getUserInfoData(uni.getStorageSync('token'));
				// }
			},
			onGetPhoneNumber(e) {
			  // 事件回调获取到微信服务器返回的加密数据， 然后在第三方服务端结合 session_key 以及 app_id 进行解密获取手机号。
			  // console.log(e.detail.errMsg);
			  // console.log(e.detail.iv);
			  // console.log(e.detail.encryptedData);
			  const encryptedData = e.detail.encryptedData;
			  const iv = e.detail.iv;
			  if (!encryptedData) {
					this.common.showToast('授权失败，请同意授权')
			    return;
			  }else{
					this.common.showToast('授权成功')
					let data = {
					  wxEncryptedData: encryptedData,
					  username: uni.getStorageSync('wx_openid'),
					  password: 'password',
					  terminalType: 'WEAPP',
					  rememberMe: true,
					  loginType: 'wechat_phone_one_touch',
					  wxIv: iv
					}
					login(data,'wechatPhone')
				}
			},
			getOpenId(){
				wx.cloud.init();
				wx.cloud.callFunction({
				  name: 'add',
				  complete: res => {
						uni.setStorageSync('wx_openid',res.result.openid)
					},
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.btn {
		width: 650rpx;
		height: 88rpx;
		background: #04C060;
		color: #ffffff;
		line-height: 88rpx;
		text-align: center;
		border-radius: 44rpx;
		font-size: 32rpx;
		margin: 0 auto 50rpx auto;
		display: flex;
		justify-content: center;
		align-items: center;

		.WeChat {
			margin-right: 16rpx;
			color: #fff;
			margin-top: 8rpx;
		}
	}

	.btn.disabled {
		background: #dfdfdd;
		pointer-events: none;
	}

	.login_or {
		margin-bottom: 25px;
		text-align: center;

		.x {
			color: #666666;
			font-size: 28rpx;
		}
	}

	.login_num {
		width: 500rpx;
		margin: 0 auto;
		text-align: center;
		display: flex;
		font-size: 15px;
		justify-content: space-between;

		.phone,
		.account {
			font-size: 28rpx;
			color: #666666;
		}

		.left,
		.right {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}

		.icon {
			width: 90rpx;
			height: 90rpx;
			display: block;
			margin-bottom: 10rpx;
		}
	}

	.justifyCenter {
		justify-content: center;
	}
</style>
