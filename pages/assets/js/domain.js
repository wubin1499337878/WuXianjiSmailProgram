const { domain, token ,wwwPwd} = require('./env')
const mdealerUrl = domain;
const gatewayUrl = mdealerUrl.replace('//mdealer', '//gateway');
const uim = mdealerUrl.replace('//mdealer', '//uim');
module.exports = {
  gatewayUrl,
  mdealerUrl,
  token,
  uim
}