/* 
 * @Author       : Eug
 * @Date         : 2021-03-25 10:41:07
 * @LastEditTime : 2021-03-25 14:21:44
 * @LastEditors  : Eug
 * @Descripttion : Descripttion
 * @FilePath     : /express_s/routes/RouteArticle.js
 */
var express = require('express')
var router = express.Router()
var { SQL_TABLE_NAME } = require('../lib/const')
const UUID = require('uuid')
const { SEARCHALL, PARSER, ADD, DELETE } = require('../utils')

// 文章列表
router.get('/getArticleList', function (req, res, next) {
  SEARCHALL(SQL_TABLE_NAME.article, (results) => {
    res.json({ code: 200, result: results })
  })
})

// 新增文章
router.post('/createArticle', function (req, res, next) {
  const { article_title, article_describe, article_content, author } = PARSER(req.body)
  const timer = Date.parse(new Date())
  if ( !article_title || !article_describe || !article_content || !author) {
    res.json({ code: 403, result: { msg: '参数缺失!' } })
  } else {
    ADD(SQL_TABLE_NAME.article, "article_id, article_title, article_describe, article_content, author, page_views, create_time", `'${UUID.v4()}', ${article_title}, ${article_describe}, ${article_content}, ${author}, ${0}, ${timer}`, (results, fields) => {
      res.json({ code: 200, result: { msg: 'create article success' } })
    })
  }
})

// 删除文章
router.post('/deleteArticle', function (req, res, next) {
  const { article_id } = PARSER(req.body)
  if (article_id) {
    DELETE(SQL_TABLE_NAME.article, "article_id = " + article_id, (results) => {
      res.json({ code: 200, result: { msg: 'delete article success' } })
    })
  } else {
    res.json({ code: 403, result: { msg: '参数缺失' } })
  }
})

module.exports = router

