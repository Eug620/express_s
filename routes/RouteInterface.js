/* 
 * @Author       : Eug
 * @Date         : 2021-01-19 11:32:06
 * @LastEditTime : 2021-10-12 18:40:15
 * @LastEditors  : Eug
 * @Descripttion : Descripttion
 * @FilePath     : /express_s/routes/RouteInterface.js
 */

var express = require('express')
var router = express.Router()
var { SQL_TABLE_NAME } = require('../lib/const')
const { PARSER, UPDATE, SEARCHALL, ADD, DELETE } = require('../utils')
const UUID = require('uuid')

// 各接口调用信息
router.get('/getInterfaceDetail', function (req, res, next) {
    SEARCHALL(SQL_TABLE_NAME.interface, 'id ASC', (results) => {
        res.json({ code: 200, result: results })
    })
})

// 新增接口调用信息
router.post('/addInterfaceDetail', function (req, res, next) {
    const { belong, name } = PARSER(req.body)
    if (belong && name) {
        const interface_id = UUID.v4()
        ADD(SQL_TABLE_NAME.interface, "id, name, belong, request", `'${interface_id}', ${name}, ${belong}, 0`, (results, fields) => {
            res.json({ code: 200, result: { msg: 'success' } })
        })
    } else {
        res.json({ code: 403, result: { msg: 'password and userName is require!' } })
    }
})

// 更新接口调用信息
router.post('/updateInterfaceDetail', function (req, res, next) {
    const { belong, name, id } = PARSER(req.body)
    if (belong && name && id) {
        UPDATE(SQL_TABLE_NAME.interface, `belong = ${belong}`, "id = " + id)
        UPDATE(SQL_TABLE_NAME.interface, `name = ${name}`, "id = " + id)
        res.json({ code: 200, result: { msg: 'update InterfaceDetail success' } })
    } else {
        res.json({ code: 403, result: { msg: '参数缺失' } })
    }
})

// 删除接口调用信息
router.post('/deleteInterfaceDetail', function (req, res, next) {
    const { id } = PARSER(req.body)
    if (id) {
        DELETE(SQL_TABLE_NAME.interface, "id = " + id, (results, fields) => {
            res.json({ code: 200, result: { msg: 'delete InterfaceDetail success' } })
        })
    } else {
        res.json({ code: 403, result: { msg: '参数缺失' } })
    }
})

// 接口日志信息列表
router.get('/getInterfaceLog', function (req, res, next) {
    SEARCHALL(SQL_TABLE_NAME.interface_log, 'log_date ASC', (results) => {
        const DATA = results.map(interfaceData => {
            try {
                interfaceData['log_data'] = JSON.parse(interfaceData['log_data'])
                return interfaceData
            } catch (error) {
                return interfaceData
            }
        })
        res.json({ code: 200, result: DATA })
    })
})


module.exports = router
