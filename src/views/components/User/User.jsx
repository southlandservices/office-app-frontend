import React from 'react';
import _ from 'lodash';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, TextField } from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
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
  subHeader: {
    fontSize: 24,
    fontWeight: 500
  }
});

const noteColumns = [
  { label: 'Note', name: 'note' },
  {
    label: 'Submitter',
    name: 'submitterLink',
    options: {
      customBodyRender:
        (value, tableMeta, updateValue) =>
          (<Link to={`/users/${value.id}`} className='textLink'>{value.name}</Link>)
    }
  },
  { label: 'Created', name: 'createdOn' },
  { label: 'Updated', name: 'updatedOn' }
]

const formatNotes = (notes) => {
  return _.map(notes, note => {
    const submitterLink = {
      id: note.submitterId,
      name: `${note.submitter.lastName}, ${note.submitter.firstName}`
    };
    const createdOn = format(note.createdAt, 'MM/DD/YYYY HH:mm:ss');
    const updatedOn = format(note.updatedAt, 'MM/DD/YYYY HH:mm:ss');
    return Object.assign(note, { submitterLink, createdOn, updatedOn });
  });
}

const adminNoteColumns = [
  { label: 'Note', name: 'note' },
  {
    label: 'Submitter',
    name: 'submitterLink',
    options: {
      customBodyRender:
        (value, tableMeta, updateValue) =>
          (<Link to={`/users/${value.id}`} className='textLink'>{value.name}</Link>)
    }
  },
  { label: 'Created', name: 'createdOn' },
  { label: 'Updated', name: 'updatedOn' }
]

const formatAdminNotes = (notes) => {
  return _.map(notes, note => {
    const submitterLink = {
      id: note.submitterId,
      name: `${note.submitter.lastName}, ${note.submitter.firstName}`
    };
    const createdOn = format(note.createdAt, 'MM/DD/YYYY HH:mm:ss');
    const updatedOn = format(note.updatedAt, 'MM/DD/YYYY HH:mm:ss');
    return Object.assign(note, { submitterLink, createdOn, updatedOn });
  });
}

const User = ({ classes, user, onChange, role, isNew, roles, notes, adminNotes }) => {
  return (
    <Grid className="user-form" container spacing={24}>
      <Grid item xs={12} md={3} >
        <TextField
          label="First Name"
          placeholder="First Name"
          field="firstName"
          name="firstName"
          value={user.firstName || ''}
          onChange={onChange.bind(this, 'firstName')}
          fullWidth={true} />
      </Grid>
      <Grid item xs={12} md={3} >
        <TextField
          label="Last Name"
          placeholder="LastName"
          field="lastName"
          name="lastName"
          value={user.lastName || ''}
          onChange={onChange.bind(this, 'lastName')}
          fullWidth={true} />
      </Grid>
      <Grid item xs={12} md={3} >
        <TextField
          label="Title"
          placeholder="Title"
          field="title"
          name="title"
          value={user.title || ''}
          onChange={onChange.bind(this, 'title')}
          fullWidth={true} />
      </Grid>
      {
        !_.isEmpty(roles) &&
          <Grid item xs={12} md={3} >
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="role">Role</InputLabel>
              <Select
                value={user.roleId || ''}
                onChange={onChange.bind(this, 'roleId')}
                inputProps={{
                  name: 'roleId',
                  id: 'role',
                }}
              >
              {
                roles.map(role => <MenuItem key={role.id} value={role.id}>{role.name}</MenuItem>)
              }
              </Select>
            </FormControl>
          </Grid>
      }
      <Grid item xs={12} md={3} >
        <TextField
          label="Phone"
          placeholder="Phone"
          field="phone1"
          name="phone1"
          value={user.phone1 || ''}
          onChange={onChange.bind(this, 'phone1')}
          fullWidth={true} />
      </Grid>
      <Grid item xs={12} md={3} >
        <TextField
          label="Phone (alt)"
          placeholder="Phone (alt)"
          field="phone2"
          name="phone2"
          value={user.phone2 || ''}
          onChange={onChange.bind(this, 'phone2')}
          fullWidth={true} />
      </Grid>
      <Grid item xs={12} md={6} >
        <TextField
          label="Email"
          placeholder="Email"
          field="email"
          name="email"
          value={user.email || ''}
          onChange={onChange.bind(this, 'email')}
          fullWidth={true} />
      </Grid>
      {/* <Grid item xs={12} md={6} >
        <TextField
          multiline
          rowsMax="10"
          label="Notes"
          placeholder="Notes"
          field="notes"
          name="notes"
          value={user.notes || ''}
          onChange={onChange.bind(this, 'notes')}
          fullWidth={true} />
      </Grid>
      {
        role === 'Admin' ?
          <Grid item xs={12} md={6} >
            <TextField
              multiline
              rowsMax="10"
              label="Admin Notes"
              placeholder="Admin Notes"
              field="personalMetadata"
              name="personalMetadata"
              value={user.personalMetadata || ''}
              onChange={onChange.bind(this, 'personalMetadata')}
              fullWidth={true} />
          </Grid> :
          <Grid item xs={12} md={6} />
      } */}
      {
        (role === 'Admin' && isNew) &&
        <React.Fragment>
          <Grid item xs={12} md={3} >
            <TextField
              label="Password"
              placeholder="Password"
              field="password"
              name="password"
              value={user.password || ''}
              onChange={onChange.bind(this, 'password')}
              fullWidth={true} />
          </Grid>
          <Grid item xs={12} md={9} />
        </React.Fragment>
      }
      <Grid item xs={12} md={12}>
        <h2 className={ classes.subHeader }>Notes</h2>
        <MUIDataTable data={ formatNotes(notes) } columns={ noteColumns } />
      </Grid>
      {
        role === 'Admin' &&
        <Grid item xs={12} md={12} >
          <h2 className={classes.subHeader}>Admin Notes</h2>
          <MUIDataTable data={formatAdminNotes(adminNotes)} columns={adminNoteColumns} />
        </Grid>
      }
    </Grid>
  )
}

const { object, func, string, bool, array } = PropTypes;
User.propTypes = {
  classes: object.isRequired,
  user: object,
  onChange: func,
  role: string.isRequired,
  isNew: bool.isRequired,
  roles: array.isRequired,
  notes: array,
  adminNotes: array
};

export default withStyles(styles)(User);