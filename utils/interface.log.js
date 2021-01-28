/* 
 * @Author       : Eug
 * @Date         : 2021-01-07 13:59:16
 * @LastEditTime : 2021-01-28 15:14:57
 * @LastEditors  : Eug
 * @Descripttion : Descripttion
 * @FilePath     : /express_s/utils/interface.log.js
 */

module.exports = {
    // interface使用字段
    TableInterfaceField: ['id', 'belong', 'name', 'request'],
    // 处理interface log 字符串转换为数组形式
    PARSE_INTERFACE_LOG: (result, field) => {
        const DATA = []
        result.forEach(logs => {
            let _log_data = logs.log_data
            let _return_data = []
            _log_data = _log_data.split('|')
            _log_data.forEach(data => {
                let str = {}
                let _data = data
                _data = _data.replace('(','')
                _data = _data.replace(')','')
                _data = _data.split(',')
                _data.forEach((item, idx) => {
                    str[field[idx]] = item
                })
                _return_data.push(str)
            })
            logs.log_data = _return_data
            DATA.push(logs)
        })
        return DATA
    }
}