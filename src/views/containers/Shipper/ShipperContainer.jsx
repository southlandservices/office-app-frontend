import React from 'react';
import PropTypes, { any } from 'prop-types';
import { connect } from 'react-redux';
import { boundMethod } from 'autobind-decorator';
import { Redirect } from 'react-router-dom';
import { shipperOperations } from '../../../state/shipper';
import { clientOperations } from '../../../state/client';
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

  render() {
    const { isNew, redirectToList, isSaving } = this.state;
    const { shipper, clients } = this.props;
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

const mapStateToProps = ({ shipperState, clientState }) => {
  return {
    shipper: shipperState.shipper,
    clients: clientState.clients
  };
};

const { get, editRefresh, addShipper, updateShipper } = shipperOperations;
const { list: listClients } = clientOperations;

const mapDispatchToProps = { get, editRefresh, addShipper, updateShipper, listClients };

export default connect(mapStateToProps, mapDispatchToProps)(Shipper);