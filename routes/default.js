/*
 * @Author        : yeyuhang
 * @Date          : Do not edit
 * @LastEditTime  : Do not Edit
 * @LastEditors   : yeyuhang
 * @Descripttion  : Descripttion
 */

var express = require('express')
var router = express.Router()
var SQL_TABLE_NAME = require('./db.tableName')
var db = require('../db')
const { PARSER, UPDATE, SEARCH, SEARCHALL, ADD, DELETE } = require('../utils')

// 各接口调用信息
router.get('/getInterfaceDetail', function (req, res, next) {
    SEARCH(SQL_TABLE_NAME.interface, "name = 'getInterfaceDetail'",(detail) => {
        UPDATE(SQL_TABLE_NAME.interface, `request = ${detail[0].request + 1}`, "name = 'getInterfaceDetail'")
       })
    SEARCHALL(SQL_TABLE_NAME.interface, res)
})
// 新增接口调用信息
router.post('/addInterfaceDetail', function (req, res, next) {
    SEARCH(SQL_TABLE_NAME.interface, "name = 'addInterfaceDetail'",(detail) => {
        UPDATE(SQL_TABLE_NAME.interface, `request = ${detail[0].request + 1}`, "name = 'addInterfaceDetail'")
    })
    const { belong, name } = PARSER(req.body)
    if (belong && name) {
        ADD(SQL_TABLE_NAME.interface, "name, belong, request", `${name}, ${belong}, 0`, (results, fields) => {
            res.json({ code: 200, result: { msg: 'success' } })
        })
    } else {
        res.json({ code: 403, result: { msg: 'password and userName is require!' } })
    }
})
// 更新接口调用信息
router.post('/updateInterfaceDetail', function (req, res, next) {
    SEARCH(SQL_TABLE_NAME.interface, "name = 'updateInterfaceDetail'",(detail) => {
        UPDATE(SQL_TABLE_NAME.interface, `request = ${detail[0].request + 1}`, "name = 'getInterfaceDetail'")
    })
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
    SEARCH(SQL_TABLE_NAME.interface, "name = 'deleteInterfaceDetail'",(detail) => {
        UPDATE(SQL_TABLE_NAME.interface, `request = ${detail[0].request + 1}`, "name = 'getInterfaceDetail'")
    })
    const { id } = PARSER(req.body)
    if (id) {
        DELETE(SQL_TABLE_NAME.interface, "id = " + id, (results, fields) => {
            res.json({ code: 200, result: { msg: 'delete InterfaceDetail success' } })
        })
    } else {
        res.json({ code: 403, result: { msg: '参数缺失' } })
    }
})

module.exports = router
