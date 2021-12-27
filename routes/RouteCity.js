/* 
 * @Author       : Eug
 * @Date         : 2021-01-28 15:04:34
 * @LastEditTime : 2021-12-22 15:59:49
 * @LastEditors  : Eug
 * @Descripttion : Descripttion
 * @FilePath     : /express_s/routes/RouteCity.js
 */

var express = require('express')
var router = express.Router()
var { SQL_TABLE_NAME } = require('../lib/const')
const { SEARCH, SEARCHALL } = require('../utils')

// 省级（省份、直辖市、自治区）列表
router.get('/provinces', function (req, res, next) {
    try {
        SEARCHALL(SQL_TABLE_NAME.city_provinces, 'code ASC', (results) => {
            res.json({ code: 200, result: results })
        })
    } catch (error) {
        res.json({ code: 500, msg: `${error}` })
    }
})

// 地级（城市）列表
router.get('/cities', function (req, res, next) {
    try {
        const { provinceCode } = req.query
        if (!provinceCode) {
            res.json({ code: 403, result: { msg: '参数缺失!' } })
        } else {
            SEARCH(SQL_TABLE_NAME.city_cities, `provinceCode = ${provinceCode}`, (detail) => {
                res.json({ code: 200, result: detail })
            })
        }
    } catch (error) {
        res.json({ code: 500, msg: `${error}` })
    }
})

// 县级（区县) 列表
router.get('/areas', function (req, res, next) {
    try {
        const { provinceCode, cityCode } = req.query
        if (!provinceCode || !cityCode) {
            res.json({ code: 403, result: { msg: '参数缺失!' } })
        } else {
            SEARCH(SQL_TABLE_NAME.city_areas, `provinceCode = ${provinceCode} and cityCode = ${cityCode}`, (detail) => {
                res.json({ code: 200, result: detail })
            })
        }
    } catch (error) {
        res.json({ code: 500, msg: `${error}` })
    }
})

// 乡级（乡镇、街道）列表
router.get('/streets', function (req, res, next) {
    try {
        const { provinceCode, cityCode, areaCode } = req.query
        if (!provinceCode || !cityCode || !areaCode) {
            res.json({ code: 403, result: { msg: '参数缺失!' } })
        } else {
            SEARCH(SQL_TABLE_NAME.city_streets, `provinceCode = ${provinceCode} and cityCode = ${cityCode} and areaCode = ${areaCode}`, (detail) => {
                res.json({ code: 200, result: detail })
            })
        }
    } catch (error) {
        res.json({ code: 500, msg: `${error}` })
    }
})

// 村级（村委会、居委会）TODO
router.get('/villages', function (req, res, next) {
    try {
        const { provinceCode, cityCode, areaCode, streetCode } = req.query
        if (!provinceCode || !cityCode || !areaCode || !streetCode) {
            res.json({ code: 403, result: { msg: '参数缺失!' } })
        } else {
            SEARCH(SQL_TABLE_NAME.city_villages, `provinceCode = ${provinceCode} and cityCode = ${cityCode} and areaCode = ${areaCode} and streetCode = ${streetCode}`, (detail) => {
                res.json({ code: 200, result: detail })
            })
        }
    } catch (error) {
        res.json({ code: 500, msg: `${error}` })
    }
})

module.exports = router
