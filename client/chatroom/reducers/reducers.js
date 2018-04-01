const initialState = {
  userName: null,
  avatar: null,
  err: null,
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
    default:
      break
  }
  return newState
}


export default reducer