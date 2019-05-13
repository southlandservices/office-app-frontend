import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './JobListStyles';
import { Link } from 'react-router-dom';
import { Add } from '@material-ui/icons';
import { Grid } from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import ButtonLink from '../../common/ButtonLink';
import PageHeader from '../../common/PageHeader';
import _ from 'lodash';
import { format } from 'date-fns';
import '../../../assets/styles/table.css';

const columns = [
  {
    label: 'Job',
    name: 'jobLink',
    options: {
      customBodyRender: (value, tableMeta, updateValue) =>
        (<Link to={`/jobs/${value.id}`} className='textLink'>{value.id}</Link>)
    }
  },
  {
    label: 'Client',
    name: 'clientName',
    options: {
      customBodyRender: (value) => 
        (<Link to={`/clients/${value.id}`} className='textLink'>{value.name}</Link>)
    }
  },
  {
    label: 'Rep',
    name: 'southlandRepName',
    options: {
      customBodyRender: (value) =>
        (<Link to={`/users/${value.id}`} className='textLink'>{value.name}</Link>)
    }
  },
  {
    label: 'Shipper',
    name: 'shipper',
    options: {
      customBodyRender: (value) =>
        (<Link to={`/shippers/${value.id}`} className='textLink'>{value.name}</Link>)
    }
  },
  { label: 'Intake', name: 'intakeDate' },
  { label: 'Service', name: 'serviceDate' },
  { label: 'Follow-Up', name: 'followupDate' }
];

const data = (jobs) => {
  return _.map(jobs, job => {
    const jobLink = {
      id: job.id
    };
    const clientName = {
      id: job.client.id,
      name: job.client.name
    };
    const southlandRepName = {
      id: job.southlandRep.id,
      name: `${job.southlandRep.lastName}, ${job.southlandRep.firstName}`
    };
    const shipper = {
      id: job.shipperCustomer.id,
      name: `${job.shipperCustomer.lastName}, ${job.shipperCustomer.firstName}`
    };
    const intakeDate = format(job.intakeDate, 'MM/DD/YYYY');
    const serviceDate = format(job.serviceDate, 'MM/DD/YYYY');
    const followupDate = format(job.followupDate, 'MM/DD/YYYY');
    return Object.assign(job, { jobLink, clientName, southlandRepName, shipper, intakeDate, serviceDate, followupDate });
  });
}

const pageOptions = () => <ButtonLink location="/jobs/create" text="Add New Job" type="primary"><Add /></ButtonLink >

const JobList = ({ classes, jobs }) => {
  return (
    <Grid className="job-list" container spacing={24}>
      <PageHeader pageOptions={pageOptions} pageTitle="Jobs" />
      <MUIDataTable data={data(jobs)} columns={columns} className={ classes.fullWidth } />
    </Grid>
  )
}
const { object, array } = PropTypes;
JobList.propTypes = {
  classes: object.isRequired,
  jobs: array.isRequired,
};

export default withStyles(styles)(JobList);