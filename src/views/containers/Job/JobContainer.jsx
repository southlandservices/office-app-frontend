import React from 'react';
import PropTypes, { any } from 'prop-types';
import { connect } from 'react-redux';
import { boundMethod } from 'autobind-decorator';
import { Redirect } from 'react-router-dom';
import { jobOperations } from '../../../state/job';
import { userOperations } from '../../../state/user';
import { noteOperations } from '../../../state/note';
import { jobItemOperations } from '../../../state/jobItem';
import { clientOperations } from '../../../state/client';
import CreateEditComponent from '../../common/CreateEditComponent';
import PageHeader from '../../common/PageHeader';
import View from '../../common/FormWrapper';
import Form from '../../components/Job';
import { decodeToken, removeValueFromNestedArray } from '../../../utils/misc';

class Job extends CreateEditComponent {

  constructor(props, context) {
    super(props, context, 'id');
    this.init();
  }

  componentDidMount() {
    this.getItem();
    this.props.listNotes(this.props.id, 'job');
    this.props.listSouthlandReps();
    this.props.listClients();
    this.props.listJobItems(this.props.id);
  }

  @boundMethod
  handleChange(name, event) {
    const value = !!event.target ? event.target.value : event.toISOString();
    this.change(name, value, this.props.job);
  }

  @boundMethod
  handleItemChange(name, item, event) {
    const newItem = Object.assign({}, item, { [name]: event.target.value });
    this.setState({ dialogItem: newItem });
  }

  @boundMethod
  handlePersist() {
    this.persist({
      item: this.props.job,
      addFn: this.props.addJob,
      updateFn: this.props.updateJob
    });
  }

  // note dialog
  @boundMethod
  openNoteDialog(data) {
    this.openDialog(data);
  }

  @boundMethod
  closeNoteDialog() {
    this.closeDialog();
  }

  refreshNotes() {
    this.closeDialog();
    this.props.listNotes(this.props.id, 'job');
  }

  @boundMethod
  handlePersistNote(id, data, isAdmin) {
    this.persistNote({
      note: { id, isAdmin, note: data.note, jobId: this.props.id, submitterId: this.props.user.id },
      addFn: this.props.addNote,
      updateFn: this.props.updateNote,
      isNew: !id,
      typeSlug: 'job',
      callback: () => {
        this.refreshNotes();
      }
    });
  }

  // items
  @boundMethod
  handleJobItemChange(name, event) {
    this.setState({ jobItem: Object.assign(this.state.jobItem, { [name]: event.target.value } ) });
  }

  @boundMethod
  handlePersistJobItem(id) {
    debugger;
    // this.props.addJobItem(this.state.jobItem)
    this.persistJobItem({
      jobItem: { jobId: this.props.id, ...this.state.jobItem },
      addFn: this.props.addJobItem,
      updateFn: this.props.updateJobItem,
      isNew: !id,
      callback: () => {
        this.refreshJobItems();
      }
    });
  }

  refreshJobItems() {
    this.props.listJobItems(this.props.id);
  }
  
  render() {
    const { isNew, redirectToList, isSaving, dialogOpen, dialogItem } = this.state;
    const { job, notes, adminNotes, jobItems } = this.props;
    const decoded = decodeToken(localStorage.getItem('token'));
    const { role } = decoded;
    return (
      <div>
        <PageHeader pageTitle={isNew ? 'Add Job' : 'Update Job' } />
        {
          redirectToList ?
          <Redirect to="/jobs" /> :
          <View
            onChange={this.handleChange}
            onPersist={this.handlePersist}
            isNew={isNew}
            saveInProgress={isSaving}
            item={job}
            role={ role }
            notes={notes}
            adminNotes={adminNotes}
            // note dialog
            dialogOpen={dialogOpen}
            dialogItem={dialogItem}
            openNoteDialog={this.openNoteDialog}
            closeNoteDialog={this.closeNoteDialog}
            onPersistNote={this.handlePersistNote} // add/update to the db
            onChangeNote={this.handleItemChange}  // local change to text field
            // items
            jobItems={ jobItems }
            jobItem={this.state.jobItem}
            handleJobItemChange={this.handleJobItemChange}
            onPersistJobItem={this.handlePersistJobItem}
            {...this.props}>
            <Form />
          </View>
        }
      </div>
    )
  }
}

const { func, string, object, array } = PropTypes;

Job.propTypes = {
  get: func.isRequired,
  addJob: func.isRequired,
  updateJob: func.isRequired,
  editRefresh: func.isRequired,
  id: string,
  job: object,
  listSouthlandReps: any
};

const mapStateToProps = ({ jobState, userState, clientState, noteState, jobItemState }) => {
  return { 
    job: jobState.job,
    user: userState.user,
    southlandRepOptions: userState.users,
    clientOptions: clientState.clients,
    notes: noteState.notes,
    adminNotes: noteState.adminNotes,
    jobItems: jobItemState.jobItems
  };
};

const { get, editRefresh, addJob, updateJob } = jobOperations;
const { list: listSouthlandReps } = userOperations;
const { listNotes, updateNote, addNote } = noteOperations;
const { listJobItems, addJobItem, updateJobItem } = jobItemOperations;
const { list: listClients } = clientOperations;

const mapDispatchToProps = {
  get, 
  editRefresh,
  addJob,
  updateJob,
  listSouthlandReps,
  listClients,
  listNotes,
  updateNote,
  addNote,
  listJobItems,
  addJobItem,
  updateJobItem
};

export default connect(mapStateToProps, mapDispatchToProps)(Job);