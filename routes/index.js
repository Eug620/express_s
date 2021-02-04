/* 
 * @Author       : Eug
 * @Date         : 2020-11-19 10:45:35
 * @LastEditTime : 2021-02-04 11:13:43
 * @LastEditors  : Eug
 * @Descripttion : Descripttion
 * @FilePath     : /express_s/routes/index.js
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
