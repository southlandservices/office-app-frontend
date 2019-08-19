import React from 'react';
import PropTypes, { any } from 'prop-types';
import { connect } from 'react-redux';
import { boundMethod } from 'autobind-decorator';
import { Redirect } from 'react-router-dom';
import { shipperOperations } from '../../../state/shipper';
import { clientOperations } from '../../../state/client';
import { userOperations } from '../../../state/user';
import { noteOperations } from '../../../state/note';
import CreateEditComponent from '../../common/CreateEditComponent';
import PageHeader from '../../common/PageHeader';
import View from '../../common/FormWrapper';
import Form from '../../components/Shipper';
import { decodeToken, removeValueFromNestedArray } from '../../../utils/misc';

class Shipper extends CreateEditComponent {

  constructor(props, context) {
    super(props, context, 'id');
    this.init();
  }

  componentDidMount() {
    this.getItem();
    this.props.listClients();
  }

  @boundMethod
  handleChange(name, event) {
    this.change(name, event.target.value, this.props.shipper);
  }

  @boundMethod
  handlePersist() {
    this.persist({
      item: this.props.shipper,
      addFn: this.props.addShipper,
      updateFn: this.props.updateShipper
    });
  }

  @boundMethod
  handleItemChange(name, item, event) {
    const newItem = Object.assign({}, item, { [name]: event.target.value });
    this.setState({ dialogItem: newItem });
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
    this.props.listNotes(this.props.id, 'shipperCustomer');
  }

  @boundMethod
  handlePersistNote(id, data, isAdmin) {
    this.persistNote({
      note: { id, isAdmin, note: data.note, shipperCustomerId: this.props.id, submitterId: this.props.user.id },
      addFn: this.props.addNote,
      updateFn: this.props.updateNote,
      isNew: !id,
      typeSlug: 'shipperCustomer',
      callback: () => {
        this.refreshNotes();
      }
    });
  }

  render() {
    const { isNew, redirectToList, isSaving, dialogOpen, dialogItem } = this.state;
    const { shipper, clients, notes, adminNotes } = this.props;
    const decoded = decodeToken(localStorage.getItem('token'));
    const { role } = decoded;
    return (
      <div>
        <PageHeader pageTitle={isNew ? 'Add Shipper' : 'Update Shipper'} />
        {
          redirectToList ?
            <Redirect to="/shippers" /> :
            <View
              onChange={this.handleChange}
              onPersist={this.handlePersist}
              isNew={isNew}
              saveInProgress={isSaving}
              item={shipper}
              role={role}
              clients={clients}
              notes={notes}
              adminNotes={adminNotes}
              // note dialog
              dialogOpen={dialogOpen}
              dialogItem={dialogItem}
              openNoteDialog={this.openNoteDialog}
              closeNoteDialog={this.closeNoteDialog}
              onPersistNote={this.handlePersistNote} // add/update to the db
              onChangeNote={this.handleItemChange}  // local change to text field
              {...this.props}>
              <Form />
            </View>
        }
      </div>
    )
  }
}

const { func, string, object } = PropTypes;

Shipper.propTypes = {
  get: func.isRequired,
  addShipper: func.isRequired,
  updateShipper: func.isRequired,
  editRefresh: func.isRequired,
  listClients: any,
  id: string,
  shipper: object,
};

const mapStateToProps = ({ shipperState, clientState, userState, noteState }) => {
  return {
    shipper: shipperState.shipper,
    clients: clientState.clients,
    user: userState.user,
    notes: noteState.notes,
    adminNotes: noteState.adminNotes,
  };
};

const { get, editRefresh, addShipper, updateShipper } = shipperOperations;
const { list: listClients } = clientOperations;
const { listNotes, updateNote, addNote } = noteOperations;

const mapDispatchToProps = { get, editRefresh, addShipper, updateShipper, listClients, listNotes, updateNote, addNote };

export default connect(mapStateToProps, mapDispatchToProps)(Shipper);