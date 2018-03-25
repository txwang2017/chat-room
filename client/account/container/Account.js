import React from 'react'
import {connect} from "react-redux";
import * as Actions from "../actions/actions";
import {bindActionCreators} from "redux";

import {SignIn} from "../components/SignIn"

const Account = ({state, actions}) => {
  return(
    <div>
      <SignIn state={state} actions={actions}/>
    </div>
  )
}

const mapStateToProps = state => ({state})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Account)
