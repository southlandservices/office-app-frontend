import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Button, createMuiTheme } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import componentStyles from './MenuStyles';
import extendStyles from '../../../assets/styles/buttons';

const theme = createMuiTheme();

const Menu = ({ classes, authenticated, checkFn }) => {
  if(!!authenticated) {
    return (
      <div className={classes.wrapper}>
        <div className={classes.menuBar}>
          <Grid container spacing={24}>
            <NavLink exact to="/dashboard" activeClassName={classes.activeLink} className={classes.buttonLink}>
              <Button className={classes.buttonLink}>Dashboard</Button>
            </NavLink>
            {
              checkFn('users') && 
              <NavLink to="/users" activeClassName={classes.activeLink} className={classes.buttonLink}>
                <Button className={classes.buttonLink}>Users</Button>
              </NavLink>
            }
            {
              checkFn('clients') &&
              <NavLink to="/clients" activeClassName={classes.activeLink} className={classes.buttonLink}>
                <Button className={classes.buttonLink}>Clients</Button>
              </NavLink>
            }
            {
              checkFn('clientContacts') &&
              <NavLink to="/clientContacts" activeClassName={classes.activeLink} className={classes.buttonLink}>
                <Button className={classes.buttonLink}>Client Contacts</Button>
              </NavLink>
            }
            {
              checkFn('jobs') &&
              <NavLink to="/jobs" activeClassName={classes.activeLink} className={classes.buttonLink}>
                <Button className={classes.buttonLink}>Jobs</Button>
              </NavLink>
            }
          </Grid>
        </div>
      </div>
    )  
  } else {
    return false;
  }
  
}

const { object, bool, func } = PropTypes;
Menu.propTypes = {
  classes: object.isRequired,
  authenticated: PropTypes.oneOfType([ bool, object ]),
  checkFn: func.isRequired
};

const extendedStyles = extendStyles(theme, componentStyles);
export default withStyles(extendedStyles)(Menu);