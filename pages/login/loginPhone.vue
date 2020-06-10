<template>
	<view class="page" @click.stop="bindblurHander">
		<logo></logo>
		<view class="item">
			<!---填写手机获取验证码-->
			<view class="login-phone-wraper">
				<view class="login-phone-box">
					<view class="login-phone-boxInner">
						<view class="phone-text">
							<text v-if="phoneVal">手机号</text>
						</view>
						<input type="number" :value="phoneVal" @focus="bindFocus" @input="bindinput($event,'phone')" data-type='phone'
						 placeholder="请输入手机号码" maxlength='13' class="input" />
					</view>
					<!-- 缓存的账号 -->
					<storage-account :type="'phone'" :IsAccount="IsAccount" @selectAccount="updatePhoneVal"></storage-account>
				</view>
			</view>
			<view class="btn" :class="phoneVal?'':'disable'" @click='sendCode'>登录</view>
			<!-- 用户同意协议 -->
			<user-agree></user-agree>
		</view>
	</view>
</template>

<script>
	import Ajax from './utils/ajax/index.js'
	import config from '../assets/js/config.js'
	import logo from './components/logo.vue'
	import userAgree from './components/userAgree.vue'
	import storageAccount from './components/storageAccount.vue'

	export default {
		components: {
			logo,
			userAgree,
			storageAccount
		},
		data() {
			return {
				phoneVal: '',
				IsAccount: false,
			}
		},
		methods: {
			bindFocus() {
				let that = this
				setTimeout(() => {
					that.IsAccount = that.phoneVal == '' ? true : false
				})
			},
			bindinput(e, type) {
				let phoneVal = this.phoneVal = e.detail.value
				this.IsAccount = phoneVal == '' ? true : false
				let phoneLength = phoneVal.toString().length;
				if (phoneLength == 11) {
					var phoneValData = phoneVal.substr(0, 3) + " " + phoneVal.substr(3, 4) + " " + phoneVal.substr(7, 4);
				} else if(phoneLength == 13){
					var phoneValData = phoneVal;
				} else {
					var phoneValData = phoneVal.replace(/\s*/g, "");
				}
				this.phoneVal = phoneValData
			},
			bindblurHander() {
				this.IsAccount = false
			},
			sendCode() {
				let phoneVal = this.phoneVal;
				let phoneValData = phoneVal.replace(/\s*/g, "");
				if (!this.isTelphone(phoneValData)) {
					this.common.showToast('请输入正确的手机号')
				} else {
					this.checkMobilePhone(); // 检查手机是否已经注册 再去获取验证码
				}
			},
			isTelphone(phone) {
				const reg = /^1\d{10}/;
				return reg.test(phone);
			},
			// 验证手机号码是否可以获取验证码
			checkMobilePhone() {
				let phoneVal = this.phoneVal
				let mobileNo = phoneVal.replace(/\s*/g, "");
				let urlData = `${config.checkMobilePhoneNew}/${mobileNo}/dealerNo`;
				Ajax({
					url: urlData,
					method: 'get',
					returnAll: true,
				}).then(res => {
					if (res.data.returnObject) { // 该手机号码注册
						uni.navigateTo({
							url:`/pages/login/loginCode?phoneVal=${mobileNo}`
						})
					} else { // 该手机没注册
						this.common.showToast('该号码未注册')
					}
				});
			},
			updatePhoneVal(obj) {
				var that = this
				setTimeout(() => {
					that.phoneVal = obj.phoneVal
					that.IsAccount = obj.IsAccount
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.login-phone-wraper {
		width: 100%;
		height: 100rpx;
		position: relative;

		.login-phone-box {
			width: 560rpx;
			margin: 0 auto;
			height: 100rpx;
			position: relative;

			.login-phone-boxInner {
				border-bottom: 1rpx solid #DFDFDD;
			}

			.phone-text {
				width: 100%;
				height: 40rpx;
				line-height: 40rpx;

				text {
					font-size: 28rpx;
					color: #888888;
				}
			}

			.input {
				width: 100%;
				height: 60rpx;
				font-size: 32rpx;
				font-weight: 400;
				line-height: 60rpx;
			}
		}
	}
	
	.btn {
		width: 650rpx;
		height: 88rpx;
		background: #BE2A27;
		color: #FFFFFF;
		line-height: 88rpx;
		text-align: center;
		border-radius: 44rpx;
		font-size: 32rpx;
		margin: 50rpx auto 0 auto;
	}
	
	.btn.disable {
		pointer-events: none;
		background: #E16D6B;
	}
</style>
