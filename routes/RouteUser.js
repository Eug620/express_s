/* 
 * @Author       : Eug
 * @Date         : 2020-11-23 15:38:02
 * @LastEditTime : 2021-12-27 17:35:12
 * @LastEditors  : Eug
 * @Descripttion : Descripttion
 * @FilePath     : /express_s/routes/RouteUser.js
 */

var express = require('express')
var router = express.Router()
var { SQL_TABLE_NAME } = require('../lib/const')
const UUID = require('uuid')
const { PARSER, UPDATE, SEARCH, SEARCHALL, DELETE, ADD } = require('../utils')

// 用户列表
router.get('/getUserList', function (req, res, next) {
    try {
        SEARCHALL(SQL_TABLE_NAME.user, 'update_time DESC', (results) => {
            res.json({ code: 200, result: results })
        })
    } catch (error) {
        res.json({ code: 500, msg: `${error}` })
    }
})

// 新增用户
router.post('/createUser', function (req, res, next) {
    try {
        const { user_name, user_password, user_email } = PARSER(req.body)
        const timer = Date.parse(new Date())
        if (!user_name || !user_password) {
            res.json({ code: 403, result: { msg: '账号密码为必填项!' } })
        } else {
            // 账号名不可重复
            SEARCH(SQL_TABLE_NAME.user, `user_name = '${user_name}'`, (detail) => {
                if (detail.length) {
                    res.json({ code: 403, result: { msg: '该用户名已被使用!' } })
                } else {
                    ADD(SQL_TABLE_NAME.user, "user_id, user_name, user_password, user_email, create_time, update_time", `'${UUID.v4()}', '${user_name}', '${user_password}', '${user_email}', ${timer}, ${timer}`, (results, fields) => {
                        res.json({ code: 200, result: { msg: '新增用户成功!' } })
                    })
                }
            })
        }
    } catch (error) {
        res.json({ code: 500, msg: `${error}` })
    }
})

// 更新用户
router.post('/updateUser', function (req, res, next) {
    try {
        const timer = Date.parse(new Date())
        const { user_name, user_password, user_email, user_id } = PARSER(req.body)
        if (user_name && user_password && user_id) {
            UPDATE(
                SQL_TABLE_NAME.user,
                `user_name = ${user_name},user_password = ${user_password},user_email = ${user_email},update_time = ${timer}`,
                "user_id = " + user_id
            )
            res.json({ code: 200, result: { msg: '更新用户成功!' } })
        } else {
            res.json({ code: 403, result: { msg: '参数缺失!' } })
        }
    } catch (error) {
        res.json({ code: 500, msg: `${error}` })
    }
})

// 删除用户
router.post('/deleteUser', function (req, res, next) {
    try {
        const { user_id } = PARSER(req.body)
        if (user_id) {
            DELETE(SQL_TABLE_NAME.user, "user_id = " + user_id, (results) => {
                res.json({ code: 200, result: { msg: '删除用户成功!' } })
            })
        } else {
            res.json({ code: 403, result: { msg: '参数缺失!' } })
        }
    } catch (error) {
        res.json({ code: 500, msg: `${error}` })
    }
})

// 登录
router.post('/login', function (req, res, next) {
    try {
        const { user_name, user_password } = PARSER(req.body)
        SEARCH(SQL_TABLE_NAME.user, `user_name = '${user_name}' and user_password = '${user_password}'`, (detail) => {
            if (!detail.length) {
                res.json({ code: 403, result: { msg: '该用户不存在!' } })
            } else {
                detail.forEach(item => Reflect.deleteProperty(item, 'user_password'))
                res.json({ code: 200, result: { msg: '欢迎登录', data: detail[0] } })
            }
        })
    } catch (error) {
        res.json({ code: 500, msg: `${error}` })
    }
})

module.exports = router
