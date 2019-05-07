import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import styles from './ButtonLink.js';

const ButtonLink = ({ classes, location, text, children, type }) => {
  return(
    <Button variant="contained" color={ type }>
      { children}
      <Link className={classes.buttonLink} to={location}>{text}</Link>
    </Button>
  );
};

const { object, string, any } = PropTypes;
ButtonLink.propTypes = {
  classes: object.isRequired,
  location: string.isRequired,
  text: string.isRequired,
  children: any,
  type: string
};

export default withStyles(styles)(ButtonLink);
