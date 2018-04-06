let socketList = {}
let userList = {}
let onlineNum = 0

const msgHandler = io => {
  io.on('connection', socket => {
    onlineNum++

    socket.on('userName', userName => {
      console.log(userName)
      console.log('qqqqq')
      socketList[userName] = socket
      userList[socket] = userName
    })

    socket.on('msg', msg => {
      socket.emit('msg', {
        from: userList[socket],
        to: msg.to,
        msg: msg.msg
      })
    })
  })
}

const getUserList = (req, res) => {
  let list = []
  for(let socket in socketList){
    console.log(socket)
    if(socketList.hasOwnProperty(socket)){
      list.push(socket)
    }
  }
  res.send(JSON.stringify(list))
}

module.exports = {
  msgHandler,
  getUserList,
}