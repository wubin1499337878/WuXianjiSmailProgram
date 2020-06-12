/**
 * @type {string} domain 为所有域名变量
 */

// 生产

const appidType = {
	dev: 'wx09a271cded04343d',
	staging: 'wxdb2e1f9c1a7a8db1',
	production: 'wxc2f54fd68b4ab465'
}
let env = 'production';
let domain = 'https://mdealer-dev.infinitus.com.cn';
let wwwPwd = 'password123';
let staticDomain = 'https://static-cdn.infinitus.com.cn';
let token = '2eaffc2a031340cbbef51bb120c27718';
let baseImagesUrl = 'https://storageqn-staging.infinitus.com.cn/dlpm-public/jf/img/applet/'
let baseImagesUrlpublic = 'https://storageqn-staging.infinitus.com.cn/dlpm-public/jf/img/'
let robotUrl = 'https://robot-staging.infinitus.com.cn'

// 签名key
//uim key
let appKeyUim = 'openapi_cc';
let uimSignKey = 'openapi_cc';
//gateway key
let appKeyGataway = 'openapi_cc';
let gatawaySignKey = "5OOD}wUd-9}73iJU7xDe:t]g'0rSFt";
let weappAppId = appidType[env];
let addressKey = 'HFFBZ-T5ICG-QKXQF-IPZ57-JC375-LKFBQ'; // 腾讯地址key
const accountInfo = uni.getAccountInfoSync();
const appid = accountInfo.miniProgram.appId;
if (appid === appidType.dev) {
	// 工具或者真机 开发环境
	console.log('开发环境');
	env = 'dev';
} else if (appid === appidType.staging) {
	// 测试环境(体验版)
	console.log('准生产环境');
	env = 'staging';
} else if (appid === appidType.production) {
	// 正式环境
	console.log('生产环境');
	env = 'production';
}

switch (env) {
	case 'dev': // 开发环境
		domain = 'https://mdealer-dev.infinitus.com.cn';
		wwwPwd = 'abc123';
		token = '18267c1ac10245e5906496d83f62480e';
		staticDomain = 'https://static-cdn-test.infinitus.com.cn';
		appKeyUim = 'openapi_cc';
		uimSignKey = 'openapi_cc';
		appKeyGataway = 'openapi_cc';
		gatawaySignKey = "5OOD}wUd-9}73iJU7xDe:t]g'0rSFt";
		weappAppId = appidType[env];
		addressKey = 'OEXBZ-TH5WX-YY347-7EJVK-FSCKQ-QEFL6';
		robotUrl = 'https://robot-staging.infinitus.com.cn'
		break;
		// case 'test': // 测试环境
		//   domain = 'https://mdealer-test.infinitus.com.cn';
		//   wwwPwd = 'abc123';
		//   token = 'fa11a46b780f4fe8ba0783a742e2e906';
		//   staticDomain = 'https://static-cdn-test.infinitus.com.cn';
		//   uimSignKey = 'wechat-weapp-mall';
		//   gatawaySignKey = 'gateway-weapp';
		//   weappAppId = appidType[env];
		//   addressKey = 'OEXBZ-TH5WX-YY347-7EJVK-FSCKQ-QEFL6';
		//   appKeyGataway = 'gateway-weapp';
		//   appKeyUim = 'wechat-weapp-mall';
		//   break;
	case 'staging': // 准生产
		domain = 'https://mdealer-staging.infinitus.com.cn';
		wwwPwd = 'abc123';
		token = '18267c1ac10245e5906496d83f62480e';
		staticDomain = 'https://static-cdn-test.infinitus.com.cn';
		uimSignKey = 'wechat-weapp-mall';
		gatawaySignKey = 'gateway-weapp';
		weappAppId = appidType[env];
		addressKey = '7VRBZ-WEYKX-WJG45-TCL54-U7ZE6-GOBXD';
		appKeyGataway = 'gateway-weapp';
		appKeyUim = 'wechat-weapp-mall';
		break;
	default:
		break;
}
export {
	domain,
	wwwPwd,
	token,
	staticDomain,
	uimSignKey,
	gatawaySignKey,
	weappAppId,
	addressKey,
	appKeyGataway,
	appKeyUim,
	baseImagesUrl,
	baseImagesUrlpublic,
	robotUrl
};
