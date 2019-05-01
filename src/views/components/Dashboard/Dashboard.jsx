import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './DashboardStyles';

const Dashboard = ({ classes }) => {
  return (
    <div>Dashboard View</div>
  )
}

const { object } = PropTypes;
Dashboard.propTypes = {
  classes: object.isRequired
};

export default withStyles(styles)(Dashboard);