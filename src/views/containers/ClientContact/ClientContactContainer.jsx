import React from 'react';
import PropTypes, { any } from 'prop-types';
import { connect } from 'react-redux';
import { boundMethod } from 'autobind-decorator';
import { Redirect } from 'react-router-dom';
import { clientContactOperations } from '../../../state/clientContact';
import { clientOperations } from '../../../state/client';
import { noteOperations } from '../../../state/note';
import CreateEditComponent from '../../common/CreateEditComponent';
import PageHeader from '../../common/PageHeader';
import View from '../../common/FormWrapper';
import Form from '../../components/ClientContact';
import { decodeToken, removeValueFromNestedArray } from '../../../utils/misc';

class ClientContact extends CreateEditComponent {

  constructor(props, context) {
    super(props, context, 'id');
    this.init();
  }

  componentDidMount() {
    this.getItem();
    this.props.listNotes(this.props.id, 'clientContact');
    this.props.listClients()
  }

  @boundMethod
  handleChange(name, event) {
    this.change(name, event.target.value, this.props.clientContact);
  }

  @boundMethod
  handleItemChange(name, item, event) {
    const newItem = Object.assign({}, item, { [name]: event.target.value });
    this.setState({ dialogItem: newItem });
  }

  @boundMethod
  handlePersist() {
    this.persist({
      item: this.props.clientContact,
      addFn: this.props.addClientContact,
      updateFn: this.props.updateClientContact
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
    this.props.listNotes(this.props.id, 'user');
  }

  @boundMethod
  handlePersistNote(id, data, isAdmin) {
    this.persistNote({
      note: { id, isAdmin, note: data.note, userId: this.props.user.id },
      addFn: this.props.addNote,
      updateFn: this.props.updateNote,
      isNew: !id,
      typeSlug: 'user',
      callback: () => {
        this.refreshNotes();
      }
    });
  }

  render() {
    const { isNew, redirectToList, isSaving, dialogOpen, dialogItem } = this.state;
    const { clientContact, clients, notes, adminNotes } = this.props;
    const decoded = decodeToken(localStorage.getItem('token'));
    const { role } = decoded;
    return (
      <div>
        <PageHeader pageTitle={ isNew ? 'Add Client Contact' : 'Update Client Contact' } />
        {
          redirectToList ?
          <Redirect to="/clientContacts" /> :
          <View
            onChange={this.handleChange}
            onPersist={this.handlePersist}
            isNew={isNew}
            saveInProgress={isSaving}
            item={clientContact}
            role={ role }
            notes={notes}
            adminNotes={adminNotes}
            // note dialog
            dialogOpen={dialogOpen}
            dialogItem={dialogItem}
            openNoteDialog={this.openNoteDialog}
            closeNoteDialog={this.closeNoteDialog}
            onPersistNote={this.handlePersistNote} // add/update to the db
            onChangeNote={this.handleItemChange} 
            {...this.props}>
            <Form />
          </View>
        }
      </div>
    )
  }
}

const { func, string, object } = PropTypes;

ClientContact.propTypes = {
  get: func.isRequired,
  addClientContact: func.isRequired,
  updateClientContact: func.isRequired,
  editRefresh: func.isRequired,
  id: string,
  clientContact: object,
};

const mapStateToProps = ({ clientContactState, clientState, noteState }) => {
  return { 
    clientContact: clientContactState.clientContact,
    clients: clientState.clients,
    notes: noteState.notes,
    adminNotes: noteState.adminNotes,
  };
};

const { get, editRefresh, addClientContact, updateClientContact } = clientContactOperations;
const { listNotes, updateNote, addNote } = noteOperations;
const { list: listClients } = clientOperations;

const mapDispatchToProps = { get, editRefresh, addClientContact, updateClientContact, listClients, listNotes, updateNote, addNote };

export default connect(mapStateToProps, mapDispatchToProps)(ClientContact);