/* 
 * @Author       : Eug
 * @Date         : 2021-02-04 11:20:39
 * @LastEditTime : 2021-02-19 18:25:11
 * @LastEditors  : Eug
 * @Descripttion : Descripttion
 * @FilePath     : /express_s/utils/libs.js
 */
var _ = require('lodash')
var { SQL_TABLE_NAME } = require('../lib/const')
const { UPDATE, SEARCH } = require('../utils')

module.exports = {
    UPDATE_INTERFACE: (req, res, next) => {
        const URL_ARRAY = _.split(req.url, '/')
        if (URL_ARRAY[URL_ARRAY.length - 1] !== 'style.css' && URL_ARRAY.length ) {
            SEARCH(SQL_TABLE_NAME.interface, `name = '${URL_ARRAY[URL_ARRAY.length - 1]}'`,(detail) => {
                if (!detail || !detail.length) {
                    next()
                } else {
                    UPDATE(SQL_TABLE_NAME.interface, `request = ${detail[0].request + 1}`, `name = '${URL_ARRAY[URL_ARRAY.length - 1]}'`)
                }
            })
        }
        next()
    }
}