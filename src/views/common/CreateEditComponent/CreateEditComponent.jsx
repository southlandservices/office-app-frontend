import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import uuidv1 from 'uuid/v1';

import { setFieldValue } from '../../../utils/misc';

class CreateEditComponent extends Component {
  constructor(props, context, idField) {
    super(props, context);
    this.idField = idField;
  }

  /**
   * Gets the item to be edited or a new empty item for create cases
   * @returns {Promise<void>}
   */
  getItem() {
    const { id } = this.state;

    if (id) {
      return this.props.get(id);
    }

    this.props.editRefresh({ [this.idField]: uuidv1() });

    return Promise.resolve();
  }

  init() {
    // choosing to use local state to manage form state
    this.state = Object.assign({}, this.state, {
      id: this.props[this.idField] || undefined,
      isSaving: false,
      isNew: !this.props[this.idField],
      redirectToList: false
    });
  }

  change(name, value, item) {
    if (name && item) {
      const updatedObject = Object.assign({}, item);
      setFieldValue(updatedObject, name, value);
      this.props.editRefresh(updatedObject);
    }
  }

  changeMany(changedValues, item) {
    if (changedValues && item) {
      const updatedObject = Object.assign({}, item, changedValues);
      this.props.editRefresh(updatedObject);
    }
  }

  updateState(error = false, isNew = false) {
    const newState = Object.assign({}, { isSaving: false }, { error }, { redirectToList: isNew });
    this.setState(newState);
  }

  persist({ item, addFn, updateFn }) {
    const { isNew, id } = this.state;
    const { name } = item;

    this.setState({ isSaving: true });

    // these add/update functions can probably be abstracted out to the CreateEditComponent as props
    if (isNew) {
      addFn(item)
        .then(() => this.notify({ message: `Add successful: ${name}`, type: 'success' }))
        .then(() => this.updateState(false, true))
        .catch(() => {
          this.notify({ message: `Add error: ${name}`, type: 'error', autoClose: false });
          this.updateState(true, true);
        });
    } else {
      // TODO: show a notification
      updateFn(id, item)
        .then(() => this.notify({ message: `Save successful: ${name}`, type: 'success' }))
        .then(() => this.updateState())
        .catch(() => {
          this.notify({ message: `Save error: ${name}`, type: 'error', autoClose: false });
          this.updateState(true);
        });
    }
  }

  notify({ message = 'Message here', type = 'info', autoClose = true }) {
    const toastOpts = { autoClose };

    switch (type) {
      case 'success':
        toast.success(message, toastOpts);
        break;
      case 'error':
        toast.error(message, toastOpts);
        break;
      case 'warn':
        toast.warn(message, toastOpts);
        break;
      default:
        toast.info(message, toastOpts);
        break;
    }
  }
}

const { func } = PropTypes;

CreateEditComponent.propTypes = {
  get: func.isRequired,
  editRefresh: func.isRequired
};

export default CreateEditComponent;
