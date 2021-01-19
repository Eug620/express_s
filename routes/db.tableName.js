/*
 * @Author        : yeyuhang
 * @Date          : Do not edit
 * @LastEditTime: 2021-01-19 11:42:00
 * @LastEditors: Please set LastEditors
 * @Descripttion  : Descripttion
 */

var SQL_TABLE_NAME = {
    // user: 'express_user_db' // 用户表
    user: 'Table_user', // 用户表
    interface: 'Table_interface',
    interface_log: 'Table_interface_log',
    image: 'Table_image',
    city_provinces: 'Table_City_Provinces', // 省级（省份、直辖市、自治区）
    city_cities: 'Table_City_Cities', // 地级（城市）
    city_areas: 'Table_City_Areas', // 县级（区县)
    city_streets: 'Table_City_Streets', // 乡级（乡镇、街道）
    // city_villages: 'Table_City_Villages' // 村级（村委会、居委会）TODO
}

module.exports = SQL_TABLE_NAME