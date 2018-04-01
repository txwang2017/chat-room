import React from 'react'

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.props = props

    this.handleSignOut = () => {
      this.props.actions.doSignOut()
    }
  }

  componentWillMount() {
    this.props.actions.doAuth()
  }

  render() {
    return (
      <nav className="navbar navbar-default">
        <img id='avatar' src={this.props.state.avatar} className="img-rounded"/>
        <div className="btn-group">
          <button type="button"
                  className="btn btn-secondary dropdown-toggle"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false">
            {this.props.state.userName}
          </button>
          <div className="dropdown-menu dropdown-menu-right">
            <button className="dropdown-item" type="button">account info</button>
            <div className="dropdown-divider"/>
            <button className="dropdown-item" type="button" onClick={this.handleSignOut}>
              sign out
            </button>
          </div>
        </div>
      </nav>
    )
  }
}

export default Header