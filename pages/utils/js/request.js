const request = (option) => {
	const hideLoading = (cancelHide) => {
		if (!cancelHide) {
			uni.hideLoading();
		}
	}
	return new Promise((res, rej) => {
		if (!option.hideLoading) {
			uni.showLoading({
				title: '加载中'
			});
		}

		option.success = (data) => {
			// 关闭Loading框
			hideLoading(option.cancelHide);
			res(data);
		};

		option.fail = (error) => {
			// 关闭Loading框
			hideLoading(option.cancelHide);
			res(error);
		};

		uni.request(option);
	});
}

export default request
