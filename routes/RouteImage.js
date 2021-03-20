/* 
 * @Author       : Eug
 * @Date         : 2020-12-29 10:59:27
 * @LastEditTime : 2021-02-19 18:30:10
 * @LastEditors  : Eug
 * @Descripttion : Descripttion
 * @FilePath     : /express_s/routes/RouteImage.js
 */

var express = require('express')
var _ = require('lodash')
var router = express.Router()
var { SQL_TABLE_NAME } = require('../lib/const')
const UUID = require('uuid');
const { PARSER, UPDATE, SEARCHALL, ADD, DELETE } = require('../utils')
// `id = "${ UUID.v4()}"`, "image_id = " + image_id
// 获取图标列表
router.get('/getImageList', function (req, res, next) {
    SEARCHALL(SQL_TABLE_NAME.image, (results) => {
        res.json({ code: 200, result: results })
    })
})

// 新增图片
router.post('/addImage', function (req, res, next) {
    const { url } = PARSER(req.body)
    if (url) {
        ADD(SQL_TABLE_NAME.image, "id, url", `"${UUID.v4()}", ${url}`, (results, fields) => {
            res.json({ code: 200, result: { msg: 'success' } })
        })
    } else {
        res.json({ code: 403, result: { msg: 'url is require!' } })
    }
})

// 更新图片
router.post('/updateImage', function (req, res, next) {
    const { url, id } = PARSER(req.body)
    if (url && id) {
        UPDATE(SQL_TABLE_NAME.image, `url = ${url}`, `id = "${id}"`)
        res.json({ code: 200, result: { msg: 'update image success' } })
    } else {
        res.json({ code: 403, result: { msg: '参数缺失' } })
    }
})

// 删除图片
router.post('/deleteImage', function (req, res, next) {
    const { id } = PARSER(req.body)
    if (id) {
        DELETE(SQL_TABLE_NAME.image, `id = "${id}"`, (results, fields) => {
            res.json({ code: 200, result: { msg: 'delete image success' } })
        })
    } else {
        res.json({ code: 403, result: { msg: '参数缺失' } })
    }
})

// 获取随机图片
router.get('/background', function (req, res, next) {
    SEARCHALL(SQL_TABLE_NAME.image, (results) => {
        const idx = _.random(0, results.length)
        res.json({ code: 200, result: results[idx] })
    })
})

module.exports = router
