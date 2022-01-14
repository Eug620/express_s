/* 
 * @Author       : Eug
 * @Date         : 2022-01-14 14:14:32
 * @LastEditTime : 2022-01-14 15:52:09
 * @LastEditors  : Eug
 * @Descripttion : Descripttion
 * @FilePath     : /express_s/utils/socket.js
 */
const http = require('http');
const socketIo = require('socket.io');
const UUID = require('uuid')
var { SQL_TABLE_NAME } = require('../lib/const')
const {
  ADD,
  SEARCHALL,
  BUFFER_BASE64
} = require('../utils')
module.exports = (app) => {
  SEARCHALL(
    SQL_TABLE_NAME.user,
    'create_time DESC',
    (user_list) => {
      const userMap = Object.fromEntries(
        user_list.map(({user_id, user_name}) => [user_id, user_name])
      )
      let socketSet = new Set(); // 存储 socket
    
      const server = http.Server(app);
      const io = socketIo(server);
      io.on('connection', function (socket) {
        socketSet.add(socket);
        socket.on('message', function ({message, user_id}) {
          const id = UUID.v4()
          const timer = Date.parse(new Date())
          socketSet.forEach(ws => {
            if (ws.connected) { // 判断当前的 socket 是否连接
              ws.send({message, id , user_id, user_name: userMap[user_id],create_time:timer});
            } else {
              socketSet.delete(ws)
            }
          })
          ADD(SQL_TABLE_NAME.information_record, "id, user_id, message, create_time", `'${id}', '${user_id}', '${BUFFER_BASE64(message)}', ${timer}`, () => {})
        });
        socket.on('error', function (err) {
          console.log(err);
        });
      });
      server.listen(3030);
    }
  )
}

