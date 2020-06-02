<template>
	<view class="logo">
		<img :src="staticDomain + '/logo2.png'" class="img" />
	</view>
</template>

<script>
	import { staticDomain } from '../../assets/js/env.js';
	export default {
		name:'logo',
		data(){
			return {
				staticDomain : `${staticDomain}/images/mall-images`
			}
		}
	}
</script>

<style lang="less" scoped>
	.logo {
		width: 162rpx;
		height: 162rpx;
		padding-top: 100rpx;
		margin: 0 auto 197rpx auto;
		.img {
			max-width: 100%;
			max-height: 100%;
		}
	}
</style>
