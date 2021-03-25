/* 
 * @Author       : Eug
 * @Date         : 2021-03-25 10:41:07
 * @LastEditTime : 2021-03-25 12:20:05
 * @LastEditors  : Eug
 * @Descripttion : Descripttion
 * @FilePath     : /express_s/routes/RouteArticle.js
 */
var express = require('express')
var router = express.Router()
var { SQL_TABLE_NAME } = require('../lib/const')
// const UUID = require('uuid')
const { SEARCHALL } = require('../utils')

// 文章列表
router.get('/getArticleList', function (req, res, next) {
  SEARCHALL(SQL_TABLE_NAME.article, (results) => {
    res.json({ code: 200, result: results })
  })
})

module.exports = router

