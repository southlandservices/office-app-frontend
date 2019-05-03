import React from 'react';
import PropTypes from 'prop-types';
import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import { Face, Fingerprint } from '@material-ui/icons'
import styles from './LoginStyles';

const Login = ({ classes, handleChange, submitForm, email, password }) => {
  return (
    <Paper className={classes.paper}>
      <div className={classes.margin}>
        <Grid container spacing={8} alignItems="flex-end">
          <Grid item>
            <Face />
          </Grid>
          <Grid item md={true} sm={true} xs={true}>
            <TextField 
              onChange={ handleChange.bind(this, 'email') } 
              id="email" 
              label="Email" 
              type="email" 
              field="email" 
              value={ email } 
              fullWidth 
              autoFocus 
              required />
          </Grid>
        </Grid>
        <Grid container spacing={8} alignItems="flex-end">
          <Grid item>
            <Fingerprint />
          </Grid>
          <Grid item md={true} sm={true} xs={true}>
            <TextField
              onChange={handleChange.bind(this, 'password')}
              id="password"
              label="Password"
              type="password"
              field="password"
              value={password}
              fullWidth 
              required />
          </Grid>
        </Grid>
        <Grid container alignItems="center" justify="space-between">
          <Grid item>
            <FormControlLabel control={
              <Checkbox
                  color="primary"
              />
            } label="Remember me" />
          </Grid>
          <Grid item>
            <Button disableFocusRipple disableRipple style={{ textTransform: "none" }} variant="text" color="primary">Forgot password ?</Button>
          </Grid>
        </Grid>
        <Grid container justify="center" style={{ marginTop: '10px' }}>
          <Button variant="outlined" color="primary" style={{ textTransform: "none" }} onClick={ submitForm }>Login</Button>
        </Grid>
      </div>
    </Paper>
  )
}

const { object, func, string } = PropTypes;
Login.propTypes = {
  classes: object.isRequired,
  handleChange: func.isRequired,
  submitForm: func.isRequired,
  email: string.isRequired,
  password: string.isRequired
};

export default withStyles(styles)(Login);