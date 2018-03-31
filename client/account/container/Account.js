import React from 'react'

import SignUp from '../components/SignUp'
import SignIn from '../components/SignIn'
import Header from '../components/Header'

class AccountContainer extends React.Component{
  constructor(props){
    super(props)
    this.props = props
  }

  componentDidMount(){
    this.props.actions.doAuth()
  }

  render(){
    switch(this.props.state.panel){
      case 'sign-up':
        return (
          <div className='sign-in-up'>
            <SignUp state={this.props.state} actions={this.props.actions}/>
          </div>
        )
      case 'sign-in':
        return (
          <div className='sign-in-up'>
            <SignIn state={this.props.state} actions={this.props.actions}/>
          </div>
        )
      case 'header':
        return(
          <div className='header'>
            <Header state={this.props.state} actions={this.props.actions}/>
          </div>
        )
      default:
        return null
    }
  }
}

export default AccountContainer