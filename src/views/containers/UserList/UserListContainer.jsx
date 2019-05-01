import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './UserListStyles';
import { userOperations } from '../../../state/user';

class UserList extends Component {
  componentDidMount() {
    this.props.list();
  }

  render() {
    return(
      <div></div>
    )
  }

}

const mapStateToProps = ({ userState }) => {
  debugger;
  return { users: userState.users };
};

const mapDispatchToProps = {
  list: userOperations.list
};

const styledUserList = withStyles(styles)(UserList);
export default connect(mapStateToProps, mapDispatchToProps)(styledUserList);