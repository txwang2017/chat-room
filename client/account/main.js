import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware, bindActionCreators} from 'redux'
import thunk from 'redux-thunk'
import {connect} from 'react-redux'

import reducer from './reducers/reducers'
import * as Actions from './actions/actions'
import AccountContainer from './container/Account'

const store = createStore(reducer, applyMiddleware(thunk))

const account = ({state, actions}) => {
  return(
    <div>
      <AccountContainer state={state} actions={actions}/>
    </div>
  )
}

const mapStateToProps = state => ({state})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});

const Account = connect(
  mapStateToProps,
  mapDispatchToProps
)(account)

render(
  <Provider store={store}>
    <div id="account">
      <Account/>
    </div>
  </Provider>,
  document.getElementById("account")
)
