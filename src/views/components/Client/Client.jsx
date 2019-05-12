import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Grid, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import styles from './ClientStyles';

const Client = ({ classes, client, onChange, role, isNew, clientContacts }) => {
  return (
    <Grid className="client-form" container spacing={24}>
      <Grid item xs={12} md={3} >
        <TextField
          label="Name"
          placeholder="Name"
          field="name"
          name="name"
          value={client.name || ''}
          onChange={onChange.bind(this, 'name')}
          fullWidth={true} />
      </Grid>
    </Grid>
  )
}

const { object, func, string, bool, array } = PropTypes;
Client.propTypes = {
  classes: object.isRequired,
  client: object,
  onChange: func,
  role: string.isRequired,
  isNew: bool.isRequired,
  clientContacts: array.isRequired
};

export default withStyles(styles)(Client);