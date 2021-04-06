/* 
 * @Author       : Eug
 * @Date         : 2021-01-04 18:44:46
 * @LastEditTime : 2021-04-06 17:12:39
 * @LastEditors  : Eug
 * @Descripttion : Descripttion
 * @FilePath     : /express_s/utils/index.js
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
    SEARCHCOLUMNS: (tableName, where, cb) => {
        return db.query(`select ${where} from ${tableName}`, [], function (results, fields) {
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
    },
    BUFFER_BASE64: (string) => {
        // create a buffer
        const buff = Buffer.from(string, 'utf-8')
        // encode buffer as Base64
        const base64 = buff.toString('base64')
        return base64
    },
    BUFFER_UTF8: (string) => {
        // create a buffer
        const buff = Buffer.from(string, 'base64')
        // decode buffer as UTF-8
        const str = buff.toString('utf-8')
        return str
    }
}