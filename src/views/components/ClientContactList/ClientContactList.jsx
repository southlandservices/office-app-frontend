import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './ClientContactListStyles';
import { Link } from 'react-router-dom';
import { Add } from '@material-ui/icons';
import MUIDataTable from 'mui-datatables';
import ButtonLink from '../../common/ButtonLink';
import PageHeader from '../../common/PageHeader';
import _ from 'lodash';
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

const pageOptions = () => <ButtonLink location="/clientContacts/create" text="Add New Client Contact" type="primary"><Add /></ButtonLink >

const ClientContactList = ({ classes, clientContacts }) => {
  return (
    <div>
      <PageHeader pageOptions={pageOptions} pageTitle="Client Contacts" />
      <MUIDataTable data={data(clientContacts)} columns={columns} />
    </div>
  )
}
const { object, array } = PropTypes;
ClientContactList.propTypes = {
  classes: object.isRequired,
  clientContacts: array.isRequired,
};

export default withStyles(styles)(ClientContactList);