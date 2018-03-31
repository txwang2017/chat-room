import React from 'react'

class SignIn extends React.Component {

  constructor(props) {
    super()
    this.props = props
    this.userName = ""
    this.password = ""

    this.setUserName = userName => {
      this.userName = userName.target.value
    }

    this.setPassword = password => {
      this.password = password.target.value
    }

    this.handleSignUp = () => {
      this.props.actions.setPanel('sign-up')
      this.props.actions.doErr(null)
    }

    this.doSignIn = () => {
      this.props.actions.doSignIn(this.userName, this.password)
    }
  }

  render() {
    return (
      <div className="container">
        <input type="text"
               className="form-control"
               placeholder="username"
               onChange={this.setUserName}/>
        <input type="password"
               className="form-control"
               placeholder="password"
               onChange={this.setPassword}/>
        <button className="btn btn-lg btn-primary btn-block" onClick={this.doSignIn}>Sign in</button>
        <a href="#" onClick={this.handleSignUp}>Don't have an account? Sign Up here</a>
        <p id="error-msg">{this.props.state.err}</p>
      </div>
    )
  }
}

export default SignIn