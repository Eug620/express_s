/* 
 * @Author       : Eug
 * @Date         : 2022-01-05 12:02:05
 * @LastEditTime : 2022-01-05 12:05:45
 * @LastEditors  : Eug
 * @Descripttion : Descripttion
 * @FilePath     : /express_s/token.js
 */
var auth = require('./lib/auth')
var token = require("./utils/token")

module.exports = (app) => {
  app.use((req, res, next) => {
    const URL = req.url
    if (!auth.interface_list.includes(URL)) {
      // 登录接口无需校验
      return next()
    }
    
    // 获取token值
    const authorization = req.headers['authorization'];
  
    if (authorization === "undefined") {
      return res.json({
        code: 401,
        msg: '暂无权限'
      })
    } else {
      // 验证token
      token.verToken(authorization).then((data) => {
          req.data = data;
          return next();
      }).catch((error) => {
          return res.json({
            code: 401,
            msg: '暂无权限'
          });
      })
    }
  })
}