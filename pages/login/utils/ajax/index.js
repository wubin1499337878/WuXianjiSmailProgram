'use strict';

import util from '../util.js' 
import request from '../../../utils/js/request.js'
import interceptor from './interceptors.js'
import config from '../../../assets/js/config.js'

const Ajax = (option) => {
	return AjaxFn(option)
}

Ajax.post = (...option) => {
	const parament = util._formatParameter('post', ...option);
	parament.method = 'post';
	return Ajax(parament);
}

Ajax.get = (...option) => {
	const parament = util._formatParameter('get', ...option);
	parament.method = 'get';
	return Ajax(parament);
}

const AjaxFn = (option) => {
	const method = typeof option === String ? option : null;
	let parament = util._formatParameter(option);
	parament.method = method || parament.method;
	
	//请求前拦截-添加参数
	if (parament.isIntercept) {
		parament = AjaxFn.interceptors.request(parament)
	}


	return new Promise((res, rej) => {
		request(parament).then(data => {
			res(AjaxFn.interceptors.response({parament,data}));
		}).catch(error => {
			rej(AjaxFn.interceptors.response({parament,error}));
		});
	});
}

// 前后拦截
AjaxFn.interceptors = {};

// 拦截器
AjaxFn.interceptors.request = config => {
	return interceptor.before(config);
};

AjaxFn.interceptors.response = (data) => {
	return interceptor.after(data)
};




export default Ajax