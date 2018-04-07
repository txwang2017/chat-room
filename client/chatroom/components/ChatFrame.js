import React from 'react'
import io from 'socket.io-client';

class ChatFrame extends React.Component{
  constructor(props){
    super(props)
    this.props = props
    this.msg = null
    this.socket = null
    this.userName = null

    this.handleChangeMsg = msg => {
      this.msg = msg.target.value
    }

    this.handleSendMsg = () => {
      this.socket.emit('msg', {
        msg: this.msg,
        to: this.props.state.msgTo
      })
      document.getElementById('msg-content').value = ''
    }

    this.setMsg = msg => {
      this.props.actions.setMsg(msg)
    }
  }

  componentWillMount(){
    this.socket = io.connect('localhost:3000', {
      path: '/chat-room/msg',
      transports: ['websocket']
    })
  }

  componentDidMount(){
    this.socket.on('connect', () => {
      this.props.actions.setSocket(this.socket)
    })

    addEventListener('sendUserName', () => {
      this.socket.emit('userName', {userName: this.props.state.userName})
    })

    this.socket.on('msg', msg => {
      this.setMsg(msg)
    })

    this.socket.on('addUser', userName => {
      this.props.actions.addUser(userName)
    })

    this.socket.on('removeUser', userName => {
      this.props.actions.removeUser(userName)
    })
  }

  render(){
    return(
      <div id="chat-frame">
        <div id="display-msg">
          {this.props.state.msg.map(msg => (
            <div className="row">
              <p>{msg.from}:</p>
              <p>{msg.msg}</p>
            </div>
          ))}
        </div>
        <div className="row" id="input-msg">
          <textarea id="msg-content" className="form-control" onChange={this.handleChangeMsg}/>
          <button id="send-msg" className="btn btn-success" onClick={this.handleSendMsg}>send</button>
        </div>
      </div>
    )
  }
}

export default ChatFrame