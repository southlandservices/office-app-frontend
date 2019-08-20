import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { clientOperations } from '../../../state/client';
import View from '../../components/ClientList';

class ClientList extends Component {

  componentDidMount() {
    this.props.list();
  }

  render() {
    return(
      <View { ...this.props } />
    )
  }

}

const mapStateToProps = ({ clientState }) => {
  return { clients: clientState.clients };
};

const mapDispatchToProps = {
  list: clientOperations.list
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ClientList));