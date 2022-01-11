/* 
 * @Author       : Eug
 * @Date         : 2022-01-11 19:31:34
 * @LastEditTime : 2022-01-11 19:39:22
 * @LastEditors  : Eug
 * @Descripttion : Descripttion
 * @FilePath     : /express_s/lib/upload.js
 */
const multer = require('multer')
const upload = multer({
  dest: './uploadFiles'
})
// 设置保存上传文件路径
module.exports = upload