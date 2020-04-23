<script>
	export default {
		onLaunch: function (options) {
			//#ifdef MP-WEIXIN 
			console.log("options.referrerInfo"+options.referrerInfo.extraData)
			//#endif
		},
		onShow: function (options) {
			//#ifdef MP-WEIXIN 
			console.log(options.referrerInfo.extraData)
			//#endif 
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
