import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, TextField } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

const Job = ({ classes, job, onChange, role, isNew, userOptions }) => {
  const { southlandRep, client, shipperCustomer } = job;
  return (
    <Grid className="job-form" container spacing={24}>
      {/* {
        (!job.id || (job.id && !_.isEmpty(southlandRep))) && 
        <Grid item xs={12} md={3} >
          <TextField
            label="Southland Rep"
            placeholder="Southland Rep"
            field="firstName"
            name="firstName"
            value={job.southlandRep.firstName || ''}
            onChange={onChange.bind(this, 'southlandRep.firstName')}
            fullWidth={true} />
        </Grid>
      } */}
      hi
    </Grid>
  )
}

const { object, func, string, bool, array } = PropTypes;
Job.propTypes = {
  classes: object.isRequired,
  job: object,
  onChange: func,
  role: string.isRequired,
  isNew: bool.isRequired,
  userOptions: array
};

export default withStyles(styles)(Job);