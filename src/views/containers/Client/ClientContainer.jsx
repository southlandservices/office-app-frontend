import React from 'react';
import PropTypes, { any } from 'prop-types';
import { connect } from 'react-redux';
import { boundMethod } from 'autobind-decorator';
import { clientOperations } from '../../../state/client';
import { clientContactOperations } from '../../../state/clientContact';
import CreateEditComponent from '../../common/CreateEditComponent';
import PageHeader from '../../common/PageHeader';
import View from '../../common/FormWrapper';
import Form from '../../components/Client';
import { decodeToken, removeValueFromNestedArray } from '../../../utils/misc';

class Client extends CreateEditComponent {
  constructor(props, context) {
    super(props, context, 'id');
    this.init();
  }

  componentDidMount() {
    this.getItem();
    this.props.listClientContacts(this.props.id)
  }

  @boundMethod
  handleChange(name, event) {
    this.change(name, event.target.value, this.props.client);
  }

  @boundMethod
  handlePersist() {
    this.persist({
      item: this.props.client,
      addFn: this.props.addClient,
      updateFn: this.props.updateClient
    });
  }

  render() {
    const { isNew, redirectToList, isSaving } = this.state;
    const { client, clientContacts } = this.props;
    const decoded = decodeToken(localStorage.getItem('token'));
    const { role } = decoded;
    return (
      <div>
        <PageHeader pageTitle={isNew ? 'Add Client' : 'Update Client'} />
        {
          redirectToList ?
            <Redirect to="/clients" /> :
            <View
              onChange={this.handleChange}
              onPersist={this.handlePersist}
              isNew={isNew}
              saveInProgress={isSaving}
              item={client}
              role={role}
              clientContacts={clientContacts}
              {...this.props}>
              <Form />
            </View>
        }
      </div>
    )
  }
}

const { func, string, object } = PropTypes;

Client.propTypes = {
  get: func.isRequired,
  addClient: func.isRequired,
  updateClient: func.isRequired,
  editRefresh: func.isRequired,
  listClientContacts: any,
  id: string,
  client: object,
};

const mapStateToProps = ({ clientState, clientContactState }) => {
  return {
    client: clientState.client,
    clientContacts: clientContactState.clientContacts
  }
}

const { get, editRefresh, addClient, updateClient } = clientOperations;
const { listByClient: listClientContacts } = clientContactOperations;

const mapDispatchToProps = { get, editRefresh, addClient, updateClient, listClientContacts };

export default connect(mapStateToProps, mapDispatchToProps)(Client);