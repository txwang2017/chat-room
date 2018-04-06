let socketList = {}
let userList = {}
let onlineNum = 0

const msgHandler = io => {
  io.on('connection', socket => {
    onlineNum++

    socket.on('userName', userName => {
      socket.broadcast.emit('addUser', userName.userName);
      socketList[userName.userName] = socket
      userList[socket.id] = userName.userName
    })

    socket.on('msg', msg => {
      socket.emit('msg', {
        from: userList[socket],
        to: msg.to,
        msg: msg.msg
      })
    })

    socket.on('disconnect', reason => {
      onlineNum--
      let userName = userList[socket.id]
      socket.broadcast.emit('removeUser', userName)
      delete socketList[userName]
      delete userList[socket.id]
    })
  })
}

const getUserList = (req, res) => {
  let list = []
  for(let socket in socketList){
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