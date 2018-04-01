import React from 'react'

import Header from '../components/Header'

class ChatRoomContainer extends React.Component{
  constructor(props){
    super(props)
    this.props = props
  }

  render(){
    return(
      <div>
        <Header state={this.props.state} actions={this.props.actions}/>
      </div>
    )
  }
}

export default ChatRoomContainer