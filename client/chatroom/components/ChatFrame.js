import React from 'react'
import io from 'socket.io-client';

class ChatFrame extends React.Component{
  constructor(props){
    super(props)
    this.props = props
    this.msg = null
    this.socket = null

    this.handleChangeMsg = msg => {
      this.msg = msg.target.value
    }

    this.handleSendMsg = () => {
      this.socket.emit('msg', {
        msg: this.msg,
        to: 'qqq'
      })
    }

    this.setMsg = msg => {
      this.socket.emit('userName', this.props.state.userName)
    }
  }

  componentWillMount(){
    this.socket = io.connect('localhost:3000', {
      path: '/chat-room/msg',
      transports: ['websocket']
    })
  }

  componentDidMount(){
    this.socket.emit('userName', this.props.state.userName)
    this.socket.on('msg', msg => {
      this.setMsg(msg)
    })
  }

  render(){
    return(
      <div className="container">
        <div className="row">
          {this.props.state.msg.map((msg, k) => (
            <p>{msg.msg}</p>
          ))}
        </div>
        <div className="row">
          <input type="text" className="form-control" onChange={this.handleChangeMsg}/>
          <button onClick={this.handleSendMsg}>send</button>
        </div>
      </div>
    )
  }
}

export default ChatFrame