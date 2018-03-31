const initialState = {
  userName: null,
  err: null,
  panel: 'sign-in',
  avatar: null
}

const setUserName = (newState, userName) => {
  newState.userName = userName
}

const setErr = (newState, err) => {
  newState.err = err
}

const setPanel = (newState, panel) => {
  newState.panel = panel
}

const setAvatar = (newState, avatar) => {
  newState.avatar = avatar
}

const reducer = (state=initialState, actions) => {
  let newState = {}
  Object.assign(newState, state)
  switch(actions.type){
    case 'SIGN_IN':
      setUserName(newState, actions.userName)
      break
    case 'ERR':
      setErr(newState, actions.err)
      break
    case 'SIGN_OUT':
      setUserName(newState, null)
      setPanel(newState, 'sign-in')
      break
    case 'SET_PANEL':
      setPanel(newState, actions.panel)
      break
    case 'SET_AVATAR':
      setAvatar(newState, actions.avatar)
      break
    default:
      break;
  }
  return newState
}

export default reducer