const initialState = {
  userName: null,
  err: null,
  content: 'sign-in'
}

const setUserName = (newState, userName) => {
  newState.userName = userName
}

const setErr = (newState, err) => {
  newState.err = err
}

const setContent = (newState, content) => {
  newState.content = content
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
      setContent(newState, 'sign-in')
      break
    case 'SET_CONTENT':
      setContent(newState, actions.content)
      break
    default:
      break;
  }
  return newState
}

export default reducer