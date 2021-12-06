/* 
 * @Author       : Eug
 * @Date         : 2021-12-03 18:09:49
 * @LastEditTime : 2021-12-06 16:04:14
 * @LastEditors  : Eug
 * @Descripttion : 评论相关接口
 * @FilePath     : /express_s/routes/RouteComment.js
 */

var express = require('express')
var router = express.Router()
var { SQL_TABLE_NAME } = require('../lib/const')
const UUID = require('uuid')
const {
  LEFT_JOIN,
  // SEARCHCOLUMNS,
  PARSER,
  ADD,
  // DELETE, 
  SEARCH,
  // UPDATE, 
  BUFFER_BASE64,
  BUFFER_UTF8,
  // SEARCHLIMIT 
} = require('../utils')

// 新增文章
// article_comment
router.post('/create', function (req, res, next) {
  const { article_id, pid, content, operator } = PARSER(req.body)
  const timer = Date.parse(new Date())
  const id = UUID.v4()
  if (!article_id || !pid || !content || !operator) {
    res.json({ code: 403, result: { msg: '参数缺失!' } })
  } else {
    SEARCH(SQL_TABLE_NAME.article, `article_id = '${article_id}'`, (detail) => {
      if (!detail.length) {
        res.json({ code: 403, result: { msg: '该文章不存在!' } })
      } else {
        ADD(SQL_TABLE_NAME.article_comment, "id, operator, article_id, pid, content, create_time", `'${id}', '${operator}', '${article_id}', '${pid}', '${BUFFER_BASE64(content)}', ${timer}`, (results, fields) => {
          res.json({ code: 200, result: { msg: 'create comment success' } })
        })
      }
    })
  }
})

// 文章评论All
router.get('/all', function (req, res, next) {
  const { article_id } = PARSER(req.query)
  LEFT_JOIN(
    SQL_TABLE_NAME.article_comment,
    `id, article_id, pid, content, operator, user_name, ${SQL_TABLE_NAME.article_comment}.create_time as create_time`,
    `LEFT JOIN ${SQL_TABLE_NAME.user} ON ${SQL_TABLE_NAME.user}.user_id = ${SQL_TABLE_NAME.article_comment}.operator`,
    'create_time DESC',
    `article_id = '${article_id}' and pid = '${article_id}'`,
    (results) => {
      const content_utf8 = results.map(item => {
        item['content'] = BUFFER_UTF8(item['content'])
        return item
      })
      res.json({
        code: 200, result: content_utf8
      })
    }
  )
})
module.exports = router