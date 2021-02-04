/* 
 * @Author       : Eug
 * @Date         : 2021-01-28 15:04:34
 * @LastEditTime : 2021-02-04 11:45:25
 * @LastEditors  : Eug
 * @Descripttion : Descripttion
 * @FilePath     : /express_s/routes/city.js
 */

var express = require('express')
var router = express.Router()
var SQL_TABLE_NAME = require('./db.tableName')
var db = require('../db')
const { PARSER, UPDATE, SEARCH, SEARCHALL, DELETE, ADD } = require('../utils')
// 省级（省份、直辖市、自治区）列表
router.get('/provinces', function (req, res, next) {
    SEARCHALL(SQL_TABLE_NAME.city_provinces, (results) => {
        res.json({ code: 200, result: results })
    })
})
// 地级（城市）列表
router.get('/cities', function (req, res, next) {
    const { provinceCode } = req.query
    if (!provinceCode) {
        res.json({ code: 403, result: { msg: '参数缺失!' } })
    } else {
        SEARCH(SQL_TABLE_NAME.city_cities, `provinceCode = ${provinceCode}`,(detail) => {
            res.json({ code: 200, result: detail })
        })
    }
})
// 县级（区县) 列表
router.get('/areas', function (req, res, next) {
    const { provinceCode, cityCode } = req.query
    if (!provinceCode || !cityCode) {
        res.json({ code: 403, result: { msg: '参数缺失!' } })
    } else {
        SEARCH(SQL_TABLE_NAME.city_areas, `provinceCode = ${provinceCode} and cityCode = ${cityCode}`,(detail) => {
            res.json({ code: 200, result: detail })
        })
    }
})
// 乡级（乡镇、街道）列表
router.get('/streets', function (req, res, next) {
    const { provinceCode, cityCode, areaCode } = req.query
    if (!provinceCode || !cityCode || !areaCode) {
        res.json({ code: 403, result: { msg: '参数缺失!' } })
    } else {
        SEARCH(SQL_TABLE_NAME.city_streets, `provinceCode = ${provinceCode} and cityCode = ${cityCode} and areaCode = ${areaCode}`,(detail) => {
            res.json({ code: 200, result: detail })
        })
    }
})
 // 村级（村委会、居委会）TODO
 router.get('/villages', function (req, res, next) {
    const { provinceCode, cityCode, areaCode, streetCode } = req.query
    if (!provinceCode || !cityCode || !areaCode || !streetCode) {
        res.json({ code: 403, result: { msg: '参数缺失!' } })
    } else {
        SEARCH(SQL_TABLE_NAME.city_villages, `provinceCode = ${provinceCode} and cityCode = ${cityCode} and areaCode = ${areaCode} and streetCode = ${streetCode}`,(detail) => {
            res.json({ code: 200, result: detail })
        })
    }
})

module.exports = router
