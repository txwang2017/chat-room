import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import reducer from './reducers/reducers'
import Account from './container/Account'

const store = createStore(reducer, applyMiddleware(thunk))

render(
  <Provider store={store}>
    <div id="account">
      <Account/>
    </div>
  </Provider>,
  document.getElementById("account")
)

