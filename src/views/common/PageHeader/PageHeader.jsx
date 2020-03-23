import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';
import styles from './PageHeaderStyles';

const PageHeader = ({ classes, pageTitle, pageOptions, attributes }) => {
  return (
    <div className={classNames(classes.headerContainer)} {...attributes}>
      <div className={classes.pageHeaderLeft}>
        <div className={classes.pageTitle}>{pageTitle}</div>
      </div>
      <div className={classes.pageOptions}>
        {pageOptions && pageOptions()}
      </div>
    </div>
  );
};

const { object, string, bool, func } = PropTypes;
PageHeader.propTypes = {
  classes: object.isRequired,
  pageTitle: string.isRequired,
  pageOptions: func,
  attributes: object
};

export default withStyles(styles)(PageHeader);
