/* 
 * @Author       : Eug
 * @Date         : 2022-01-14 17:11:25
 * @LastEditTime : 2022-01-14 17:23:16
 * @LastEditors  : Eug
 * @Descripttion : Descripttion
 * @FilePath     : /express_s/routes/RouteInformation.js
 */
var express = require('express')
var router = express.Router()
var { SQL_TABLE_NAME } = require('../lib/const')
const { SEARCHALL, BUFFER_UTF8 } = require('../utils')



// 用户列表
router.get('/all', function (req, res, next) {
  try {
    SEARCHALL(SQL_TABLE_NAME.information_record, 'create_time DESC', (results) => {
      const result = results.map(item => {
        item['message'] = BUFFER_UTF8(item['message'])
        return item
      })
      res.json({ code: 200, result })
    })
  } catch (error) {
    res.json({ code: 500, msg: `${error}` })
  }
})

module.exports = router


