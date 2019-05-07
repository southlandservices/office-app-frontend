import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, TextField } from '@material-ui/core'
import styles from './UserStyles';

const User = ({ classes, user, onChange, role }) => {
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
      <Grid item xs={12} md={3} >
        <TextField
          label="Last Name"
          placeholder="LastName"
          field="lastName"
          name="lastName"
          value={user.lastName || ''}
          onChange={onChange.bind(this, 'lastName')}
          fullWidth={true} />
      </Grid>
      <Grid item xs={12} md={3} >
        <TextField
          label="Title"
          placeholder="Title"
          field="title"
          name="title"
          value={user.title || ''}
          onChange={onChange.bind(this, 'title')}
          fullWidth={true} />
      </Grid>
      <Grid item md={3} />
      <Grid item xs={12} md={3} >
        <TextField
          label="Phone"
          placeholder="Phone"
          field="phone1"
          name="phone1"
          value={user.phone1 || ''}
          onChange={onChange.bind(this, 'phone1')}
          fullWidth={true} />
      </Grid>
      <Grid item xs={12} md={3} >
        <TextField
          label="Phone (alt)"
          placeholder="Phone (alt)"
          field="phone2"
          name="phone2"
          value={user.phone2 || ''}
          onChange={onChange.bind(this, 'phone2')}
          fullWidth={true} />
      </Grid>
      <Grid item xs={12} md={6} >
        <TextField
          label="Email"
          placeholder="Email"
          field="email"
          name="email"
          value={user.email || ''}
          onChange={onChange.bind(this, 'email')}
          fullWidth={true} />
      </Grid>
      <Grid item xs={12} md={6} >
        <TextField
          multiline
          rowsMax="10"
          label="Notes"
          placeholder="Notes"
          field="notes"
          name="notes"
          value={user.notes || ''}
          onChange={onChange.bind(this, 'notes')}
          fullWidth={true} />
      </Grid>
      {
        role === 'Admin' ?
          <Grid item xs={12} md={6} >
            <TextField
              multiline
              rowsMax="10"
              label="Admin Notes"
              placeholder="Admin Notes"
              field="personalMetadata"
              name="personalMetadata"
              value={user.personalMetadata || ''}
              onChange={onChange.bind(this, 'personalMetadata')}
              fullWidth={true} />
          </Grid> :
          <Grid item xs={12} md={6} />
      }
    </Grid>
  )
}

const { object, func, string } = PropTypes;
User.propTypes = {
  classes: object.isRequired,
  user: object,
  onChange: func,
  role: string.isRequired
};

export default withStyles(styles)(User);