/*
 * @Author        : yeyuhang
 * @Date          : Do not edit
 * @LastEditTime: 2021-01-19 15:01:36
 * @LastEditors: Please set LastEditors
 * @Descripttion  : Descripttion
 */

var userRouter = require('./user');
var defaultRouter = require('./default');
var imageRouter = require('./image');
var cityRouter = require('./city');

module.exports = (app) => {
  app.use('/', defaultRouter)
  app.use('/user', userRouter)
  app.use('/image', imageRouter)
  app.use('/city', cityRouter)
};
