import md5 from 'md5'
import { Base64 } from 'js-base64'
const util = {
  _formatParameter() {
    let option = null;
		//判断是不是对象
    if (typeof arguments[0] !== 'string') {
      option = arguments[0];
    } else {
      option = [...arguments];
      // 是否隐藏loding框
      const [{ hideLoading } = { hideLoading: false }] = option.filter(item => {
        if (item && item.hideLoading) return item;
      });
      const [{ cancelHide } = { cancelHide: false }] = option.filter(item => {
        if (item && item.cancelHide) return item;
      });
      // 是否返回全部值
      const [{ returnAll } = { returnAll: false }] = option.filter(item => {
        if (item && item.returnAll) return item;
      });
      // 是否返回接口成功的data值
      const [{ returnData } = { returnData: false }] = option.filter(item => {
        if (item && item.returnData) return item;
      });
      // contentType
      const [{ contentType } = { contentType: 'json' }] = option.filter(item => {
        if (item && item.contentType) return item;
      });
      const [{ isIntercept } = { isIntercept: true }] = option.filter(item => {
        if (item && item.isIntercept !== undefined) return item;
      });
      option = {
        method: arguments[0],
        url: arguments[1] || {},
        data: arguments[2] || {},
        returnAll,
        returnData,
        hideLoading,
        contentType,
        isIntercept,
        cancelHide
      };
    }
    /**
     * @method get 默认get
     * @url 地址
     * @name data 传参默认空
     * @name returnAll 是否返回所有数据
     * @name returnData 是否返回接口成功的data值
     * @name hideLoading 是否不需要loading框
     * @name contentType 传参类型
     */
    const { method = 'get', url = '', data = {}, returnAll = false, returnData = false, hideLoading = false, contentType = 'json', dataType = 'json', responseType = 'text', header = { 'content-type': 'application/json' }, isIntercept = true, cancelHide = false } = option;
		const optionArry = { url, data, method, returnAll, returnData, hideLoading, contentType, dataType, responseType, header, isIntercept, cancelHide };
    return optionArry;
  },
  getToken() {
    return uni.getStorageSync('token');
  },
  // 是否调用uim
  isUim(url) {
    return url.indexOf('uim') !== -1;
  },
  // 是否gataeway
  isGateway(url) {
    return url.indexOf('://gateway') !== -1;
  },
  // 获取游客token
  getAnonymousToken(time) {
    const openId = uni.getStorageSync('wx_openid') || '';
    let token = `${time}##ANONYMOUS##${openId}`;
    token = Base64.encode(token);
    return token;
  },
  // 生成MD5
  md5Signature(parameters, secret) {
    let result = secret;
    for (const key of Object.keys(parameters).sort()) {
      result = `${result}${key}${parameters[key]}`;
    }
    result += secret;
    const keyt = md5(result).toUpperCase();
    return keyt;
  }
};

export default util
