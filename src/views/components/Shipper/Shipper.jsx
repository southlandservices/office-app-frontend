import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, TextField } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

const Shipper = ({ classes, shipper, onChange, role, isNew, clients }) => {
  const { address } = shipper;
  return (
    <Grid className="shipper-form" container spacing={24}>
      <Grid item xs={12} md={3} >
        <TextField
          label="First Name"
          placeholder="First Name"
          field="firstName"
          name="firstName"
          value={shipper.firstName || ''}
          onChange={onChange.bind(this, 'firstName')}
          fullWidth={true} />
      </Grid>
      <Grid item xs={12} md={3} >
        <TextField
          label="Last Name"
          placeholder="LastName"
          field="lastName"
          name="lastName"
          value={shipper.lastName || ''}
          onChange={onChange.bind(this, 'lastName')}
          fullWidth={true} />
      </Grid>
      <Grid item xs={12} md={3} >
        <TextField
          label="Title"
          placeholder="Title"
          field="title"
          name="title"
          value={shipper.title || ''}
          onChange={onChange.bind(this, 'title')}
          fullWidth={true} />
      </Grid>
      {
        !_.isEmpty(clients) &&
        <Grid item xs={12} md={3} >
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="client">Client</InputLabel>
            <Select
              value={shipper.clientId || ''}
              onChange={onChange.bind(this, 'clientId')}
              inputProps={{
                name: 'clientId',
                id: 'client',
              }}
            >
              {
                clients.map(client => <MenuItem key={client.id} value={client.id}>{client.name}</MenuItem>)
              }
            </Select>
          </FormControl>
        </Grid>
      }
      <Grid item xs={12} md={3} >
        <TextField
          label="Phone"
          placeholder="Phone"
          field="phone1"
          name="phone1"
          value={shipper.phone1 || ''}
          onChange={onChange.bind(this, 'phone1')}
          fullWidth={true} />
      </Grid>
      <Grid item xs={12} md={3} >
        <TextField
          label="Phone (alt)"
          placeholder="Phone (alt)"
          field="phone2"
          name="phone2"
          value={shipper.phone2 || ''}
          onChange={onChange.bind(this, 'phone2')}
          fullWidth={true} />
      </Grid>
      <Grid item xs={12} md={6} />
      <Grid item xs={12} md={6} >
        <TextField
          label="Email"
          placeholder="Email"
          field="email1"
          name="email1"
          value={shipper.email1 || ''}
          onChange={onChange.bind(this, 'email1')}
          fullWidth={true} />
      </Grid>
      <Grid item xs={12} md={6} >
        <TextField
          label="Email (alt)"
          placeholder="Email"
          field="email2"
          name="email2"
          value={shipper.email2 || ''}
          onChange={onChange.bind(this, 'email2')}
          fullWidth={true} />
      </Grid>
      {
        address &&
        <React.Fragment>
          <Grid item xs={12} md={6} >
            <TextField
              label="Address"
              placeholder="Address"
              field="address1"
              name="address1"
              value={shipper.address.address1 || ''}
              onChange={onChange.bind(this, 'address.address1')}
              fullWidth={true} />
          </Grid>
          <Grid item xs={12} md={6} >
            <TextField
              label="Address (cont.)"
              placeholder="Address"
              field="address2"
              name="address2"
              value={shipper.address.address2 || ''}
              onChange={onChange.bind(this, 'address.address2')}
              fullWidth={true} />
          </Grid>
          <Grid item xs={12} md={3} >
            <TextField
              label="City"
              placeholder="City"
              field="city"
              name="city"
              value={shipper.address.city || ''}
              onChange={onChange.bind(this, 'address.city')}
              fullWidth={true} />
          </Grid>
          <Grid item xs={12} md={3} >
            <TextField
              label="State"
              placeholder="State"
              field="state"
              name="state"
              value={shipper.address.state || ''}
              onChange={onChange.bind(this, 'address.state')}
              fullWidth={true} />
          </Grid>
          <Grid item xs={12} md={3} >
            <TextField
              label="Zip"
              placeholder="Zip"
              field="zip"
              name="zip"
              value={shipper.address.zip || ''}
              onChange={onChange.bind(this, 'address.zip')}
              fullWidth={true} />
          </Grid>
          <Grid item xs={12} md={3} />
        </React.Fragment>
      }
      <Grid item xs={12} md={6} >
        <TextField
          multiline
          rowsMax="10"
          label="Notes"
          placeholder="Notes"
          field="notes"
          name="notes"
          value={shipper.notes || ''}
          onChange={onChange.bind(this, 'notes')}
          fullWidth={true} />
      </Grid>
      <Grid item xs={12} md={6} >
        <TextField
          multiline
          rowsMax="10"
          label="Directions"
          placeholder="Directions"
          field="directions"
          name="directions"
          value={shipper.directions || ''}
          onChange={onChange.bind(this, 'directions')}
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
              value={shipper.personalMetadata || ''}
              onChange={onChange.bind(this, 'personalMetadata')}
              fullWidth={true} />
          </Grid> :
          <Grid item xs={12} md={6} />
      }
    </Grid>
  )
}

const { object, func, string, bool, array } = PropTypes;
Shipper.propTypes = {
  classes: object.isRequired,
  shipper: object,
  onChange: func,
  role: string.isRequired,
  isNew: bool.isRequired,
  clients: array.isRequired
};

export default withStyles(styles)(Shipper);