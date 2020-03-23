import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { clientContactOperations } from '../../../state/clientContact';
import View from '../../components/ClientContactList';

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

const mapStateToProps = ({ clientContactState }) => {
  return { clientContacts: clientContactState.clientContacts };
};

const mapDispatchToProps = {
  list: clientContactOperations.list
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ClientList));