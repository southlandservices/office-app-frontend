import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './FooterStyles';

const Footer = ({ classes }) => {
  return (
    <div className={ classes.wrapper }>
      <div>&copy;2004-2019 Southland Service Group, Inc.</div>
      <div>All Rights Reserved</div>
      <div>
        <a className={ classes.mapLink } href="https://goo.gl/maps/3lJhR" target="_blank">485 Horizon Drive, Suite 800, Suwanee, GA 30024-7742</a>
      </div>
      <div>Want to talk to a human? We would love to hear from you: 770-717-2770</div>
    </div>
  )
};

const { object } = PropTypes;
Footer.propTypes = {
  classes: object.isRequired
};

export default withStyles(styles)(Footer);