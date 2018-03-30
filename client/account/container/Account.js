import React from 'react'

import SignUp from '../components/SignUp'
import SignIn from '../components/SignIn'
import Header from '../components/Header'

class AccountContainer extends React.Component{
  constructor(props){
    super(props)
    this.props = props

    this.handleSignUp = () => {
      this.props.actions.setContent('sign-up')
    }

    this.handleSignIn = () => {
      this.props.actions.setContent('sign-in')
    }

    this.signTab =
    <ul className="nav nav-pills">
      <li role="presentation">
        <a href="#" onClick={this.handleSignIn}>Sign In</a>
      </li>
      <li role="presentation">
        <a href="#" onClick={this.handleSignUp}>Sign Up</a>
      </li>
    </ul>
  }

  componentDidMount(){
    this.props.actions.doAuth()
  }

  render(){
    switch(this.props.state.content){
      case 'sign-up':
        return (
          <div className='sign-in-up'>
            <SignUp state={this.props.state} actions={this.props.actions}/>
            {this.signTab}
          </div>
        )
      case 'sign-in':
        return (
          <div className='sign-in-up'>
            <SignIn state={this.props.state} actions={this.props.actions}/>
            {this.signTab}
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