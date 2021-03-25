/* 
 * @Author       : Eug
 * @Date         : 2020-11-19 10:45:35
 * @LastEditTime : 2021-03-25 12:16:10
 * @LastEditors  : Eug
 * @Descripttion : Descripttion
 * @FilePath     : /express_s/routes/index.js
 */

var RouteUser = require('./RouteUser');
var RouteInterface = require('./RouteInterface');
var RouteImage = require('./RouteImage');
var RouteCity = require('./RouteCity');
var RouteArticle = require('./RouteArticle');

module.exports = (app) => {
  app.use('/', RouteInterface)
  app.use('/user', RouteUser)
  app.use('/image', RouteImage)
  app.use('/city', RouteCity)
  app.use('/article', RouteArticle)
};
