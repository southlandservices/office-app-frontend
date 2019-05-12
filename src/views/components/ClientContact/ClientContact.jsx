import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, TextField } from '@material-ui/core';
import styles from './ClientContactStyles';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';

// const styles = theme => ({
//   root: {
//     display: 'flex',
//     flexWrap: 'wrap',
//   },
//   formControl: {
//     minWidth: 120,
//   },
//   selectEmpty: {
//     marginTop: theme.spacing.unit * 2,
//   },
// });

const ClientContact = ({ classes, clientContact, onChange, role, isNew }) => {
  return (
    <Grid className="clientContact-form" container spacing={24}>
      <Grid item xs={12} md={3} >
        <TextField
          label="First Name"
          placeholder="First Name"
          field="firstName"
          name="firstName"
          value={clientContact.firstName || ''}
          onChange={onChange.bind(this, 'firstName')}
          fullWidth={true} />
      </Grid>
      <Grid item xs={12} md={3} >
        <TextField
          label="Last Name"
          placeholder="LastName"
          field="lastName"
          name="lastName"
          value={clientContact.lastName || ''}
          onChange={onChange.bind(this, 'lastName')}
          fullWidth={true} />
      </Grid>
      <Grid item xs={12} md={3} >
        <TextField
          label="Title"
          placeholder="Title"
          field="title"
          name="title"
          value={clientContact.title || ''}
          onChange={onChange.bind(this, 'title')}
          fullWidth={true} />
      </Grid>
      <Grid item xs={12} md={3} >
        <TextField
          label="Phone"
          placeholder="Phone"
          field="phone1"
          name="phone1"
          value={clientContact.phone1 || ''}
          onChange={onChange.bind(this, 'phone1')}
          fullWidth={true} />
      </Grid>
      <Grid item xs={12} md={3} >
        <TextField
          label="Phone (alt)"
          placeholder="Phone (alt)"
          field="phone2"
          name="phone2"
          value={clientContact.phone2 || ''}
          onChange={onChange.bind(this, 'phone2')}
          fullWidth={true} />
      </Grid>
      <Grid item xs={12} md={6} >
        <TextField
          label="Email"
          placeholder="Email"
          field="email"
          name="email"
          value={clientContact.email || ''}
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
          value={clientContact.notes || ''}
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
              value={clientContact.personalMetadata || ''}
              onChange={onChange.bind(this, 'personalMetadata')}
              fullWidth={true} />
          </Grid> :
          <Grid item xs={12} md={6} />
      }
    </Grid>
  )
}

const { object, func, string, bool, array } = PropTypes;
ClientContact.propTypes = {
  classes: object.isRequired,
  clientContact: object,
  onChange: func,
  role: string.isRequired,
  isNew: bool.isRequired
};

export default withStyles(styles)(ClientContact);