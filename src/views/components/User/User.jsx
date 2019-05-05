import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './UserStyles';

const User = ({ classes, user }) => {
  return (
    <div>User</div>
  )
}

const { object } = PropTypes;
User.propTypes = {
  classes: object.isRequired,
  user: object
};

export default withStyles(styles)(User);