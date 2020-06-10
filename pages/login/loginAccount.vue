<template>
	<view class="page" @click.stop="bindblurHander">
		<logo></logo>
		<view class="login-box">
			<view class="login-box-item">
				<view class="title">
					<text v-if="accountVal">卡号/手机号</text>
				</view>
				<input type="number" :value="accountVal" @focus="bindFocus" @input="bindinput($event,'account')" data-type='account' placeholder="请输入卡号/手机号码"
				 maxlength='13' class="input"></input>
			</view>
			<!-- 缓存的账号 -->
			<storage-account :type="'account'" :IsAccount="IsAccount" @selectAccount="updatePhoneVal"></storage-account>
			<view class="login-box-item">
				<view class="title">
					<text v-if="passwordVal">密码</text>
				</view>
				<view class="input-clum">
					<input type="number" :value="passwordVal" @input="bindinput($event,'password')" data-type='password' :password="isPassWord"
					 maxlength='15' placeholder="请输入密码" class="input input-password"></input>
					<view class="right">
						<uni-icons type="eye" color="#666666" size="20" class="nav_icon" v-if="!isPassWord" @click="isPassWordShow"></uni-icons>
						<uni-icons type="eye-slash" color="#666666" size="20" class="nav_icon" v-if="isPassWord" @click="isPassWordShow"
						 data-type='close'></uni-icons>
						<view class="find-password" @click="forget">找回密码</view>
					</view>
				</view>
			</view>
		</view>
		<view class="btn" :class="accountVal&&passwordVal?'':'disable'" @click="checkInfo">登录</view>
		<!-- 用户同意协议 -->
		<user-agree></user-agree>
	</view>
</template>
<script>
	import { mdealerUrl } from '../assets/js/domain.js'
	import Ajax from './utils/ajax/index.js'
	import util from './utils/util.js'
	import {login, getUserInfoData} from './utils/login.js'
	import logo from './components/logo.vue'
	import userAgree from './components/userAgree.vue'
	import storageAccount from './components/storageAccount.vue'
	import uniIcons from '@/components/uni-icons/uni-icons.vue'

	export default {
		components: {
			logo,
			uniIcons,
			userAgree,
			storageAccount
		},
		data() {
			return {
				isPassWord: true,
				passwordVal: '',
				accountVal: '',
				IsAccount: false, //是否显示记录
				token: ''
			}
		},
		methods: {
			bindFocus() {
				let that = this
				setTimeout(() => {
					that.IsAccount = that.phoneVal == '' ? true : false
				})
			},
			bindblurHander() {
				this.IsAccount = false
			},
			bindinput(e, type) {
				this[`${type}Val`] = e.detail.value
				if (type == 'account') {
						let accountVal = this.accountVal
						let accountLength = accountVal.toString().length;
						if (accountLength == '9') {
							var accountValData = accountVal.substr(0, 3) + " " + accountVal.substr(3, 3) + " " + accountVal.substr(6, 3);
						} else if (accountLength == '11') {
							var accountValData = accountVal.substr(0, 3) + " " + accountVal.substr(3, 4) + " " + accountVal.substr(7, 4);
						} else if (accountLength == '13') {
							var accountValData = accountVal
						} else {
							var accountValData = accountVal.replace(/\s*/g, "");
						}				
						this.accountVal = accountValData
						this.IsAccount = this.accountVal == '' ? true : false
					} else {
					this.IsAccount = false
				}
			},
			isPassWordShow() {
				this.isPassWord = !this.isPassWord
			},
			forget() {
				const anyMouseToken = util.getAnonymousToken();
				const url = `${mdealerUrl}/html/dealerMember/password.html#/beforeForgetPassword?miniToken=${anyMouseToken}&fromWhere=wxminiProgram`;
				this.common.openUrl({
					url:url
				})
			},
			checkInfo() {
				let passwordVal = this.passwordVal
				let accountVal = this.accountVal
				let accountValData = accountVal.replace(/\s*/g, "");
				if (passwordVal !== '' && accountValData !== '') {
					let data = {
						password: passwordVal,
						username: accountValData,
						terminalType: 'WEAPP',
						rememberMe: 'true'
					}
					login(data,'account')
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.btn {
		width: 650rpx;
		margin: 130rpx auto 30% auto;
		height: 88rpx;
		background: #BE2A27;
		color: #ffffff;
		line-height: 88rpx;
		text-align: center;
		border-radius: 44rpx;
		font-size: 32rpx;
	}

	.btn.disable {
		background: #E16D6B;
		pointer-events: none;
	}

	.login-box {
		width: 100%;
		margin-top: 150rpx;
		position: relative;

		.stroge-phone {
			width: 100%;
			background: #fff;
			position: absolute;
			left: 0;
			top: 120rpx;
			z-index: 5;

			.list {
				width: 560rpx;
				height: 88rpx;
				margin: 0 auto;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.left {
					font-size: 34rpx;
					color: #888888;
					display: flex;
					justify-content: flex-start;
					align-items: center;
				}

				.phone-num {
					margin-right: 15rpx;
				}
			}
		}

	}

	.login-box-item {
		width: 560rpx;
		height: 120rpx;
		margin: 0 auto;
		border-bottom: 1rpx solid #DFDFDD;
		margin-bottom: 6rpx;
		position: relative;

		.input-clum {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.right {
				width: 200rpx;
				display: flex;
				justify-content: flex-end;
				align-items: center;

				.forget {
					color: #bc2826;
					width: 100%;
					text-align: center;
					margin-bottom: 10px;
				}
			}
		}

		.find-password {
			padding-left: 20rpx;
			border-left: 2rpx solid #CCCCCC;
			font-size: 28rpx;
			color: #666666;
			margin-top: -15rpx;
		}

		.arrow {
			position: absolute;
			right: 0;
			top: 35rpx;
			color: #666666;
		}

		.input {
			width: 100%;
			height: 60rpx;
			line-height: 60rpx;
			font-size: 28rpx;
		}

		.input-password {
			width: 300rpx;
		}

		.title {
			width: 100%;
			height: 50rpx;
			line-height: 50rpx;
			text-align: left;

			text {
				font-size: 28rpx;
				color: #888888;
			}
		}

		.nav_icon {
			width: 55rpx;
			margin-top: -15rpx;
			color: #666666;
		}
	}
</style>
