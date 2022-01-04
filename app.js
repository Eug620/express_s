/* 
 * @Author       : Eug
 * @Date         : 2020-11-23 15:37:56
 * @LastEditTime : 2022-01-04 18:38:11
 * @LastEditors  : Eug
 * @Descripttion : Descripttion
 * @FilePath     : /express_s/app.js
 */

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// const cors = require('cors');
var auth = require('./lib/auth')

var indexRouter = require('./routes/index');
var bodyParser = require('body-parser');
var Event = require('./event');
var Libs = require('./utils/libs');
var token = require("./utils/token")
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
  console.log(`${Date.now()}:来自${req.connection.remoteAddress} 访问了 ${req.method}-${req.url}。参数是：${req.query},携带cookie:${req.headers.cookie}`);
  res.header('Access-Control-Allow-Origin', req.headers.origin); //需要显示设置来源
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, test, x-token');
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Credentials', true); //带cookies
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(Libs.UPDATE_INTERFACE);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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

app.use(bodyParser.json({ limit: '1mb' }));  //body-parser 解析json格式数据
app.use(bodyParser.urlencoded({            //此项必须在 bodyParser.json 下面,为参数编码
  extended: true
}));
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
