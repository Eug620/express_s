/* 
 * @Author       : Eug
 * @Date         : 2020-11-19 10:45:35
 * @LastEditTime : 2022-01-21 15:46:04
 * @LastEditors  : Eug
 * @Descripttion : Descripttion
 * @FilePath     : /express_s/routes/index.js
 */

var RouteUser = require('./RouteUser');
var RouteInterface = require('./RouteInterface');
var RouteImage = require('./RouteImage');
var RouteCity = require('./RouteCity');
var RouteArticle = require('./RouteArticle');
var RouteComment = require('./RouteComment');
var RouteInformation = require('./RouteInformation');
var RouteLogs = require('./RouteLogs');

module.exports = (app) => {
  app.use('/', RouteInterface)
  app.use('/user', RouteUser)
  app.use('/image', RouteImage)
  app.use('/city', RouteCity)
  app.use('/article', RouteArticle)
  app.use('/comment', RouteComment)
  app.use('/information', RouteInformation)
  app.use('/logs', RouteLogs)
};
