import React from 'react'

class UserList extends React.Component{
  constructor(props){
    super(props)
    this.props = props
    this.handleMsgTo = userName => {
      this.props.actions.setMsgTo(userName.target.value)
    }
  }
  componentWillMount(){
    this.props.actions.getUserList()
  }

  render(){
    return(
      <select className="custom-select" size="10">
        <p>users online</p>
        {this.props.state.userList.map(user => (
          <option className="user-option" value={user} onClick={this.handleMsgTo}>{user}</option>
        ))}
      </select>
    )
  }
}

export default UserList