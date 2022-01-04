/* 
 * @Author       : Eug
 * @Date         : 2022-01-04 17:06:54
 * @LastEditTime : 2022-01-04 17:34:59
 * @LastEditors  : Eug
 * @Descripttion : Descripttion
 * @FilePath     : /express_s/utils/token.js
 */
const jwt = require("jsonwebtoken")
const signkey = 'test_chat_token_wtf'

exports.setToken = (username) => {
  return new Promise((resolve, reject) => {
    // sing接收的第一个参数为一个对象（可自定义），否侧报错：jwt malformed
    const token = jwt.sign({
      username
    }, signkey, { expiresIn: '1h' });
    resolve(token);
  })
}

exports.verToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, signkey, (err, result) => {
      // 网上有些教程此处使用 token.split('.')[1],无法校验,源码中已经做了处理
      // var parts = jwtString.split('.');

      // if (parts.length !== 3){
      //    return done(new JsonWebTokenError('jwt malformed'));
      // }
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}