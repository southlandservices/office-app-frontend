import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { shipperOperations } from '../../../state/shipper';
import View from '../../components/ShipperList';

class ShipperList extends Component {

  componentDidMount() {
    this.props.list();
  }

  render() {
    return(
      <View { ...this.props } />
    )
  }

}

const mapStateToProps = ({ shipperState }) => {
  return { shippers: shipperState.shippers };
};

const mapDispatchToProps = {
  list: shipperOperations.list
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ShipperList));