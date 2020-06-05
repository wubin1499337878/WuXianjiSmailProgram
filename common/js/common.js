//打开外部链接
const openUrl = (obj) =>{
	let {url='',inWhiteList=false,isExternal=false,type='navigate',title='',hideHomeButton=false} = obj
	if(isExternal){
		// #ifdef APP-PLUS
		plus.runtime.openURL(url) //这里默认使用外部浏览器打开而不是内部web-view组件打开
		// #endif
		// #ifdef H5
		window.open(url)
		// #endif
		// #ifdef MP-WEIXIN
		
		if (inWhiteList) { //如果在小程序的网址白名单中，会走内置webview打开，否则会复制网址提示在外部浏览器打开
			uni[type+'To']({
				url: '/pages/subPages/web-view/web-view?url=' + encodeURIComponent(JSON.stringify(url)) + '&title=' + title + '&hideHomeButton=' + hideHomeButton
			});
		} else {
			uni.setClipboardData({
				data: url
			});
			uni.showModal({
				content: '本网址无法直接在小程序内打开。已自动复制网址，请在手机浏览器里粘贴该网址',
				showCancel: false
			});
		}
		// #endif
	}else{
		uni[type+'To']({
			url: url + '?&title=' + title + '&hideHomeButton=' + hideHomeButton
		});
	}
}

const showToast = (title)=>{
	uni.showToast({
	  title: title,
	  icon: 'none',
	  duration: 2000
	});
}

const common = {
	openUrl,
	showToast
}

export default common
