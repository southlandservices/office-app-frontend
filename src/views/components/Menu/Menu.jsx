import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Button, createMuiTheme } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import componentStyles from './MenuStyles';
import extendStyles from '../../../assets/styles/buttons';

const theme = createMuiTheme();

const Menu = ({ classes }) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.menuBar}>
        <Grid container spacing={24}>
          <NavLink exact to="/" activeClassName={classes.activeLink} className={classes.buttonLink}>
            <Button className={classes.buttonLink}>Dashboard</Button>
          </NavLink>
          <NavLink exact to="/users" activeClassName={classes.activeLink} className={classes.buttonLink}>
            <Button className={classes.buttonLink}>Users</Button>
          </NavLink>
        </Grid>
      </div>
    </div>
  )
}

const { object } = PropTypes;
Menu.propTypes = {
  classes: object.isRequired
};

const extendedStyles = extendStyles(theme, componentStyles);
export default withStyles(extendedStyles)(Menu);