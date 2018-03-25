const initialState = {
  userName: null,
  userId: null,
}

const setUserName = (newState, userName) => {
  newState.userName = userName
}

const reducer = (state=initialState, actions) => {
  let newState = {}
  Object.assign(newState, state)
  switch(actions.type){
    case 'SIGN_IN':
      setUserName(newState, actions.userName)
      break
    default:
      break;
  }
  return newState
}

export default reducer