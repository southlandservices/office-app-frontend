import React from 'react';
import _ from 'lodash';
import { format } from 'date-fns';
import DateFnsUtils from "@date-io/moment";
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
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

const Job = ({ classes, job, onChange, role, isNew, southlandRepOptions }) => {
  const { southlandRep, client, shipperCustomer } = job;
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid className="job-form" container spacing={24}>
        {
          !_.isEmpty(southlandRepOptions) &&
          <Grid item xs={12} md={3} >
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="repId">Southland Rep</InputLabel>
              <Select
                value={job.repId || ''}
                onChange={onChange.bind(this, 'repId')}
                inputProps={{
                  name: 'repId',
                  id: 'southlandRep',
                }}
              >
              {
                southlandRepOptions.map(rep => <MenuItem key={rep.id} value={rep.id}>{rep.lastName}, {rep.firstName} ({rep.title})</MenuItem>)
              }
              </Select>
            </FormControl>
          </Grid>
        }
        <Grid item md={9}></Grid>
        {
          !_.isEmpty(job) &&
          <Grid item xs={12} md={3}>
            {/* <TextField
              id="intakeDate"
              label="Intake Date"
              type="datetime-local"
              name="intakeDate"
              value={format(job.intakeDate, 'MM/DD/YYYY HH:mm:ss') || ''}
              onChange={onChange.bind(this, 'intakeDate')} */}
            {/* <KeyboardDateTimePicker
              variant="inline"
              label="Intake Date"
              format="MM/DD/YYYY HH:mm:ss"
              value={job.intakeDate} 
              onChange={onChange.bind(this, 'intakeDate')} /> */}
            />
          </Grid>
        }
      </Grid>
    </MuiPickersUtilsProvider>
  )
}

const { object, func, string, bool, array } = PropTypes;
Job.propTypes = {
  classes: object.isRequired,
  job: object,
  onChange: func,
  role: string.isRequired,
  isNew: bool.isRequired,
  southlandRepOptions: array
};

export default withStyles(styles)(Job);