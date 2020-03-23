import React from 'react';
import { TableHead, TableRow } from '@material-ui/core';
import StyledTableHeaderCell from '../StyledTableHeaderCell';

const JobItemTableHeader = ({}) => {
  return (
    <TableHead>
      <TableRow>
        <StyledTableHeaderCell>Inv #</StyledTableHeaderCell>
        <StyledTableHeaderCell>Quantity</StyledTableHeaderCell>
        <StyledTableHeaderCell>Item Code</StyledTableHeaderCell>
        <StyledTableHeaderCell>Dmg/Loss Code</StyledTableHeaderCell>
        <StyledTableHeaderCell>Where/When Purchased</StyledTableHeaderCell>
        <StyledTableHeaderCell>Purchased Cost</StyledTableHeaderCell>
        <StyledTableHeaderCell>Replacement Cost</StyledTableHeaderCell>
        <StyledTableHeaderCell>Claim Amount</StyledTableHeaderCell>
        <StyledTableHeaderCell>Add'l Desc.</StyledTableHeaderCell>
      </TableRow>
    </TableHead>
  )
}

export default JobItemTableHeader;