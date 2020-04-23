<template>
	<!-- <web-view src="https://robot-staging.infinitus.com.cn/robot/infinitusApp.html?sysNum=3000000&dealerNO=335667488&timestamp=1567302307808&hashcode=A0C71B30D7791A691EB2540AC78714BE3000000C0000000000066315673023078084CE6DE6BADA83A2556BFA7409A4585A7A03B3C8A42449ED9"></web-view> -->
	<!-- <web-view src="http://v4u.faqrobot.net/h5/1/Love.html"></web-view> -->
		<web-view :src="url" :progress="false"></web-view>
</template>

<script>
	export default {
		data() {
			return {
				url : ''
			}
		},
		onLoad(val) {
			console.log(val);
		     this.url = decodeURIComponent(val.url);
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
