/* 
 * @Author       : Eug
 * @Date         : 2021-01-28 14:48:32
 * @LastEditTime : 2021-01-28 15:13:49
 * @LastEditors  : Eug
 * @Descripttion : Descripttion
 * @FilePath     : /express_s/routes/db.tableName.js
 */

var SQL_TABLE_NAME = {
    // user: 'express_user_db' // 用户表
    user: 'Table_User', // 用户表
    interface: 'Table_Interface',
    interface_log: 'Table_Interface_Log',
    image: 'Table_Image',
    city_provinces: 'Table_City_Provinces', // 省级（省份、直辖市、自治区）
    city_cities: 'Table_City_Cities', // 地级（城市）
    city_areas: 'Table_City_Areas', // 县级（区县)
    city_streets: 'Table_City_Streets', // 乡级（乡镇、街道）
    city_villages: 'Table_City_Villages' // 村级（村委会、居委会）TODO
}

module.exports = SQL_TABLE_NAME
