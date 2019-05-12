import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './ClientListStyles';
import { Link } from 'react-router-dom';
import { Add } from '@material-ui/icons';
import MUIDataTable from 'mui-datatables';
import ButtonLink from '../../common/ButtonLink';
import PageHeader from '../../common/PageHeader';
import _ from 'lodash';
import '../../../assets/styles/table.css';

const columns = [
  {
    label: 'Client',
    name: 'clientLink',
    options: {
      customBodyRender:
        (value, tableMeta, updateValue) =>
          (<Link to={`/clients/${value.id}`} className='textLink'>{value.name}</Link>)
    }
  },
];

const data = (clients) => {
  return _.map(clients, client => {
    const clientLink = {
      name: client.name,
      id: client.id
    };
    return Object.assign(client, { clientLink });
  });
}

const pageOptions = () => <ButtonLink location="/clients/create" text="Add New Client" type="primary"><Add /></ButtonLink >

const ClientList = ({ classes, clients }) => {
  return (
    <div>
      <PageHeader pageOptions={pageOptions} pageTitle="Clients" />
      <MUIDataTable data={data(clients)} columns={columns} />
    </div>
  )
}
const { object, array } = PropTypes;
ClientList.propTypes = {
  classes: object.isRequired,
  clients: array.isRequired,
};

export default withStyles(styles)(ClientList);