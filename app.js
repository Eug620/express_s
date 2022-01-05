/* 
 * @Author       : Eug
 * @Date         : 2020-11-23 15:37:56
 * @LastEditTime : 2022-01-05 12:21:34
 * @LastEditors  : Eug
 * @Descripttion : Descripttion
 * @FilePath     : /express_s/app.js
 */

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
// var cors = require('cors');
var bodyParser = require('body-parser');

var loger = require('./loger')
var token = require('./token')
var indexRouter = require('./routes/index');
var Event = require('./event');
var Libs = require('./utils/libs');
var app = express();

// app.use(cors());
// app.all('*', function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header('Access-Control-Allow-Headers', "*");
//   res.header("Access-Control-Allow-Methods", "*");
//   res.header("Access-Control-Allow-Credentials", true);
//   next();
// });

// 处理跨域问题
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin); //需要显示设置来源
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, test, x-token, authorization');
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Credentials', true); //带cookies
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(Libs.UPDATE_INTERFACE);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json({ limit: '1mb' }));  //body-parser 解析json格式数据
app.use(bodyParser.urlencoded({            //此项必须在 bodyParser.json 下面,为参数编码
  extended: true
}));
token(app)
loger(app)
// 抽取路由
indexRouter(app)
Event(app)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
