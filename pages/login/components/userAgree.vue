<template>
	<view class="info">
		<text class="info_break">登录/注册表示同意</text>
		<text class="red">《</text>
		<text class="info_type word" @click="jump" data-type='agree'>用户协议</text>
		<text class="red">》</text>
		<text class="info_type">和</text>
		<text class="red">《</text>
		<text class="info_type word" @click="jump" data-type='agree'>隐私权政策</text>
		<text class="red">》</text>
	</view>
</template>

<script>
	import { domain } from '../../assets/js/env.js';
	import util from '../utils/util.js'
	export default {
		name: 'userAgree',
		data() {
			return {
				url: ''
			}
		},
		methods: {
			jump() {
				const anyMouseToken = util.getAnonymousToken();
				var miniprogram = true;
				const mproductUrl =
					`${domain}/html/dealerMember/register.html#/agreement?miniToken=${anyMouseToken}&miniprogram=${miniprogram}`;
				this.common.openUrl({
					url:mproductUrl,
					inWhiteList:true,
					isExternal:true
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.info {
		color: #333333;
		width: 100%;
		position: absolute;
		left: 0;
		bottom: 3%;
		font-size: 28rpx;
		text-align: center;

		.info_break {
			margin-right: 5px;
		}

		.info_type.word {
			color: #BC2826;
			text-decoration: underline;
		}

		.red {
			color: #BC2826;
		}
	}
</style>
