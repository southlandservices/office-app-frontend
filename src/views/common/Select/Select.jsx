import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    minWidth: 120,
  }
};

const Select = (props) => {
  const { classes, options, label, value, field, name, onChange, helperText, disabled } = props;

  return (
    <span>
      <FormControl style={{ minWidth: 120 }}>
        <InputLabel htmlFor={name}>{label}</InputLabel>
        {
          !_.isEmpty(value) && !_.isEmpty(options) &&
          <TextField
            select
            value={value.toString() || ''}
            label={label}
            name={name || label.replace(/\s/g, '')}
            disabled={disabled}
            onChange={onChange || null}
            inputProps={{
              name,
              id: field,
            }}
          >
            {
              options && 
              options.map(option => 
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              )
            }
          </TextField>
        }
      </FormControl>
    </span>
  )
}

const { object, string, bool, func, array, number } = PropTypes;
Select.propTypes = {
  classes: object,
  options: array,
  label: string,
  value: string,
  field: string,
  name: string,
  disabled: bool,
  onChange: func,
  helperText: string,
  errors: object
};

export default withStyles(styles)(Select)
