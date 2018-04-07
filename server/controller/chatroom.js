let socketList = {}
let userList = {}
let onlineNum = 0

const msgHandler = io => {
  io.on('connection', socket => {
    onlineNum++

    socket.on('userName', userName => {
      socket.broadcast.emit('addUser', userName.userName);
      socket.broadcast.emit('msg', {
        from: 'system',
        msg: `user ${userName.userName} logged in`
      })
      socketList[userName.userName] = socket
      userList[socket.id] = userName.userName
    })

    socket.on('msg', msg => {
      if(msg.to !== null){
        let socketTo = socketList[msg.to]
        socketTo.emit('msg', {
          from: userList[socket.id],
          to: msg.to,
          msg: msg.msg
        })
      } else{
        socket.broadcast.emit('msg', {
          from: userList[socket.id],
          to: msg.to,
          msg: msg.msg
        })
      }

      socket.emit('msg', {
        from: userList[socket.id],
        to: msg.to,
        msg: msg.msg
      })
    })

    socket.on('disconnect', reason => {
      onlineNum--
      let userName = userList[socket.id]
      socket.broadcast.emit('removeUser', userName)
      socket.broadcast.emit('msg', {
        from: 'system',
        msg: `user ${userName} logged out`
      })
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