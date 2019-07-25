import React from 'react';
import _ from 'lodash';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import DateFnsUtils from "@date-io/moment";
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, TextField, Button, Checkbox, FormControlLabel } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MUIDataTable from 'mui-datatables';
import TableHeader from '../../common/TableHeader';
import Dialog from '../Dialog';

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

const noteColumns = [
  {
    label: '',
    name: 'editLink',
    options: {
      customBodyRender: (value, tableMeta, updateValue) =>
        (<Button color='primary' onClick={() => value.clickHandler(value.note)}>Edit</Button>)
    }
  },
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

const formatNotes = (notes, formatNoteDialog, isAdmin) => {
  return _.map(notes, note => {
    const submitterLink = {
      id: note.submitterId,
      name: `${note.submitter.lastName}, ${note.submitter.firstName}`
    };
    const editLink = { note, clickHandler: formatNoteDialog };
    const createdOn = format(note.createdAt, 'MM/DD/YYYY HH:mm:ss');
    const updatedOn = format(note.updatedAt, 'MM/DD/YYYY HH:mm:ss');
    return Object.assign(note, { submitterLink, editLink, createdOn, updatedOn, isAdmin });
  });
}

const Job = ({ 
  classes,
  job,
  user,
  onChange,
  role,
  isNew,
  southlandRepOptions,
  clientOptions,
  notes,
  adminNotes,
  dialogOpen,
  dialogItem,
  openNoteDialog,
  closeNoteDialog,
  onChangeNote,
  onPersistNote }) => {
  const { southlandRep, client, shipperCustomer } = job;
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      {/* Internal Metadata */}
      <Grid className="job-form" container spacing={3}>
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
        {
          !_.isEmpty(clientOptions) &&
          <Grid item xs={12} md={3} >
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="clientId">Client</InputLabel>
              <Select
                value={job.clientId || ''}
                onChange={onChange.bind(this, 'clientId')}
                inputProps={{
                  name: 'clientId',
                  id: 'clientId',
                }}
              >
              {
                clientOptions.map(client => <MenuItem key={client.id} value={client.id}>{client.name}</MenuItem>)
              }
              </Select>
            </FormControl>
          </Grid>
        }
        <Grid item md={6}></Grid>
        {
          !_.isEmpty(job) &&
          <React.Fragment>
            <Grid item xs={12} md={3}>
              <KeyboardDateTimePicker
                variant="inline"
                label="Intake Date"
                format="MM/DD/YYYY HH:mm:ss"
                value={job.intakeDate} 
                onChange={onChange.bind(this, 'intakeDate')} />
            </Grid>
            <Grid item xs={12} md={3}>
              <KeyboardDateTimePicker
                variant="inline"
                label="Follow-Up Date"
                format="MM/DD/YYYY HH:mm:ss"
                value={job.followupDate}
                onChange={onChange.bind(this, 'followupDate')} />
            </Grid>
            <Grid item xs={12} md={3}>
              <KeyboardDateTimePicker
                variant="inline"
                label="Service Date"
                format="MM/DD/YYYY HH:mm:ss"
                value={job.serviceDate}
                onChange={onChange.bind(this, 'serviceDate')} />
            </Grid>
            <Grid item md={3}></Grid>
          </React.Fragment>
        }

        {
          !_.isEmpty(job) &&
          <React.Fragment>

            {/* Customer/Shipper Name & Address */}

            <Grid item xs={12} md={3} >
              <TextField
                label="First Name"
                placeholder="First Name"
                field="firstName"
                name="firstName"
                value={job.shipperCustomer.firstName || ''}
                onChange={onChange.bind(this, 'shipperCustomer.firstName')}
                fullWidth={true} />
            </Grid>
            <Grid item xs={12} md={3} >
              <TextField
                label="Last Name"
                placeholder="Last Name"
                field="lastName"
                name="lastName"
                value={job.shipperCustomer.lastName || ''}
                onChange={onChange.bind(this, 'shipperCustomer.lastName')}
                fullWidth={true} />
            </Grid>
            <Grid item md={3}></Grid>

            <Grid item xs={12} md={6} >
              <TextField
                label="Address"
                placeholder="Address"
                field="address1"
                name="address1"
                value={job.address.address1 || ''}
                onChange={onChange.bind(this, 'address.address1')}
                fullWidth={true} />
            </Grid>
            <Grid item xs={12} md={6} >
              <TextField
                label="Address (cont.)"
                placeholder="Address"
                field="address2"
                name="address2"
                value={job.address.address2 || ''}
                onChange={onChange.bind(this, 'address.address2')}
                fullWidth={true} />
            </Grid>
            <Grid item xs={12} md={3} >
              <TextField
                label="City"
                placeholder="City"
                field="city"
                name="city"
                value={job.address.city || ''}
                onChange={onChange.bind(this, 'address.city')}
                fullWidth={true} />
            </Grid>
            <Grid item xs={12} md={3} >
              <TextField
                label="State"
                placeholder="State"
                field="state"
                name="state"
                value={job.address.state || ''}
                onChange={onChange.bind(this, 'address.state')}
                fullWidth={true} />
            </Grid>
            <Grid item xs={12} md={3} >
              <TextField
                label="Zip"
                placeholder="Zip"
                field="zip"
                name="zip"
                value={job.address.zip || ''}
                onChange={onChange.bind(this, 'address.zip')}
                fullWidth={true} />
            </Grid>
            <Grid item xs={12} md={3} />

            {/* Billing */}
            <Grid item xs={12} md={3} >
              <FormControlLabel
                value={job.billable}
                control={<Checkbox color="primary" />}
                label="Billable"
                labelPlacement="start" />
            </Grid>
            <Grid item xs={12} md={3} >
              <TextField
                label="Cost"
                placeholder="Cost"
                field="cost"
                name="cost"
                value={job.cost || ''}
                onChange={onChange.bind(this, 'cost')}
                fullWidth={true} />
            </Grid>
            <Grid item xs={12} md={3} >
              <TextField
                label="Net"
                placeholder="Net"
                field="net"
                name="net"
                value={job.net || ''}
                onChange={onChange.bind(this, 'net')}
                fullWidth={true} />
            </Grid>
            {
              (role === 'Admin')
                ? <Grid item xs={12} md={3} >
                  <TextField
                    label="Tech Auth. Limit"
                    placeholder="TechAuthLimit"
                    field="techAuthLimit"
                    name="techAuthLimit"
                    value={job.techAuthLimit || ''}
                    onChange={onChange.bind(this, 'techAuthLimit')}
                    fullWidth={true} />
                </Grid>
                : <Grid item xs={12} md={3} />
            }

          </React.Fragment>
        }

        {/* Notes */}

        <TableHeader subHeader='Notes' buttonText='Add Note' buttonClick={() => openNoteDialog({ isAdmin: false, isNew: true })} />
        <Grid item xs={12} md={12}>
          <MUIDataTable data={formatNotes(notes, openNoteDialog)} columns={noteColumns} />
        </Grid>
        {
          role === 'Admin' &&
          <React.Fragment>
            <TableHeader subHeader='Admin Notes' buttonText='Add Admin Note' buttonClick={() => openNoteDialog({ isAdmin: true, isNew: true })} />
            <Grid item xs={12} md={12} >
              <MUIDataTable data={formatNotes(adminNotes, openNoteDialog, true)} columns={noteColumns} />
            </Grid>
          </React.Fragment>
        }
        <Dialog
          dialogOpen={dialogOpen}
          closeDialog={closeNoteDialog}
          dialogItem={dialogItem}
          dialogTitle={dialogItem.id ? 'Update Note' : 'Add Note'}
          onPersistNote={onPersistNote}
        >
          <TextField
            label="Note"
            placeholder="note"
            field='note'
            name='note'
            value={dialogItem.note || ''}
            onChange={onChangeNote.bind(this, 'note', dialogItem)}
            fullWidth={true} />
        </Dialog>
      </Grid>
    </MuiPickersUtilsProvider>
  )
}

const { object, func, string, bool, array } = PropTypes;
Job.propTypes = {
  classes: object.isRequired,
  job: object,
  user: object,
  onChange: func,
  role: string.isRequired,
  isNew: bool.isRequired,
  southlandRepOptions: array,
  clientOptions: array,
  notes: array,
  adminNotes: array,
  dialogOpen: bool.isRequired,
  dialogItem: object,
  openNoteDialog: func.isRequired,
  closeNoteDialog: func.isRequired,
  onChangeNote: func.isRequired,
  onPersistNote: func.isRequired
};

export default withStyles(styles)(Job);