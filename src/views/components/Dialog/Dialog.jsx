import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@material-ui/core';

const DialogModal = ({ classes, dialogOpen, closeDialog, children, dialogItem, dialogTitle, onPersistNote }) => {
  const { isNew, id, isAdmin } = dialogItem;
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
            <Button color="primary" onClick={() => onPersistNote(null, dialogItem, isAdmin)}>Add</Button> :
            <Button color="primary" onClick={() => onPersistNote(id, dialogItem, isAdmin)}>Update</Button>
        }
      </DialogActions>
    </Dialog>
  )
}

export default DialogModal;