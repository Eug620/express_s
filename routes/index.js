/*
 * @Author        : yeyuhang
 * @Date          : Do not edit
 * @LastEditTime  : Do not Edit
 * @LastEditors   : yeyuhang
 * @Descripttion  : Descripttion
 */

var userRouter = require('./user');
var defaultRouter = require('./default');
var imageRouter = require('./image');

module.exports = (app) => {
  app.use('/', defaultRouter)
  app.use('/user', userRouter)
  app.use('/image', imageRouter)
};
