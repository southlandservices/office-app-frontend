import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import styles from './HeaderStyles';
import { Link } from 'react-router-dom';

const Header = ({ classes, isAuthenticated, logOut }) => {
  return (
    <AppBar position='static' classes={{ colorPrimary: classes.colorPrimary }}>
      <Toolbar>
        <Typography variant="h2" color="inherit" className={classes.iconContainer}>
          <Link to={'/dashboard'} className={ classes.imgLink }>
            <img src='../../../assets/images/logo.png' className={ classes.logo } />
          </Link>
        </Typography>
        {
          isAuthenticated &&
          <div className={classes.logOut} onClick={logOut}>
            <Button variant="contained" >Log Out</Button>
          </div>
        }
      </Toolbar>
    </AppBar>
  )
};

const { object, bool, func } = PropTypes;
Header.propTypes = {
  classes: object.isRequired,
  isAuthenticated: bool,
  logOut: func.isRequired
};

export default withStyles(styles)(Header);