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
				options: ''
			}
		},
		onLoad(options) {
			this.options = options
			if (options && options.url) {
				this.url = JSON.parse(decodeURIComponent(options.url));
			}
		},
		onReady() {
			if(this.options.title){
				uni.setNavigationBarTitle({
					title: this.options.title
				});
			}
		},
		onShow() {
			if (this.options.hideHomeButton) {
				uni.hideHomeButton()
			}
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
