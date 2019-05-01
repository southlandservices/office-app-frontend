import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import withStyles from '@material-ui/core/styles/withStyles';
// import styles from '../../components/UserList/UserListStyles';
import { userOperations } from '../../../state/user';
import View from '../../components/UserList';

class UserList extends Component {
  componentDidMount() {
    this.props.list();
  }

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

// const styledUserList = withStyles(styles)(UserList);
// export default connect(mapStateToProps, mapDispatchToProps)(styledUserList);
export default connect(mapStateToProps, mapDispatchToProps)(UserList);