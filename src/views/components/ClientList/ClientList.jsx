import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import styles from './ClientListStyles';
import { Link } from 'react-router-dom';
import { Add } from '@material-ui/icons';
import { Grid } from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import ButtonLink from '../../common/ButtonLink';
import PageHeader from '../../common/PageHeader';
import _ from 'lodash';
import '../../../assets/styles/table.css';

const getMuiTheme = () => createMuiTheme({
  overrides: {
    MUIDataTableHeadCell: {
      root: {
        '&:nth-child(1)': {
          width: 20
        }
      }
    },
    MUIDataTableSelectCell: {
      root: {
        '&:nth-child(1)': {
          width: 20
        }
      }
    }
  }
});

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
    <Grid className="client-contact-list" container spacing={24}>
      <PageHeader pageOptions={pageOptions} pageTitle="Clients" />
      <MuiThemeProvider theme={getMuiTheme()}>
        <MUIDataTable data={data(clients)} columns={columns} className={ classes.fullWidth } />
      </MuiThemeProvider>
    </Grid>
  )
}
const { object, array } = PropTypes;
ClientList.propTypes = {
  classes: object.isRequired,
  clients: array.isRequired,
};

export default withStyles(styles)(ClientList);