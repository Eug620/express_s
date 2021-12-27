/* 
 * @Author       : Eug
 * @Date         : 2021-12-03 18:09:49
 * @LastEditTime : 2021-12-27 18:04:06
 * @LastEditors  : Eug
 * @Descripttion : 评论相关接口
 * @FilePath     : /express_s/routes/RouteComment.js
 */

var express = require('express')
var router = express.Router()
var { SQL_TABLE_NAME } = require('../lib/const')
const UUID = require('uuid')
const {
  // LEFT_JOIN,
  // SEARCHCOLUMNS,
  PARSER,
  ADD,
  SEARCHALL,
  // DELETE, 
  SEARCH,
  // UPDATE, 
  BUFFER_BASE64,
  BUFFER_UTF8,
  // SEARCHLIMIT 
} = require('../utils')

// 新增文章评论
// article_comment
router.post('/create', function (req, res, next) {
  try {
    const { article_id, pid, content, operator, tid } = PARSER(req.body)
    const timer = Date.parse(new Date())
    const id = UUID.v4()
    if (!article_id || !pid || !content || !operator) {
      res.json({ code: 403, result: { msg: '参数缺失!' } })
    } else {
      SEARCH(SQL_TABLE_NAME.article, `article_id = '${article_id}'`, (detail) => {
        if (!detail.length) {
          res.json({ code: 403, result: { msg: '该文章不存在!' } })
        } else {
          ADD(SQL_TABLE_NAME.article_comment, "id, operator, tid, article_id, pid, content, create_time", `'${id}', '${operator}', '${tid}', '${article_id}', '${pid}', '${BUFFER_BASE64(content)}', ${timer}`, (results, fields) => {
            res.json({ code: 200, result: { msg: 'create comment success' } })
          })
        }
      })
    }
  } catch (error) {
    res.json({ code: 500, msg: `${error}` })
  }
})

// 文章评论All
router.get('/all', async (req, res, next) => {
  try {
    const { article_id } = PARSER(req.query)
    let user_map = {}
    SEARCHALL(
      SQL_TABLE_NAME.user,
      'create_time DESC',
      (user_list) => {
        // 获取user all
        user_list.forEach(item => {
          user_map[item['user_id']] = item['user_name']
        })

        // 获取评论all
        SEARCH(
          SQL_TABLE_NAME.article_comment,
          `article_id = '${article_id}' order by create_time DESC`,
          (results) => {
            // 外层评论
            const OuterLayer = []
            // 内层评论
            const InnerLayer = []

            results.forEach(item => {
              item['content'] = BUFFER_UTF8(item['content'])
              item['operator_name'] = user_map[item['operator']]
              item['comment_name'] = user_map[item['tid']]
              if (item['article_id'] === article_id && item['pid'] === article_id) {
                item['children'] = []
                OuterLayer.push(item)
              } else {
                InnerLayer.push(item)
              }
            })

            OuterLayer.forEach(outer => {
              const inner_list = InnerLayer.filter(item => item.pid === outer.id)
              if (inner_list.length) outer['children'].push(...inner_list)
            })

            res.json({
              code: 200, result: OuterLayer
            })
          }
        )
      }
    )
  } catch (error) {
    res.json({
      code: 500, msg: error
    })
  }
})
module.exports = router