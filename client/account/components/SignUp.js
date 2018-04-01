import React from 'react'

class SignUp extends React.Component {
  constructor(props) {
    super(props)
    this.props = props

    this.userName = ""
    this.password1 = ""
    this.password2 = ""
    this.avatar = null

    this.setUserName = userName => {
      this.userName = userName.target.value
    }

    this.setPassword1 = password1 => {
      this.password1 = password1.target.value
    }

    this.setPassword2 = password2 => {
      this.password2 = password2.target.value
    }

    this.setAvatar = avatar => {
      this.avatar = avatar.target.files[0]
      const reader = new FileReader()
      reader.onloadend = () => {
        this.avatar = reader.result
      }
      reader.readAsArrayBuffer(this.avatar)
    }

    this.doSignUp = () => {
      if (this.password1 !== this.password2) {
        this.props.actions.doErr('please enter the same password')
        return
      }
      this.props.actions.doSignUp(this.userName, this.password1, this.avatar)
    }

    this.handleSignIn = () => {
      this.props.actions.setPanel('sign-in')
      this.props.actions.doErr(null)
    }
  }

  render() {
    return (
      <div className="container text-center">
        <form className="form-signup">
          <h1 className="h3 mb-3 font-weight-normal">please sign up</h1>
          <img className="mb-4"
               src="https://getbootstrap.com/assets/brand/bootstrap-solid.svg"
               alt="" width="72" height="72"/>
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
                 id="inputPassword1"
                 className="form-control"
                 placeholder="password"
                 required=""
                 onChange={this.setPassword1}/>
          <label htmlFor="inputPassword" className="sr-only">password</label>
          <input type="password"
                 id="inputPassword2"
                 className="form-control"
                 placeholder="enter password again"
                 required=""
                 onChange={this.setPassword2}/>
          <p>
            <div className="custom-file">
              <input type="file"
                     onChange={this.setAvatar}
                     accept="image/png image/jpeg"
                     className="custom-file-input"
                     id="customFile"/>
                <label className="custom-file-label" htmlFor="customFile">upload avatar (optional)</label>
            </div>
          </p>
        </form>
        <button id="submit" className="btn btn-lg btn-primary btn-block" onClick={this.doSignUp}>sign up</button>
        <p id="error-msg">{this.props.state.err}</p>
        <a href="#" onClick={this.handleSignIn}>Already have an account? Sign in</a>
      </div>
    )
  }
}

export default SignUp