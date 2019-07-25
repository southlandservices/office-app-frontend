import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Grid, TextField } from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import styles from './ClientStyles';
import '../../../assets/styles/table.css';

const columns = [
  {
    label: 'First Name',
    name: 'clientContactLink',
    options: {
      customBodyRender:
        (value, tableMeta, updateValue) =>
          (<Link to={`/clientContacts/${value.id}`} className='textLink'>{value.name}</Link>)
    }
  },
  { label: 'Last Name', name: 'lastName' },
  { label: 'Client', name: 'clientName' },
  { label: 'Title', name: 'title' },
  { label: 'Phone', name: 'phone1' },
  { label: 'Phone (alt)', name: 'phone2' },
  { label: 'Email', name: 'email' },
];

const data = (clientContacts) => {
  return _.map(clientContacts, clientContact => {
    const clientContactLink = {
      name: clientContact.firstName,
      id: clientContact.id
    };
    const clientName = clientContact.Client.name;
    return Object.assign(clientContact, { clientContactLink, clientName });
  });
}

const Client = ({ classes, client, onChange, role, isNew, clientContacts }) => {
  return (
    <Grid className="client-form" container spacing={3}>
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
      <Grid item xs={12} md={9} />
      <MUIDataTable data={data(clientContacts)} columns={columns} />
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