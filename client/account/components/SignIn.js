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
      <div className="container text-center">
        <form className="form-signin">
          <img className="mb-4"
               src="https://getbootstrap.com/assets/brand/bootstrap-solid.svg"
               alt="" width="72" height="72"/>
          <h1 className="h3 mb-3 font-weight-normal">please sign in</h1>
          <label htmlFor="inputUserName" className="sr-only">username</label>
          <input type="text"
                 id="inputUserName"
                 className="form-control"
                 placeholder="username"
                 required=""
                 autoFocus=""
                 onChange={this.setUserName}/>
          <label htmlFor="inputPassword" className="sr-only">password</label>
          <input type="password"
                 id="inputPassword"
                 className="form-control"
                 placeholder="password"
                 required=""
                 onChange={this.setPassword}/>
          <button className="btn btn-lg btn-primary btn-block" onClick={this.doSignIn}>sign in</button>
          <a href="#" onClick={this.handleSignUp}>Don't have an account? Sign up here</a>
          <p id="error-msg">{this.props.state.err}</p>
        </form>
      </div>
    )
  }
}

export default SignIn