/*
 * @Author: yeyuhang
 * @Date: 2020-11-20 10:54:21
 * @LastEditTime: 2020-12-03 11:20:20
 * @LastEditors: yeyuhang
 * @Descripttion: 头部注释
 */
var db = require('../db')

module.exports = {
    PARSER: (body) => {
        return JSON.parse(JSON.stringify(body))
    },
    UPDATE: (tableName, set, where, cb) => {
        db.query(`UPDATE ${tableName} SET ${set} WHERE ${where}`, [], function (results, fields) {
            if (cb) {
                cb(results, fields)
            } else {
                console.log('update success')
            }
        })
    },
    SEARCH: (tableName, where, cb) => {
        return db.query(`select * from ${tableName} where ${where}`, [], function (results, fields) {
            if (cb) {
                cb(results)
            }
            return results
        })
    },
    SEARCHALL: (tableName, res) => {
        if (res) {
            db.query(`select * from ${tableName}`, [], function (results, fields) {
                res.json({ code: 200, result: results })
            })
        } else {
            return db.query(`select * from ${tableName}`, [], function (results, fields) {
                return results
            })
        }
    },
    DELETE: (tableName, where, cb) => {
        return db.query(`delete from ${tableName} where ${where}`, [], function (results, fields) {
            if (cb) {
                cb(results)
            }
            return results
        })
    },
    ADD: (tableName, fields, values, cb) => {
        return db.query(`INSERT INTO ${tableName}(${fields}) VALUES (${values});`, [], function (results, fields) {
            cb(results, fields)
        })
    }
}