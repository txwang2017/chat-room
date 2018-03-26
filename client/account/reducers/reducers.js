const initialState = {
  userName: null,
  userId: null,
  err: null
}

const setUserName = (newState, userName) => {
  newState.userName = userName
}

const setErr = (newState, err) => {
  newState.err = err
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
    default:
      break;
  }
  return newState
}

export default reducer