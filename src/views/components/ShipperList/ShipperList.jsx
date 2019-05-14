import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './ShipperListStyles';
import { Link } from 'react-router-dom';
import { Add } from '@material-ui/icons';
import { Grid } from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import ButtonLink from '../../common/ButtonLink';
import PageHeader from '../../common/PageHeader';
import _ from 'lodash';
import '../../../assets/styles/table.css';

const columns = [
  {
    label: 'First Name',
    name: 'shipperLink',
    options: {
      customBodyRender: 
        (value, tableMeta, updateValue) => 
        ( <Link to={`/shippers/${value.id}`} className='textLink'>{ value.name }</Link> )
    } 
  },
  { label: 'Last Name', name: 'lastName' },
  { label: 'Title', name: 'title' },
  { label: 'Phone', name: 'phone1' },
  { label: 'Phone (alt)', name: 'phone2' },
  { label: 'Email', name: 'email1' }
];

const data = (shippers) => {
  return _.map(shippers, shipper => {
    const shipperLink = {
      name: shipper.firstName,
      id: shipper.id
    }
    return Object.assign(shipper, { shipperLink });
  });
}

const pageOptions = () => <ButtonLink location = "/shippers/create" text = "Add New Shipper" type="primary"><Add /></ButtonLink >

const ShipperList = ({ classes, shippers, tableOptions }) => {
  return (
    <Grid className="shipper-list" container spacing={24}>
      <PageHeader pageOptions={ pageOptions } pageTitle="Shippers" />
      <MUIDataTable data={data(shippers)} columns={columns} className={classes.fullWidth} />
    </Grid>
  )
}

const { object, array } = PropTypes;
ShipperList.propTypes = {
  classes: object.isRequired,
  shippers: array.isRequired
};

export default withStyles(styles)(ShipperList);