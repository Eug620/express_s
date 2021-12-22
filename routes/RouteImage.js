/* 
 * @Author       : Eug
 * @Date         : 2020-12-29 10:59:27
 * @LastEditTime : 2021-12-22 16:00:29
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
// 获取图标列表
router.get('/getImageList', function (req, res, next) {
    try {
        SEARCHALL(SQL_TABLE_NAME.image, 'update_time DESC', (results) => {
            res.json({ code: 200, result: results })
        })
    } catch (error) {
        res.json({ code: 500, msg: error })
    }
})

// 新增图片
router.post('/addImage', function (req, res, next) {
    try {
        const { image_url } = PARSER(req.body)
        const timer = Date.parse(new Date())
        if (image_url) {
            ADD(SQL_TABLE_NAME.image, "image_id, image_url, create_time, update_time", `'${UUID.v4()}', ${image_url}, ${timer}, ${timer}`, (results, fields) => {
                res.json({ code: 200, result: { msg: 'success' } })
            })
        } else {
            res.json({ code: 403, result: { msg: 'image_url is require!' } })
        }
    } catch (error) {
        res.json({ code: 500, msg: error })
    }
})

// 更新图片
router.post('/updateImage', function (req, res, next) {
    try {
        const { image_url, image_id } = PARSER(req.body)
        const timer = Date.parse(new Date())
        if (image_url && image_id) {
            UPDATE(SQL_TABLE_NAME.image, `image_url = ${image_url}, update_time = ${timer}`, "image_id = " + image_id)
            res.json({ code: 200, result: { msg: 'update image success' } })
        } else {
            res.json({ code: 403, result: { msg: '参数缺失' } })
        }
    } catch (error) {
        res.json({ code: 500, msg: error })
    }
})

// 删除图片
router.post('/deleteImage', function (req, res, next) {
    try {
        const { image_id } = PARSER(req.body)
        if (image_id) {
            DELETE(SQL_TABLE_NAME.image, "image_id = " + image_id, (results, fields) => {
                res.json({ code: 200, result: { msg: 'delete image success' } })
            })
        } else {
            res.json({ code: 403, result: { msg: '参数缺失' } })
        }
    } catch (error) {
        res.json({ code: 500, msg: error })
    }
})

// 获取随机图片
router.get('/background', function (req, res, next) {
    try {
        SEARCHALL(SQL_TABLE_NAME.image, 'update_time DESC', (results) => {
            const idx = _.random(0, results.length)
            res.json({ code: 200, result: results[idx] })
        })
    } catch (error) {
        res.json({ code: 500, msg: error })
    }
})

module.exports = router
