import React from 'react'

class SignUp extends React.Component{
  constructor(props){
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
      if(this.password1 !== this.password2){
        this.props.actions.doErr('please enter the same password')
        return
      }
      this.props.actions.doSignUp(this.userName, this.password1, this.avatar)
    }
  }

  render(){
    return(
      <div className="container">
        <input type="text"
               className="form-control"
               placeholder="username"
               onChange={this.setUserName}/>
        <input type="password"
               className="form-control"
               placeholder="password"
               onChange={this.setPassword1}/>
        <input type="password"
               className="form-control"
               placeholder="password enter again"
               onChange={this.setPassword2}/>
        <p>
          <h8>upload avatar</h8>
          <input type="file"
                 id="avatar"
                 className="custom-file-input"
                 accept="image/png image/jpeg"
                 onChange={this.setAvatar}/>
        </p>
        <button className="btn btn-lg btn-primary btn-block" onClick={this.doSignUp}>Sign Up</button>
        <p id="error-msg">{this.props.state.err}</p>
      </div>
    )
  }
}

export default SignUp