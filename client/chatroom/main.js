import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware, bindActionCreators} from 'redux'
import thunk from 'redux-thunk'
import {connect} from 'react-redux'

import reducer from './reducers/reducers'
import * as Actions from './actions/actions'
import ChatRoomContainer from './container/ChatRoom'

const store = createStore(reducer, applyMiddleware(thunk))

const chatRoom = ({state, actions}) => {
  return(
    <div>
      <ChatRoomContainer state={state} actions={actions}/>
    </div>
  )
}

const mapStateToProps = state => ({state})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});

const ChatRoom = connect(
  mapStateToProps,
  mapDispatchToProps
)(chatRoom)

render(
  <Provider store={store}>
    <div id="account-header">
      <ChatRoom/>
    </div>
  </Provider>,
  document.getElementById('chat-room')
)