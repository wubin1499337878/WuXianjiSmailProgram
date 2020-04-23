<template>
	<!-- <web-view src="http://v4u.faqrobot.net/h5/1/Love.html"></web-view> -->
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		<button @click="initRobot">机器人初始化</button>
		<button @click="gotoChatWithRobot">有问题找小极</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad(options) {
			for (let key in options) {
				let val = options[key];
				this.initParams += '&' + (key + '=' + val)
			}
			let that = this;
			//#ifdef MP-WEIXIN 
			wx.getSystemInfo({
				success: function(res) {
					if (res.environment != undefined) {
						console.log(res.environment);
						wx.qy.login({
							success: function(res) {
								if (res.code) {
									that.code = res.code;
									that.initParams += ('&code=' + that.code)
									console.log("code:"+that.code);
								} else {
									console.log('获取用户登录态失败！' + res.errMsg)
								}
							}
						});
					} else {
						console.log('非企业微信！');
						wx.login({
							success: function(res) {
								if (res.code) {
									that.code = res.code;
									that.initParams += ('&code=' + that.code)
									console.log("code:"+that.code);
								} else {
									console.log('获取用户登录态失败！' + res.errMsg)
								}
							}
						});
					}
				}
			});
			//#endif 
		},
		methods: {
			initRobot() {
				this.$HTTP({
				  method: 'GET',
				  url: '',
				  data: {
					  "sysNum": "15680228584854175",
					  "sourceId": "30373",
					  "s": "p",
				  },
				}).then((res) =>{
				  console.log(res)
				}
				// (err)=>{ console.log(err) }
				)
			},
			gotoChatWithRobot() {
				console.log("this.initParams:"+this.initParams)
				let url = encodeURIComponent(
					"https://demo.faqrobot.net/robot/h5chat.html?sysNum=15680228584854175&receiveId=&sourceId=30373" + this.initParams
				);
				uni.redirectTo({
					url: '../robot/robot?url=' + url
				});
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
