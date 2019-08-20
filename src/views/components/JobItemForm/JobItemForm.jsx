import React from 'react';
import PropTypes from 'prop-types';
import { Grid, TextField, Button, withStyles } from '@material-ui/core';
import { Add } from '@material-ui/icons';

const styles = {
  buttonRight: {
    float: 'right'
  }
};

const JobItemForm = ({ classes, jobItem, handleJobItemChange, onPersistJobItem }) => {
  return (
    <React.Fragment>
      <Grid item container xs={12} md={12} spacing={2} >
        <Grid item xs={3} md={2} >
          <TextField
            label="Inventory #"
            placeholder="Inventory #"
            field="inventoryNumber"
            name="inventoryNumber"
            value={!_.isEmpty(jobItem) ? jobItem.inventoryNumber : ''}
            onChange={handleJobItemChange.bind(this, 'inventoryNumber')}
            fullWidth={true} />
        </Grid>
        <Grid item xs={3} md={1} >
          <TextField
            label="Quantity"
            placeholder="Quantity"
            field="quantity"
            name="quantity"
            value={!_.isEmpty(jobItem) ? jobItem.quantity : ''}
            onChange={handleJobItemChange.bind(this, 'quantity')}
            fullWidth={true} />
        </Grid>
        <Grid item xs={3} md={2} >
          <TextField
            label="Item Code"
            placeholder="Item Code"
            field="itemCode"
            name="itemCode"
            value={!_.isEmpty(jobItem) ? jobItem.itemCode : ''}
            onChange={handleJobItemChange.bind(this, 'itemCode')}
            fullWidth={true} />
        </Grid>
        <Grid item xs={3} md={2} >
          <TextField
            label="Loss Code"
            placeholder="Loss Code"
            field="lossCode"
            name="lossCode"
            value={!_.isEmpty(jobItem) ? jobItem.lossCode : ''}
            onChange={handleJobItemChange.bind(this, 'lossCode')}
            fullWidth={true} />
        </Grid>
        <Grid item xs={3} md={2} >
          <TextField
            label="Where/when Purchased"
            placeholder="Where/when Purchased"
            field="purchaseLocation"
            name="purchaseLocation"
            value={!_.isEmpty(jobItem) ? jobItem.purchaseLocation : ''}
            onChange={handleJobItemChange.bind(this, 'purchaseLocation')}
            fullWidth={true} />
        </Grid>
        <Grid item xs={3} md={1} >
          <TextField
            label="Purch. Cost"
            placeholder="Purch. Cost"
            field="purchaseCost"
            name="purchaseCost"
            value={!_.isEmpty(jobItem) ? jobItem.purchaseCost : ''}
            onChange={handleJobItemChange.bind(this, 'purchaseCost')}
            fullWidth={true} />
        </Grid>
        <Grid item xs={3} md={1} >
          <TextField
            label="Repl. Cost"
            placeholder="Repl. Cost"
            field="replacementCost"
            name="replacementCost"
            value={!_.isEmpty(jobItem) ? jobItem.replacementCost : ''}
            onChange={handleJobItemChange.bind(this, 'replacementCost')}
            fullWidth={true} />
        </Grid>
        <Grid item xs={3} md={1} >
          <TextField
            label="Claim Amt."
            placeholder="Claim Amt."
            field="claimAmount"
            name="claimAmount"
            value={!_.isEmpty(jobItem) ? jobItem.claimAmount : ''}
            onChange={handleJobItemChange.bind(this, 'claimAmount')}
            fullWidth={true} />
        </Grid>
        <Grid item xs={12} md={4} >
          <TextField
            multiline
            rowsMax="10"
            label="Additional Description"
            placeholder="Additional Description"
            field="additionalDescription"
            name="additionalDescription"
            value={!_.isEmpty(jobItem.additionalDescription) ? jobItem.additionalDescription : ''}
            onChange={handleJobItemChange.bind(this, 'additionalDescription')}
            fullWidth={true} />
        </Grid>
        <Grid item xs={12} md={8} >
          <TextField
            multiline
            rowsMax="10"
            label="Comments"
            placeholder="Comments"
            field="comments"
            name="comments"
            value={!_.isEmpty(jobItem.comments) ? jobItem.comments : ''}
            onChange={handleJobItemChange.bind(this, 'comments')}
            fullWidth={true} />
        </Grid>
      </Grid>
      <Grid item xs={12} md={12}>
        <div className={classes.buttonRight}>
          <Button variant='contained' color='primary' onClick={() => onPersistJobItem()}><Add />Add Item</Button>
        </div>
      </Grid>
    </React.Fragment>
  )
}

const { object, func } = PropTypes
JobItemForm.PropTypes = {
  classes: object.isRequired,
  jobItem: object.isRequired,
  handleJobItemChange: func.isRequired,
  onPersistJobItem: func.isRequired
}

export default withStyles(styles)(JobItemForm);