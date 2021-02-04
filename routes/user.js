/* 
 * @Author       : Eug
 * @Date         : 2020-11-23 15:38:02
 * @LastEditTime : 2021-02-04 11:44:13
 * @LastEditors  : Eug
 * @Descripttion : Descripttion
 * @FilePath     : /express_s/routes/user.js
 */

var express = require('express')
var router = express.Router()
var SQL_TABLE_NAME = require('./db.tableName')
var db = require('../db')
const { PARSER, UPDATE, SEARCH, SEARCHALL, DELETE, ADD } = require('../utils')
// 用户列表
router.get('/getUserList', function (req, res, next) {
    SEARCHALL(SQL_TABLE_NAME.user, (results) => {
        res.json({ code: 200, result: results })
    })
})
// 新增用户
router.post('/createUser', function (req, res, next) {
    const { userName, password, email } = PARSER(req.body)
    const timer = Date.parse(new Date())
    // 账号名不可重复
    SEARCH(SQL_TABLE_NAME.user, `name = ${userName}`,(detail) => {
        if (detail.length) {
            res.json({ code: 403, result: { msg: '该用户名已被使用!' } })
        } else if (userName && password) {
            ADD(SQL_TABLE_NAME.user, "name, password, email, create_time, update_time", `'${userName}', '${password}', ${email || null}, ${timer}, ${timer}`, (results, fields) => {
                res.json({ code: 200, result: { msg: 'create user success' } })
            })
        } else {
            res.json({ code: 403, result: { msg: '账号密码为必填项!' } })
        }
    })
})
// 更新用户
router.post('/updateUser', function (req, res, next) {
    const timer = Date.parse(new Date())
    const { userName, password, email, id } = PARSER(req.body)
    if (userName && password && id) {
        UPDATE(SQL_TABLE_NAME.user, `name = ${userName}`, "id = " + id)
        UPDATE(SQL_TABLE_NAME.user, `password = ${password}`, "id = " + id)
        UPDATE(SQL_TABLE_NAME.user, `email = ${email}`, "id = " + id)
        UPDATE(SQL_TABLE_NAME.user, `update_time = ${timer}`, "id = " + id)
        res.json({ code: 200, result: { msg: 'update user success' } })
    } else {
        res.json({ code: 403, result: { msg: '参数缺失' } })
    }
})
// 删除用户
router.post('/deleteUser', function (req, res, next) {
    const { id } = PARSER(req.body)
    if (id) {
        DELETE(SQL_TABLE_NAME.user, "id = " + id, (results) => {
            res.json({ code: 200, result: { msg: 'delete user success' } })
        })
    } else {
        res.json({ code: 403, result: { msg: '参数缺失' } })
    }
})
// 登录
router.post('/login', function (req, res, next) {
    const { userName, password } = PARSER(req.body)
    SEARCH(SQL_TABLE_NAME.user, `name = '${userName}' and password = '${password}' `, (detail) => {
        if (!detail.length) {
            res.json({ code: 403, result: { msg: '该用户不存在!' } })
        } else {
            res.json({ code: 200, result: { msg: '欢迎登录', data: detail[0] } })
        }
    })
})

module.exports = router
