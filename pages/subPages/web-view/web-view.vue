<template>
	<view>
		<web-view :src="url" @message="getMessage"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: '',
				title: ''
			}
		},
		onLoad(options) {
			if (options && options.url) {
				this.url = JSON.parse(decodeURIComponent(options.url));
			}
			if(options.title){
				this.title = options.title
			}
		},
		onReady(){
			uni.setNavigationBarTitle({
				title: this.title
			});
		},
		methods: {
			getMessage(event) {
				uni.showModal({
					content: JSON.stringify(event.detail),
					showCancel: false
				});
			}
		}
	}
</script>

<style>

</style>
