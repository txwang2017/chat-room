const initialState = {
  err: null,
  panel: 'sign-in',
}

const setErr = (newState, err) => {
  newState.err = err
}

const setPanel = (newState, panel) => {
  newState.panel = panel
}

const reducer = (state=initialState, actions) => {
  let newState = {}
  Object.assign(newState, state)
  switch(actions.type){
    case 'ERR':
      setErr(newState, actions.err)
      break
    case 'SET_PANEL':
      setPanel(newState, actions.panel)
      break
    default:
      break;
  }
  return newState
}

export default reducer