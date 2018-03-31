import React from 'react'

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.props = props

    this.handleSignOut = () => {
      this.props.actions.doSignOut()
    }
  }

  componentWillMount(){
    if(this.props.state.avatar === null){
      this.props.actions.getAvatar(this.props.state.userName)
    }
  }

  render() {
    if (this.props.state.panel === 'header') {
      console.log(this.props.state.avatar)
      return (
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <img id='avatar' src={this.props.state.avatar} className="img-rounded"/>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav navbar-right">
                <li className="dropdown">
                  <a href="#"
                     className="dropdown-toggle"
                     data-toggle="dropdown"
                     role="button"
                     aria-haspopup="true"
                     aria-expanded="false">
                    <span id="user-name">{this.props.state.userName}</span>
                    <span className="caret"/>
                  </a>
                  <ul className="dropdown-menu">
                    <li><a href="#"><span>Account Info</span></a></li>
                    <li role="separator" className="divider"/>
                    <li><a href="#" onClick={this.handleSignOut}><span>Sign Out</span></a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      )
    } else {
      return null
    }
  }
}

export default Header