import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { userOperations } from '../../../state/user';
import View from '../../components/UserList';

class UserList extends Component {

  componentDidMount() {
    this.props.list();
  }

  // For future reference
  // goToDetail(data) {
  //   const href = data[0].props.href;
  //   this.props.history.push(`/${href}`);
  // }

  // options = {
  //   onRowClick: rowData => this.goToDetail(rowData)
  // }

  render() {
    return(
      <View { ...this.props } />
    )
  }

}

const mapStateToProps = ({ userState }) => {
  return { users: userState.users };
};

const mapDispatchToProps = {
  list: userOperations.list
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserList));