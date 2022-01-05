/* 
 * @Author       : Eug
 * @Date         : 2022-01-05 11:57:58
 * @LastEditTime : 2022-01-05 11:59:03
 * @LastEditors  : Eug
 * @Descripttion : Descripttion
 * @FilePath     : /express_s/loger.js
 */
var FileStreamRotator = require('file-stream-rotator');
var logger = require('morgan');
var fs=require('fs');

module.exports = (app) => {
  //设置日志文件目录
  var logDirectory = __dirname + '/logs';
  //确保日志文件目录存在 没有则创建
  fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

  //创建一个写路由
  var accessLogStream = FileStreamRotator.getStream({
    filename: logDirectory + '/accss-%DATE%.log',
    frequency: 'daily',
    verbose: false
  })
  app.use(logger('combined', { stream: accessLogStream }));
}