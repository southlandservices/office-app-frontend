import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import styles from './TableHeaderStyles';
import { Grid, Button } from '@material-ui/core';
import { Add } from '@material-ui/icons';

const TableHeader = ({ classes, subHeader, buttonText, buttonClick }) => {
  return (
    <Grid item xs={12} md={12}>
      <div className={classes.tableHeaderLeft}>
        <span className={classes.subHeader}>{ subHeader }</span>
      </div>
      { buttonText && buttonClick && 
        <div className={classes.tableHeaderRight}>
          <Button variant='contained' color='primary' onClick={ () => buttonClick({ isNew: true }) }><Add />{ buttonText }</Button>
        </div>
      }
    </Grid>
  )
}

const { object, string, func } = PropTypes;
TableHeader.propTypes = {
  classes: object.isRequired,
  subHeader: string.isRequired,
  buttonText: string,
  buttonClick: func
}

export default withStyles(styles)(TableHeader);