/* 
 * @Author       : Eug
 * @Date         : 2021-01-19 11:32:06
 * @LastEditTime : 2022-01-11 19:33:08
 * @LastEditors  : Eug
 * @Descripttion : Descripttion
 * @FilePath     : /express_s/routes/RouteInterface.js
 */

var express = require('express')
var router = express.Router()
var { SQL_TABLE_NAME } = require('../lib/const')
var upload = require('../lib/upload')
const { PARSER, UPDATE, SEARCHALL, ADD, DELETE } = require('../utils')
const UUID = require('uuid')

// 各接口调用信息
router.get('/getInterfaceDetail', function (req, res, next) {
    try {
        SEARCHALL(SQL_TABLE_NAME.interface, 'id ASC', (results) => {
            res.json({ code: 200, result: results })
        })
    } catch (error) {
        res.json({ code: 500, msg: `${error}` })
    }
})

// 新增接口调用信息
router.post('/addInterfaceDetail', function (req, res, next) {
    try {
        const { belong, name } = PARSER(req.body)
        if (belong && name) {
            const interface_id = UUID.v4()
            ADD(SQL_TABLE_NAME.interface, "id, name, belong, request", `'${interface_id}', ${name}, ${belong}, 0`, (results, fields) => {
                res.json({ code: 200, result: { msg: '新增成功!' } })
            })
        } else {
            res.json({ code: 403, result: { msg: '参数缺失!' } })
        }
    } catch (error) {
        res.json({ code: 500, msg: `${error}` })
    }
})

// 更新接口调用信息
router.post('/updateInterfaceDetail', function (req, res, next) {
    try {
        const { belong, name, id } = PARSER(req.body)
        if (belong && name && id) {
            UPDATE(SQL_TABLE_NAME.interface, `belong = ${belong},name = ${name}`, "id = " + id)
            res.json({ code: 200, result: { msg: '更新成功!' } })
        } else {
            res.json({ code: 403, result: { msg: '参数缺失!' } })
        }
    } catch (error) {
        res.json({ code: 500, msg: `${error}` })
    }
})

// 删除接口调用信息
router.post('/deleteInterfaceDetail', function (req, res, next) {
    try {
        const { id } = PARSER(req.body)
        if (id) {
            DELETE(SQL_TABLE_NAME.interface, "id = " + id, (results, fields) => {
                res.json({ code: 200, result: { msg: '删除成功!' } })
            })
        } else {
            res.json({ code: 403, result: { msg: '参数缺失!' } })
        }
    } catch (error) {
        res.json({ code: 500, msg: `${error}` })
    }
})

// 接口日志信息列表
router.get('/getInterfaceLog', function (req, res, next) {
    try {
        const { valid_from, valid_to } = PARSER(req.query)
        SEARCHALL(
            SQL_TABLE_NAME.interface_log + (valid_from && valid_to ? ` WHERE log_date <= '${valid_to}' AND log_date >= '${valid_from}'` : ''), 
            'log_date ASC', 
            (results) => {
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
    } catch (error) {
        res.json({ code: 500, msg: `${error}` })
    }
})

router.post('/upload', upload.single('data'),(req, res, next) => {
    res.json({ code: 200, msg: '上传成功'})
})

module.exports = router
