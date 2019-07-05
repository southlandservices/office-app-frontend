import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import uuidv4 from 'uuid/v4';

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

    if (id && id !== 'create') {
      return this.props.get(id);
    }

    this.props.editRefresh({ [this.idField]: uuidv4() });

    return Promise.resolve();
  }

  init() {
    // choosing to use local state to manage form state
    this.state = Object.assign({}, this.state, {
      id: this.props[this.idField] || undefined,
      isSaving: false,
      isNew: !this.props[this.idField] || this.props[this.idField] === "create",
      redirectToList: false,
      dialogOpen: false,
      dialogItem: {}
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
    // const newState = Object.assign({}, { isSaving: false }, { error }, { redirectToList: isNew });
    const newState = Object.assign({}, { isSaving: false }, { error });
    this.setState(newState);
  }

  openDialog(dialogItem) {
    this.setState({ dialogOpen: true, dialogItem });
  }

  closeDialog() {
    this.setState({ dialogOpen: false, dialogItem: {} });
  }

  persist({ item, addFn, updateFn }) {
    const { isNew, id } = this.state;
    const { name } = item;

    this.setState({ isSaving: true });

    if (isNew) {
      this.add(addFn, item);
    } else {
      this.update(updateFn, id, item);
    }
  }

  add(addFn, item, callback) {
    addFn(item)
      .then(() => this.notify({ message: `Add successful`, type: 'success' }))
      .then(() => this.updateState(false, true))
      .then(() => {
        if (callback) {
          callback();
        }
      })
      .catch(() => {
        this.notify({ message: `Add error`, type: 'error', autoClose: false });
        this.updateState(true, true);
      });
  }

  update(updateFn, id, item, callback) {
    updateFn(id, item)
      .then(() => this.notify({ message: `Save successful`, type: 'success' }))
      .then(() => this.updateState())
      .then(() => {
        if(callback) {
          callback();
        }
      })
      .catch(e=> {
        console.log('error', e);
        this.notify({ message: `Save error`, type: 'error', autoClose: false });
        this.updateState(true);
      });
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

  persistNote({ note, addFn, updateFn, isNew, callback }) {
    if(isNew) {
      this.add(addFn, note, callback);
    } else {
      this.update(updateFn, note.id, note, callback);
    }
  }
}

const { func } = PropTypes;

CreateEditComponent.propTypes = {
  get: func.isRequired,
  editRefresh: func.isRequired
};

export default CreateEditComponent;
