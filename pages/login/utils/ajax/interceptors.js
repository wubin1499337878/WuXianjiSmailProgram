import aUtil from '../util.js'
import { uimSignKey, gatawaySignKey, weappAppId, appKeyGataway, appKeyUim } from '../../../assets/js/env'

const init = (params) =>  {
  const obj = {
    method: 'GET',
    dataType: 'json',
    hideLoading: false,
    contentType: 'json'
  };
  params = {
    ...obj,
    ...params
  };
  params.header['content-type'] = 'application/json';
  params.method = params.method;
  if (params.contentType === 'form') {
    params.header['content-type'] = 'application/x-www-form-urlencoded';
  }
  // uim接口设置请求头
  if (params.contentType === 'X-Requested-With') {
    params.header['X-Requested-With'] = 'OpenAPIRequest';
  }
  if (params.method.toUpperCase() === 'POST') {
    // uim不需要这种设置
    if (!aUtil.isUim(params.url)) {
      params.data = Object.assign(params.data ? params.data : {}, {
        model: "6"
      });
    }
  } else {
    params.url.includes('?') ? params.url += '&model=6' : params.url += '?model=6';
  }
  if (params.contentType === 'json' && params.method !== 'get') {
    params.data = JSON.stringify(params.data);
  }
  return params;
}

const sigin = (option) => {
  const now = (new Date()).getTime();
  const token = aUtil.getToken() || aUtil.getAnonymousToken(now);
  const signParam = {
    app_key: appKeyGataway,
    timestamp: now,
    locale: 'zh_CN',
    format: 'json',
    sign_method: 'md5',
    access_token: token
  };
  // uim加密参数
  if (aUtil.isUim(option.url)) {
    delete signParam.access_token;
    signParam['app_key'] = appKeyUim;
    signParam['wechatToken'] = token;
  }
  option = init(option);
  const getParam = {};
  if (option.url.indexOf('?') !== -1) {
    const list = option.url.split('?')[1].split('&');
    list.map((item) => {
      const key = item.split('=')[0];
      const value = item.split('=')[1];
      getParam[key] = value;
    });
  }
  let signKey = gatawaySignKey;

  // 登录uim的 signKey
  if (aUtil.isUim(option.url)) {
    signKey = uimSignKey;
  }
  let postParam;
  if (option.method == 'post') {
    // uim不需要做这种处理
    postParam = option.contentType === 'json' ? {
      openApiBodyString: option.data
    } : option.data;
  } else {
    postParam = option.data;
  }
  const parameters = {
    ...postParam,
    ...signParam,
    ...getParam
  };
  // console.log(parameters, signKey);
  const sign = aUtil.md5Signature(parameters, signKey);
  if (option.url.indexOf('?') !== -1) {
    option.url += '&';
  } else {
    option.url += '?';
  }
  option.url = `${option.url}sign=${sign}`;
  for (const key in signParam) {
    option.url = `${option.url}&${key}=${encodeURIComponent(signParam[key])}`;
  }
  return option;
}

const before = (config) => {
	//uim签名
  if (aUtil.isUim(config.url)) {
    return sigin(config);
  }
  // gateway签名
  if (aUtil.isGateway(config.url)) {
    // 签名
    config.header['x-fcs-appoint'] = 'weapp';
    return sigin(config);
  }
  return sigin(config);
};
// 请求后拦截
const after = (res,callBack) => {
  if(res.data){
    // 成功
    const data = res.data;
    const parameter = res.parament;
    const resCode = data.statusCode;
    // let {returnObject} = data.data; resCode === 401 && data.data.exceptionCode === 'param.71'
    if (resCode === 401 && data.data.exceptionCode === 'param.71') {
           uni.removeStorageSync('token');//移除token
            const now = (new Date()).getTime();
            aUtil.getAnonymousToken(now);
            if(callBack&&typeof callBack=='function'){
                callBack()
            }
            return Promise.reject(false);
    }
    if(resCode === 503){
      uni.showToast({
        title: '目前系统访问人数较多，请稍后再试',
        icon: 'none',
        duration: 2000
      });
      return Promise.reject(data);
    }
    if(resCode === 504){
      uni.showToast({
        title: '应用系统访问超时，请稍后再试',
        icon: 'none',
        duration: 2000
      });
      return Promise.reject(data);
    }
    if(resCode === 500 || resCode === 501 || resCode === 502){
      uni.showToast({
        title: '服务端异常，请稍后再试',
        icon: 'none',
        duration: 2000
      });
      return Promise.reject(data);
    }
    if (aUtil.isUim(parameter.url)) {
      return Promise.resolve(data);
    } else if (parameter.returnAll) { // 返回所有
      return Promise.resolve(data);
    } else if (parameter.returnData) { // 返回请求内容(data部分)
      return Promise.resolve(data.data);
    }  else if (!aUtil.isGateway(parameter.url)) { // 不是gateway接口,返回内容
      return Promise.resolve(data.data);
    } else if (data.data.exceptionMessage || data.data.errorMessage) { // 统一弹出报错信息
      uni.showToast({
        title: data.data.exceptionMessage || data.data.errorMessage,
        icon: 'none',
        duration: 2000
      });
      return Promise.reject(data);
    } else if (data.data.success) { // 接口成功
      return Promise.resolve(data.data.returnObject);
    } else if(data.data.success === false){
      uni.showToast({
        title: '接口请求异常',
        icon: 'none',
        duration: 2000
      });
    } else {
      return Promise.resolve(data.data);
    }
  } else {
    // 接口请求失败
    return Promise.reject(res.error);
  }
}

const interceptor = {
	before,
	after
}

export default interceptor
