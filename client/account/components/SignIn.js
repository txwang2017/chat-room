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

    this.doSignIn = () => {
      this.props.actions.doSignIn(this.userName, this.password)
    }
  }

  render() {
    return (
      <div className="container">
        <p>{this.props.state.userName}</p>
        <input type="text"
               className="form-control"
               placeholder="username"
               onChange={this.setUserName}/>
        <input type="password"
               className="form-control"
               placeholder="password"
               onChange={this.setPassword}/>
        <button className="btn btn-lg btn-primary btn-block" onClick={this.doSignIn}>Sign in</button>
        <p id="error-msg">{this.props.state.err}</p>
      </div>
    )
  }
}

export default SignIn