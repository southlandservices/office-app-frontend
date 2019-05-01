import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './UserListStyles';

const UserList = ({ classes, users }) => {
  return (
    <div>
      User List Component
    </div>
  )
}

const { object } = PropTypes;
UserList.propTypes = {
  classes: object.isRequired
};

export default withStyles(styles)(UserList);