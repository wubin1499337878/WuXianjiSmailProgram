
const { gatewayUrl, mdealerUrl, uim } = require('./domain');

const config = {
  /**
     * 登录接口
     */
  'login': `${uim}/oauth20/wechatToken`,
	//判断用户是否已经绑卡
	'typeAndUserNo':`${gatewayUrl}/api/common/user/typeAndUserNo`,
	//获取用户信息
	'getUserInfo': `${uim}/oauth20/profile`,
	// 短信验证码
	'getMsmCode': `${uim}/oauth20/sendmobilecode`,
	// 注册时验证手机号是否可用
	'checkMobilePhone': `${gatewayUrl}/api/common/user/customer/checkMobilePhone`,
	'checkMobilePhoneNew':  `${gatewayUrl}/api/myaccount/dealer/guest`,
	/**
	   * 智能小极
	   */
	'xiaoJi': 'http://v4u.faqrobot.net/robot/infinitusWechat.html?sysNum=3000000&&receiveId=&sourceId=3'
};

export default config 
