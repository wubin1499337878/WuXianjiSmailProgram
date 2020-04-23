// created by wangyong for uni-app request 2019.11.22
const baseURL = 'https://demo.faqrobot.net/servlet/appChat';
const http = (options) => {
    return new Promise((resolve, reject) => {
        uni.showLoading({
            title: '加载中...',
            mask: options.load || false // 默认遮罩出现可以继续操作
        });
        try{
            uni.request({
                url: (options.baseURL || baseURL) + options.url,
                method: options.method || 'POST', // 默认为POST请求
                data: options.data, //请求超时在manifest.json配置
                header: {
                    'v-token': '333333',
                    'Content-Type': options.header == 'form' ? 'application/x-www-form-urlencoded' : 'application/json'
                },
                success: res => {
                    resolve(res.data)
                },
                fail: (err) => {
                    reject(err.data);
                    console.log(err);
                    uni.showToast({
                        title: '请检查网络连接',
                        icon: 'none'
                    })
                    /*错误码处理
                    let code = err.data.code; 
                    switch (code) {
                        case 1000:
                            break;
                        default:
                            break;
                    } */
                },
                complete: () => {
                    uni.hideLoading();
                }
            });
        }catch(e){
            uni.hideLoading();
            uni.showToast({
                title: '服务端异常',
                icon: 'none'
            })
        }
        
    })
}

export default http