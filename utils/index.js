/*
 * @Author        : yeyuhang
 * @Date          : Do not edit
 * @LastEditTime: 2021-01-07 13:33:08
 * @LastEditors: Please set LastEditors
 * @Descripttion  : Descripttion
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
    SEARCHALL: (tableName, cb) => {
        if (cb) {
            db.query(`select * from ${tableName}`, [], function (results, fields) {
                cb(results)
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
    },
    REFRESH: (tableName, fields, values, cb) => {
        return db.query(`update ${tableName} set ${fields} = ${values};`, [], function (results, fields) {
            cb(results, fields)
        })
    }
}