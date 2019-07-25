import React from 'react';
import _ from 'lodash';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import DateFnsUtils from "@date-io/moment";
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, TextField, Button } from '@material-ui/core';
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
  onChange,
  role,
  isNew,
  southlandRepOptions,
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
        <Grid item md={9}></Grid>
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
          </React.Fragment>
        }
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
  onChange: func,
  role: string.isRequired,
  isNew: bool.isRequired,
  southlandRepOptions: array,
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