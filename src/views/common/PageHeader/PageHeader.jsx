import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import styles from './PageHeaderStyles';

const PageHeader = ({ classes, title, children }) => {
  return (
    <div>
      <h2>{ title }</h2>
    </div>
  )
}

const { object, string } = PropTypes;
PageHeader.propTypes = {
  classes: object.isRequired,
  title: string
}

export default withStyles(styles)(PageHeader);