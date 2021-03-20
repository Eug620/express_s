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
    const { image_url } = PARSER(req.body)
    const timer = Date.parse(new Date())
    if (image_url) {
        ADD(SQL_TABLE_NAME.image, "image_id, image_url, create_time, update_time", `'${UUID.v4()}', ${image_url}, ${timer}, ${timer}`, (results, fields) => {
            res.json({ code: 200, result: { msg: 'success' } })
        })
    } else {
        res.json({ code: 403, result: { msg: 'image_url is require!' } })
    }
})

// 更新图片
router.post('/updateImage', function (req, res, next) {
    const { image_url, image_id } = PARSER(req.body)
    const timer = Date.parse(new Date())
    if (image_url && image_id) {
        UPDATE(SQL_TABLE_NAME.image, `image_url = ${image_url}`, "image_id = " + image_id)
        UPDATE(SQL_TABLE_NAME.image, `update_time = ${timer}`, "image_id = " + image_id)
        res.json({ code: 200, result: { msg: 'update image success' } })
    } else {
        res.json({ code: 403, result: { msg: '参数缺失' } })
    }
})

// 删除图片
router.post('/deleteImage', function (req, res, next) {
    const { image_id } = PARSER(req.body)
    if (image_id) {
        DELETE(SQL_TABLE_NAME.image, "image_id = " + image_id, (results, fields) => {
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
