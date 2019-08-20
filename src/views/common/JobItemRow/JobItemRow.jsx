import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableRow, withStyles } from '@material-ui/core';

const styles = {
  rowBottom: {
    borderBottom: '2px solid #000'
  }
}

const JobItemRow = ({ classes, jobItem }) => {
  return (
    <React.Fragment key={jobItem.id}>
      <TableRow>
        <TableCell>{ jobItem.inventoryNumber }</TableCell>
        <TableCell>{jobItem.quantity }</TableCell>
        <TableCell>{jobItem.itemCode }</TableCell>
        <TableCell>{jobItem.lossCode }</TableCell>
        <TableCell>{jobItem.purchaseLocation }</TableCell>
        <TableCell>${jobItem.purchaseCost }</TableCell>
        <TableCell>${jobItem.replacementCost }</TableCell>
        <TableCell>${jobItem.claimAmount }</TableCell>
        <TableCell>{jobItem.additionalDescription }</TableCell>
      </TableRow>
      <TableRow className={ classes.rowBottom }>
        <TableCell colSpan={9}>{jobItem.comments }</TableCell>
      </TableRow >
    </React.Fragment>
  )
}

const { object } = PropTypes;
JobItemRow.PropTypes = {
  jobItem: object.isRequired
}

export default withStyles(styles)(JobItemRow);