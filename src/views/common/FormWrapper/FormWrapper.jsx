import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import styles from './FormWrapperStyles'

const renderChildren = (props) => {
  return React.Children.map(props.children, child => {
    return React.cloneElement(child, props);
  });
};

const FormWrapper = (props) => {
  const { onPersist, isNew, saveInProgress, name, otherProps, classes } = props;

  return (
    <div className={ classes.formContainer } {...otherProps}>
      <Grid name={name} container spacing={3} role="form">
        {renderChildren(props)}
        <Grid container spacing={3}>
          <Grid item md={12} />
          <Grid item md={1}>
            <Button
              variant="contained"
              color="primary"
              onClick={onPersist}
              disabled={saveInProgress}
              name={isNew ? 'create' : 'update'}>
              {isNew ? 'Create' : 'Update'}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

const { object, bool, func, string } = PropTypes;

FormWrapper.propTypes = {
  item: object,
  isNew: bool.isRequired,
  saveInProgress: bool.isRequired,
  onChange: func.isRequired,
  onPersist: func.isRequired,
  otherProps: object,
  name: string,
  role: string.isRequired
};

export default withStyles(styles)(FormWrapper);
