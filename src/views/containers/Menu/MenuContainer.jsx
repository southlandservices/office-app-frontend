import React, { Component } from 'react';
import { boundMethod } from 'autobind-decorator';
import { connect } from 'react-redux';
import View from '../../components/Menu';
import { decodeToken } from '../../../utils/misc';
// import * as jwt_decode from 'jwt-decode';

class MenuContainer extends Component {
  
  constructor(props, context) {
    super(props, context);
    this.state = {
      users: ['Admin']
    }
  }

  @boundMethod
  checkRoleForArea(area) {
    const decoded = decodeToken(this.props.authenticated.token);
    return this.state[area].indexOf(decoded.role) > -1;
  }

  render() {
    return (
      <View authenticated={ this.props.authenticated } checkFn={ this.checkRoleForArea } />
    )
  }
}

const mapStateToProps = ({ authenticationState }) => {
  return { authenticated: authenticationState.authenticated };
}

export default connect(mapStateToProps)(MenuContainer);