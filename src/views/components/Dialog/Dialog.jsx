import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button } from '@material-ui/core';

const DialogModal = ({ classes, dialogOpen, closeDialog, children, dialogItem, dialogTitle, addFn, updateFn, onPersistNote }) => {
  const { isNew, id } = dialogItem;
  return (
    <Dialog open={dialogOpen} onClose={closeDialog} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{ dialogTitle }</DialogTitle>
      <DialogContent>
        {/* <DialogContentText>
          To subscribe to this website, please enter your email address here. We will send updates
          occasionally.
          </DialogContentText> */}
        { children }
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog} color="primary">
          Cancel
        </Button>
        {
          isNew ?
            <Button color="primary" onClick={() => onPersistNote(null, dialogItem)}>Add</Button> :
            <Button color="primary" onClick={() => onPersistNote(id, dialogItem)}>Update</Button>
        }
      </DialogActions>
    </Dialog>
  )
}

export default DialogModal;