/* 
 * @Author       : Eug
 * @Date         : 2021-03-25 10:41:07
 * @LastEditTime : 2021-12-22 16:11:09
 * @LastEditors  : Eug
 * @Descripttion : Descripttion
 * @FilePath     : /express_s/routes/RouteArticle.js
 */
var express = require('express')
var router = express.Router()
var { SQL_TABLE_NAME } = require('../lib/const')
const UUID = require('uuid')
const { SEARCHCOLUMNS, PARSER, ADD, DELETE, SEARCH, UPDATE, BUFFER_BASE64, BUFFER_UTF8, SEARCHLIMIT, LEFT_JOIN } = require('../utils')

// 文章列表All
router.get('/getArticleList', function (req, res, next) {
  try {
    SEARCHCOLUMNS(
      `${SQL_TABLE_NAME.article} LEFT JOIN ${SQL_TABLE_NAME.user} ON ${SQL_TABLE_NAME.user}.user_id = ${SQL_TABLE_NAME.article}.author`,
      `article_id, user_name, article_title, article_describe, author, page_views, ${SQL_TABLE_NAME.article}.create_time as create_time, (SELECT COUNT(*) FROM ${SQL_TABLE_NAME.article_comment} WHERE article_id = ${SQL_TABLE_NAME.article}.article_id and pid = ${SQL_TABLE_NAME.article}.article_id ) as article_count`,
      'create_time DESC',
      (results) => {
        res.json({ code: 200, result: results })
      }
    )
  } catch (error) {
    res.json({ code: 500, msg: error })
  }
})

// 文章列表index
router.get('/getArticle', function (req, res, next) {
  try {
    const { size, page } = PARSER(req.query)
    SEARCHLIMIT(
      `${SQL_TABLE_NAME.article} LEFT JOIN ${SQL_TABLE_NAME.user} ON ${SQL_TABLE_NAME.user}.user_id = ${SQL_TABLE_NAME.article}.author`,
      `article_id, user_name, article_title, article_describe, author, page_views, ${SQL_TABLE_NAME.article}.create_time as create_time, (SELECT COUNT(*) FROM ${SQL_TABLE_NAME.article_comment} WHERE article_id = ${SQL_TABLE_NAME.article}.article_id and pid = ${SQL_TABLE_NAME.article}.article_id ) as article_count`,
      {size: size || 10, page: page || 1},
      'create_time DESC',
      (results) => {
        res.json({ code: 200, result: results })
      }
    )
  } catch (error) {
    res.json({ code: 500, msg: error })
  }
})

// 热门列表
router.get('/getHotArticle', function (req, res, next) {
  try {
    SEARCHLIMIT(
      `${SQL_TABLE_NAME.article} LEFT JOIN ${SQL_TABLE_NAME.user} ON ${SQL_TABLE_NAME.user}.user_id = ${SQL_TABLE_NAME.article}.author`,
      `article_id, user_name, article_title, article_describe, author, page_views, ${SQL_TABLE_NAME.article}.create_time as create_time, (SELECT COUNT(*) FROM ${SQL_TABLE_NAME.article_comment} WHERE article_id = ${SQL_TABLE_NAME.article}.article_id and pid = ${SQL_TABLE_NAME.article}.article_id ) as article_count`,
      {size: 10, page: 1},
      'page_views DESC',
      (results) => {
        res.json({ code: 200, result: results })
      }
    )
  } catch (error) {
    res.json({ code: 500, msg: error })
  }
})

// 新增文章
router.post('/createArticle', function (req, res, next) {
  try {
    const { article_title, article_describe, article_content, user_id } = PARSER(req.body)
    const timer = Date.parse(new Date())
    const article_id = UUID.v4()
    if ( !article_title || !article_describe || !article_content) {
      res.json({ code: 403, result: { msg: '参数缺失!' } })
    } else {
      SEARCH(SQL_TABLE_NAME.user, `user_id = '${user_id}'`, (detail) => {
        if (!detail.length) {
          res.json({ code: 403, result: { msg: '该用户不存在!' } })
        } else {
          ADD(SQL_TABLE_NAME.article, "article_id, article_title, article_describe, article_content, author, page_views, create_time", `'${article_id}', '${article_title}', '${article_describe}', '${BUFFER_BASE64(article_content)}', '${user_id}', ${0}, ${timer}`, (results, fields) => {
            res.json({ code: 200, result: { msg: 'create article success' } })
          })
        }
      })
    }
  } catch (error) {
    res.json({ code: 500, msg: error })
  }
})

// 删除文章
router.post('/deleteArticle', function (req, res, next) {
  try {
    const { article_id } = PARSER(req.body)
    if (article_id) {
      DELETE(SQL_TABLE_NAME.article, "article_id = " + article_id, (results) => {
        res.json({ code: 200, result: { msg: 'delete article success' } })
      })
    } else {
      res.json({ code: 403, result: { msg: '参数缺失' } })
    }
  } catch (error) {
    res.json({ code: 500, msg: error })
  }
})

// 文章详情
router.post('/detailArticle', function (req, res, next) {
  try {
    const { article_id } = PARSER(req.body)
    if (article_id) {
      LEFT_JOIN(
        SQL_TABLE_NAME.article,
        `article_id, article_content, user_name, article_title, article_describe, author, page_views, ${SQL_TABLE_NAME.article}.create_time as create_time, (SELECT COUNT(*) FROM ${SQL_TABLE_NAME.article_comment} WHERE article_id = ${SQL_TABLE_NAME.article}.article_id and pid = ${SQL_TABLE_NAME.article}.article_id ) as article_count`,
        `LEFT JOIN ${SQL_TABLE_NAME.user} ON ${SQL_TABLE_NAME.user}.user_id = ${SQL_TABLE_NAME.article}.author`,
        null,
        `article_id = '${article_id}'`,
        (detail) => {
        if (!detail.length) {
          res.json({ code: 403, result: { msg: '该文章不存在!' } })
        } else {
          UPDATE(SQL_TABLE_NAME.article, `page_views = ${detail[0].page_views + 1}`, `article_id = '${article_id}'`, (dtl) => {
            const data = detail.map(item => {
              item.article_content = BUFFER_UTF8(item.article_content)
              return item
            })
            res.json({ code: 200, result: data[0]})
          })
        }
      })
    } else {
      res.json({ code: 403, result: { msg: '参数缺失' } })
    }
  } catch (error) {
    res.json({ code: 500, msg: error })
  }
})

module.exports = router

