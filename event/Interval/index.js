/* 
 * @Author       : Eug
 * @Date         : 2021-01-04 18:02:39
 * @LastEditTime : 2021-02-19 18:24:09
 * @LastEditors  : Eug
 * @Descripttion : Descripttion
 * @FilePath     : /express_s/event/Interval/index.js
 */

const schedule = require('node-schedule');
var { SQL_TABLE_NAME } = require('../../lib/const')
const { SEARCHALL, ADD, REFRESH } = require('../../utils')
const { TableInterfaceField } = require('../../utils/interface.log')

module.exports = (app) => {
  //每月1号开始记录上月信息秒定时执行一次:
  schedule.scheduleJob('1 0 0 1 * *',() => {
    SEARCHALL(SQL_TABLE_NAME.interface, (results) => {
        const LOGDATE = new Date(Date.parse(new Date()) - 3000).toLocaleDateString() + ""
        const DATASTR = []
        results.forEach(interface => {
          const interfaceStr = []
          TableInterfaceField.forEach(field => {
            interfaceStr.push(interface[field])
          })
          DATASTR.push('(' + interfaceStr.join(',') + ')')
        })
        const LOGDATA = DATASTR.join('|')
        ADD(SQL_TABLE_NAME.interface_log, "log_data, log_date", `"${LOGDATA}", "${LOGDATE}"`, (results, fields) => {
            console.log('The interface call information of this month is recorded successfully')
            REFRESH(SQL_TABLE_NAME.interface, 'request', 0, () => {
              console.log('Refresh Table_interface success')
            })
        })
    })
  })
}