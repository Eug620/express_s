/* 
 * @Author       : Eug
 * @Date         : 2022-01-21 15:43:22
 * @LastEditTime : 2022-01-21 17:01:45
 * @LastEditors  : Eug
 * @Descripttion : Descripttion
 * @FilePath     : /express_s/routes/RouteLogs.js
 */
var fs = require('fs')
var path = require('path')
var express = require('express')
var router = express.Router()
const { PARSER } = require('../utils')

const logsPath = path.resolve(__dirname, '../logs')
// 日志列表
router.get('/all', function (req, res, next) {
  try {
    const logsList = fs.readdirSync(logsPath)
    res.json({ code: 200, result: logsList })
  } catch (error) {
    res.json({ code: 500, msg: `${error}` })
  }
})

// 日志详情
router.get('/detail', function (req, res, next) {
  try {
    const { name } = PARSER(req.query)
    const detailStr = fs.readFileSync(`${logsPath}/${name}`,{encoding:'utf-8'})
    const detailList = detailStr.split('\n')
    res.json({ code: 200, result: detailList.filter(v=>v) })
  } catch (error) {
    res.json({ code: 500, msg: `${error}` })
  }
})

// 日志删除
router.get('/delete', function (req, res, next) {
  try {
    const { name } = PARSER(req.query)
    fs.rmSync(`${logsPath}/${name}`,{force: true})
    res.json({ code: 200, result: '删除成功' })
  } catch (error) {
    res.json({ code: 500, msg: `${error}` })
  }
})

module.exports = router
