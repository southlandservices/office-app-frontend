import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import View from '../../components/Menu';

class MenuContainer extends Component {
  
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <View { ...this.props } />
    )
  }
}

const mapStateToProps = ({ authenticationState }) => {
  return { authenticated: authenticationState.authenticated };
}

export default connect(mapStateToProps)(MenuContainer);