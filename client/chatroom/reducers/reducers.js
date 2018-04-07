const initialState = {
  userName: null,
  avatar: null,
  err: null,
  msg: [],
  userList: [],
  socket: null,
  msgTo: null,
}

const setUserName = (newState, userName) => {
  newState.userName = userName
}

const setAvatar = (newState, avatar) => {
  newState.avatar = avatar
}

const setErr = (newState, err) => {
  newState.err = err
}

const setMsg = (newState, msg) => {
  newState.msg.push(msg)
}

const setUserList = (newState, userList) => {
  newState.userList = userList
}

const addUser = (newState, user) => {
  newState.userList.push(user)
}

const removeUser = (newState, user) => {
  for(let i = 0; i < newState.userList.length; i++){
    if(newState.userList[i] === user){
      newState.userList.splice(i, 1)
      break
    }
  }
}

const setSocket = (newState, socket) => {
  newState.socket = socket
}

const setMsgTo = (newState, userName) => {
  newState.msgTo = userName
}

const reducer = (state=initialState, actions) => {
  let newState = {}
  Object.assign(newState, state)
  switch(actions.type){
    case 'SET_AVATAR':
      setAvatar(newState, actions.avatar)
      break
    case 'SIGN_IN':
      setUserName(newState, actions.userName)
      break
    case 'SIGN_OUT':
      setUserName(newState, null)
      setAvatar(newState, null)
      break
    case 'ERR':
      setErr(newState, actions.err)
      break
    case 'SET_MSG':
      setMsg(newState, actions.msg)
      break
    case 'SET_USER_LIST':
      setUserList(newState, actions.userList)
      break
    case 'ADD_USER':
      addUser(newState, actions.user)
      break
    case 'REMOVE_USER':
      removeUser(newState, actions.user)
      break
    case 'SET_SOCKET':
      setSocket(newState, actions.socket)
      break
    case 'SET_MSG_TO':
      setMsgTo(newState, actions.userName)
      break
    default:
      break
  }
  return newState
}

export default reducer