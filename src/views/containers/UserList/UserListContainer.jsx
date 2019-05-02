import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userOperations } from '../../../state/user';
import View from '../../components/UserList';

class UserList extends Component {

  componentDidMount() {
    this.props.list();
  }

  goToDetail(data) {
    debugger;
    const foo = data;
  }

  options = {
    onRowClick: rowData => this.goToDetail(rowData)
  }

  render() {
    return(
      <View { ...this.props } tableOptions={ this.options } />
    )
  }

}

const mapStateToProps = ({ userState }) => {
  return { users: userState.users };
};

const mapDispatchToProps = {
  list: userOperations.list
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);