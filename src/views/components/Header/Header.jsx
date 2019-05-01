import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import styles from './HeaderStyles';

const Header = ({ classes }) => {
  return (
    <AppBar position='static' classes={{ colorPrimary: classes.colorPrimary }}>
      <Toolbar className={ classes.iconContainer }>
        <Typography variant="title" color="inherit">
          <img src='../assets/images/logo.jpg' className={ classes.logo } />
        </Typography>
      </Toolbar>
    </AppBar>
  )
};

const { object } = PropTypes;
Header.propTypes = {
  classes: object.isRequired
};

export default withStyles(styles)(Header);