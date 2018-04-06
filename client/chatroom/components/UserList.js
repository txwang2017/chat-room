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
        {this.props.state.userList.splice(0, 1)}
      </div>
    )
  }
}

export default UserList