import React from 'react';
import PropTypes, { any } from 'prop-types';
import { connect } from 'react-redux';
import { boundMethod } from 'autobind-decorator';
import { Redirect } from 'react-router-dom';
import { clientContactOperations } from '../../../state/clientContact';
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
  }

  @boundMethod
  handleChange(name, event) {
    this.change(name, event.target.value, this.props.clientContact);
  }

  @boundMethod
  handlePersist() {
    this.persist({
      item: this.props.clientContact,
      addFn: this.props.addClientContact,
      updateFn: this.props.updateClientContact
    });
  }

  render() {
    const { isNew, redirectToList, isSaving } = this.state;
    const { clientContact } = this.props;
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

const mapStateToProps = ({ clientContactState }) => {
  return { 
    clientContact: clientContactState.clientContact
  };
};

const { get, editRefresh, addClientContact, updateClientContact } = clientContactOperations;

const mapDispatchToProps = { get, editRefresh, addClientContact, updateClientContact };

export default connect(mapStateToProps, mapDispatchToProps)(ClientContact);