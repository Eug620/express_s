/* 
 * @Author       : Eug
 * @Date         : 2022-01-14 17:11:25
 * @LastEditTime : 2022-01-14 17:48:08
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
    SEARCHALL(
      SQL_TABLE_NAME.user,
      'create_time DESC',
      (user_list) => {
        const userMap = Object.fromEntries(
          user_list.map(({user_id, user_name}) => [user_id, user_name])
        )
        SEARCHALL(SQL_TABLE_NAME.information_record, 'create_time ASC', (results) => {
          const result = results.map(item => {
            item['message'] = BUFFER_UTF8(item['message'])
            item['user_name'] = userMap[item['user_id']]
            return item
          })
          res.json({ code: 200, result })
        })
      }
    )
  } catch (error) {
    res.json({ code: 500, msg: `${error}` })
  }
})

module.exports = router


