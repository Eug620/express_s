/*
 * @Author: yeyuhang
 * @Date: 2020-11-19 10:45:35
 * @LastEditTime: 2020-12-29 11:00:11
 * @LastEditors: yeyuhang
 * @Descripttion: 头部注释
 */
var userRouter = require('./user');
var defaultRouter = require('./default');
var imageRouter = require('./image');

module.exports = (app) => {
  app.use('/', defaultRouter)
  app.use('/user', userRouter)
  app.use('/image', imageRouter)
};
