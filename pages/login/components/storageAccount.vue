<template>
	<view class="stroge-phone-ctn" v-if="IsAccount&&storageLoginAccoutArray.length>0">
		<view class="stroge-phone">
			<view class="list" v-for="(item,index) in storageLoginAccoutArray" :key="index" @click="bindAccout(item.account)">
					<uni-icons type="contact" color="#8f8f94" size="18" name="contact"></uni-icons>
					<text class="phone-num">{{item.account}}</text>
					<text class="name">{{item.lastName}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcons from '@/components/uni-icons/uni-icons.vue'

	export default {
		name: 'storageAccount',
		props: ['IsAccount','type'],
		components: {
			uniIcons
		},
		data() {
			return {
			}
		},
		computed:{
			storageLoginAccoutArray(){
				let storageLoginAccoutData = uni.getStorageSync('loginAccout') || []
				if(this.type == 'phone'){
					storageLoginAccoutData = storageLoginAccoutData.filter((item)=>{
						return this.isTelphone(item.account)
					})
				}
				return storageLoginAccoutData
			}
		},
		methods: {
			bindAccout(val) {
				let that = this
				setTimeout(() => {
					that.phoneVal = val
					that.IsAccount = false
					var obj = {
						'phoneVal' : val,
						'IsAccount' : false
					}
					this.$emit('selectAccount',obj);
				})
			},
			isTelphone(phone) {
			  const reg = /^1\d{10}/;
			  return reg.test(phone);
			},
		}
	}
</script>

<style lang="less" scoped>
	.stroge-phone-ctn {
		position: relative;
		width: 100%;
		.stroge-phone {
			position: absolute;
			top: 0;
			left: 0;
			z-index: 4;
			width: 100%;
			height: 212rpx;
			background: #fff;
			box-shadow: 0px 5px 8px #888888;
			overflow-y: scroll;
			padding-top: 15rpx;
			.list {
				width: 100%;
				padding: 15rpx;
				display: flex;
				justify-content: flex-start;
				font-size: 28rpx;
				color: #484848;
				.phone-num,
				.name{
					margin-left: 15rpx;
				}
			}
		}
	}	
</style>
