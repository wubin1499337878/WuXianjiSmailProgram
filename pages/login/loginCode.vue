<template>
	<view class="page">
		<logo></logo>
		<view class="login-phone-box">
			<view class="text">我们将通过短信发送验证码至{{phoneValNum}}，请注意查收</view>
			<view class="code-box">
				<view class="input-box">
					<input maxlength='6' type="number" @input="bindinput($event)" class="input-value" :vlaue="msmVal" />
				</view>
				<view class="code-btn" :class="disabled?'disable':''" @click="sendCode">{{timerText}}</view>
			</view>
		</view>
		<view class="btn" :class="msmVallength?'':'disable'" @click='loginReager'>确认</view>
		<!-- 用户同意协议 -->
		<user-agree></user-agree>
	</view>
</template>
<script>
	import Ajax from './utils/ajax/index.js'
	import {login, getUserInfoData} from './utils/login.js'
	import config from '../assets/js/config.js'
	import logo from './components/logo.vue'
	import userAgree from './components/userAgree.vue'
	export default {
		components: {
			logo,
			userAgree
		},
		data() {
			return {
				msmVal: '',
				phoneVal: '',
				phoneValNum: '',
				msmVallength: false,
				disabled: false,
				timerText: '获取验证码',
			}
		},
		onLoad(options) {
			this.phoneVal = options.phoneVal
		},
		methods: {
			bindinput(event) {
				let value = event.detail.value;
				this.msmVal = value;
				if (value.length == 6) {
					this.msmVallength = true
				} else {
					this.msmVallength = false
				}
			},
			isTelphone(phone) {
				const reg = /^1\d{10}/;
				return reg.test(phone);
			},
			sendCode() {
				this.getCodeAjax()
			},
			//倒计时
			countdown() {
				const that = this;
				let times = 60;
				const timer = setInterval(function() {
					times--;
					if (times <= 0) {
						that.disabled = false
						that.timerText = '获取验证码'
						clearInterval(timer);
					} else {
						that.disabled = true
						that.timerText = '重新获取' + '(' + times + ')'
					}
				}, 1000);
			},
			// 注册的手机号码拿去短信验证码
			getCodeAjax() {
				let phoneVal = this.phoneVal
				let phoneValData = phoneVal.replace(/\s*/g, "");
				Ajax({
					url: `${config.getMsmCode}/${phoneValData}`, // 已经注册的号码 发验证码
					method: 'post',
					// contentType: 'X-Requested-With',
					contentType: 'form',
					returnAll: true,
					data: {
						terminalType: 'WEAPP'
					}
				}).then((res) => {
					if (res.data.success) {
						this.common.showToast('验证码发送成功')
						this.countdown();
					} else {
						this.common.showToast(res.data.exceptionMessage)
					}
				}).catch((err) => {
					console.log('err' + JSON.stringify(err));
				});
			},
			// 是否输入验证码
			loginReager() {
				if (!this.msmVal) {
					this.common.showToast('请输入验证码！')
					return;
				}else{
					//手机号码已注册登录 
					let phoneData = this.phoneVal.replace(/\s*/g, '')
					let data = {
							password: this.msmVal,
							username: phoneData,
							terminalType: 'WEAPP',
							loginType: 'sms',
							rememberMe: 'true',
							reLogin: true
					}
					login(data,'phone')
				}
			}
		}
	}
</script>
<style lang="less" scoped>
	.login-phone-box {
		width: 650rpx;
		height: 200rpx;
		margin: 0 auto;
		border-bottom: none;

		.code-box {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: flex-end;
			margin-top: 30rpx;
			position: relative;

			.input-box {
				width: 430rpx;
				height: 60rpx;
				border-bottom: 1rpx solid #DFDFDD;

				input.input-value {
					position: absolute;
					width: 430rpx;
					height: 60rpx;
					left: 0;
					font-weight: 400;
					font-size: 60rpx;
					color: #333333;
					bottom: 0;
					z-index: 2;
				}
			}

			.text {
				font-size: 32rpx;
				line-height: 40rpx;
			}
		}
	}

	.code-btn {
		width: 190rpx;
		height: 68rpx;
		background-color: #E4BB91;
		border-radius: 34rpx;
		color: #FFFFFF;
		font-size: 28rpx;
		text-align: center;
		line-height: 68rpx;
	}

	.code-btn.disable {
		pointer-events: none;
		background: #888888;
	}

	.btn {
		width: 650rpx;
		height: 88rpx;
		background: #bc2826;
		color: #ffffff;
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
