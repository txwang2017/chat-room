import React from 'react'

class UserList extends React.Component{
  constructor(props){
    super(props)
    this.props = props
  }
  componentWillMount(){
    this.props.actions.getUserList()
  }
  render(){
    return(
      <div>
        {this.props.state.userList.map(user => (
          <p>
            <h3>{user}</h3>
          </p>
        ))}
      </div>
    )
  }
}

export default UserList