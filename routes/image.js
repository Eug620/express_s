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

// 获取图标列表
router.get('/getImageList', function (req, res, next) {
    SEARCH(SQL_TABLE_NAME.interface, "name = 'getImageList'",(detail) => {
        UPDATE(SQL_TABLE_NAME.interface, `request = ${detail[0].request + 1}`, "name = 'getImageList'")
    })
    SEARCHALL(SQL_TABLE_NAME.image, res)
})
// 新增图片
router.post('/addImage', function (req, res, next) {
    SEARCH(SQL_TABLE_NAME.interface, "name = 'addImage'",(detail) => {
        UPDATE(SQL_TABLE_NAME.interface, `request = ${detail[0].request + 1}`, "name = 'addImage'")
    })
    const { image_url } = PARSER(req.body)
    if (image_url) {
        console.log(image_url);
        
        ADD(SQL_TABLE_NAME.image, "image_url", `${image_url}`, (results, fields) => {
            res.json({ code: 200, result: { msg: 'success' } })
        })
    } else {
        res.json({ code: 403, result: { msg: 'image_url is require!' } })
    }
})

// 更新图片
router.post('/updateImage', function (req, res, next) {
    SEARCH(SQL_TABLE_NAME.interface, "name = 'updateImage'",(detail) => {
        UPDATE(SQL_TABLE_NAME.interface, `request = ${detail[0].request + 1}`, "name = 'updateImage'")
    })
    const { image_url, image_id } = PARSER(req.body)
    if (image_url && image_id) {
        UPDATE(SQL_TABLE_NAME.image, `image_url = ${image_url}`, "image_id = " + image_id)
        res.json({ code: 200, result: { msg: 'update image success' } })
    } else {
        res.json({ code: 403, result: { msg: '参数缺失' } })
    }
})
// 删除图片
router.post('/deleteImage', function (req, res, next) {
    SEARCH(SQL_TABLE_NAME.interface, "name = 'deleteImage'",(detail) => {
        UPDATE(SQL_TABLE_NAME.interface, `request = ${detail[0].request + 1}`, "name = 'deleteImage'")
    })
    const { image_id } = PARSER(req.body)
    if (image_id) {
        DELETE(SQL_TABLE_NAME.image, "image_id = " + image_id, (results, fields) => {
            res.json({ code: 200, result: { msg: 'delete image success' } })
        })
    } else {
        res.json({ code: 403, result: { msg: '参数缺失' } })
    }
})

module.exports = router
