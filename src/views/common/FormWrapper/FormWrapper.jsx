import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import classnames from 'classnames';

const renderChildren = (props) => {
  return React.Children.map(props.children, child => {
    return React.cloneElement(child, props);
  });
};

const FormWrapper = (props) => {
  const { classes, onPersist, isNew, saveInProgress, name, otherProps } = props;

  return (
    <div className={classnames('form-container')} {...otherProps}>
      <Grid name={name} container spacing={24} role="form">
        {renderChildren(props)}
        <Grid container spacing={24}>
          <Grid item md={12} />
          <Grid item md={1}>
            <Button
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
  classes: object.isRequired,
  onChange: func.isRequired,
  onPersist: func.isRequired,
  otherProps: object,
  name: string
};

export default FormWrapper;
