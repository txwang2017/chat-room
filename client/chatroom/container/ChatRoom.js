import React from 'react'

import Header from '../components/Header'
import ChatFrame from '../components/ChatFrame'
import UserList from '../components/UserList'

class ChatRoomContainer extends React.Component{
  constructor(props){
    super(props)
    this.props = props
  }
  componentWillMount(){
    this.props.actions.doAuth()
  }

  render(){
    return(
      <div>
        <Header state={this.props.state} actions={this.props.actions}/>
        <div className="container">
          <ChatFrame state={this.props.state} actions={this.props.actions}/>
          <UserList state={this.props.state} actions={this.props.actions}/>
        </div>
      </div>
    )
  }
}

export default ChatRoomContainer