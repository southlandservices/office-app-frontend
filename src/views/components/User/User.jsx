import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, TextField } from '@material-ui/core'
import styles from './UserStyles';

const User = ({ classes, user, onChange }) => {
  return (
    <Grid className="user-form" container spacing={24}>
      <Grid item xs={12} md={3} >
        <TextField
          label="First Name"
          placeholder="First Name"
          field="firstName"
          name="firstName"
          value={user.firstName || ''}
          onChange={onChange.bind(this, 'firstName')}
          fullWidth={true} />
      </Grid>
      <Grid item md={9} />
      <Grid item xs={12} md={3} >
        <TextField
          label="Last Name"
          placeholder="LastName"
          field="lastName"
          name="lastName"
          value={user.lastName || ''}
          onChange={onChange}
          fullWidth={true} />
      </Grid>
      <Grid item md={6} />
    </Grid>
  )
}

const { object, func } = PropTypes;
User.propTypes = {
  classes: object.isRequired,
  user: object,
  onChange: func
};

export default withStyles(styles)(User);