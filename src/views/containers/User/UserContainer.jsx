import React from 'react';
import PropTypes, { any } from 'prop-types';
import { connect } from 'react-redux';
import { boundMethod } from 'autobind-decorator';
import { Redirect } from 'react-router-dom';
import { userOperations } from '../../../state/user';
import { roleOperations } from '../../../state/role';
import CreateEditComponent from '../../common/CreateEditComponent';
import PageHeader from '../../common/PageHeader';
import View from '../../common/FormWrapper';
import Form from '../../components/User';
import { decodeToken, removeValueFromNestedArray } from '../../../utils/misc';

class User extends CreateEditComponent {

  constructor(props, context) {
    super(props, context, 'id');
    this.init();
  }

  componentDidMount() {
    this.getItem();
    this.props.listNotes(this.props.id);
    this.props.listRoles();
  }

  @boundMethod
  handleChange(name, event) {
    this.change(name, event.target.value, this.props.user);
  }

  @boundMethod
  handleItemChange(name, item, event) {
    const newItem = Object.assign({}, item, { [name]: event.target.value });
    this.setState({ dialogItem: newItem });
  }

  @boundMethod
  handlePersist() {
    this.persist({
      item: this.props.user,
      addFn: this.props.addUser,
      updateFn: this.props.updateUser
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
    this.props.listNotes(this.props.id);
  }

  @boundMethod
  handlePersistNote(id, data, isAdmin) {
    this.persistNote({
      note: { id, isAdmin, note: data.note, userId: this.props.user.id },
      addFn: this.props.addNote,
      updateFn: this.props.updateNote,
      isNew: !id,
      callback: () => {
        this.refreshNotes();
      }
    });
  }

  render() {
    const { isNew, redirectToList, isSaving, dialogOpen, dialogItem } = this.state;
    const { user, roles, notes, adminNotes } = this.props;
    const decoded = decodeToken(localStorage.getItem('token'));
    const { role } = decoded;
    return (
      <div>
        <PageHeader pageTitle={ isNew ? 'Add User' : 'Update User' } />
        {
          redirectToList ?
          <Redirect to="/users" /> :
          <View
            onChange={this.handleChange} // local change to text field
            onPersist={this.handlePersist} // add/update to the db
            isNew={isNew}
            saveInProgress={isSaving}
            item={user}
            role={ role }
            roles={ roles }
            notes={ notes }
            adminNotes={ adminNotes }
            // note dialog
            dialogOpen={ dialogOpen }
            dialogItem={ dialogItem }
            openNoteDialog={this.openNoteDialog}
            closeNoteDialog={this.closeNoteDialog}
            onPersistNote={ this.handlePersistNote } // add/update to the db
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

User.propTypes = {
  get: func.isRequired,
  addUser: func.isRequired,
  updateUser: func.isRequired,
  editRefresh: func.isRequired,
  listRoles: any,
  id: string,
  user: object,
};

const mapStateToProps = ({ userState, roleState }) => {
  return { 
    user: userState.user,
    notes: userState.notes,
    adminNotes: userState.adminNotes,
    roles: roleState.roles
  };
};

const { get, editRefresh, addUser, updateUser, listNotes, updateNote, addNote } = userOperations;
const { list: listRoles } = roleOperations;

const mapDispatchToProps = { get, editRefresh, addUser, updateUser, listRoles, listNotes, updateNote, addNote };

export default connect(mapStateToProps, mapDispatchToProps)(User);