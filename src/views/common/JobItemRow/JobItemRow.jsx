import React from 'react';
import { TableCell, TableRow } from '@material-ui/core';

const JobItemRow = (row) => {
  return (
    <React.Fragment>
      <TableRow>
        <TableCell>1234</TableCell>
        <TableCell>2</TableCell>
        <TableCell>abc123</TableCell>
        <TableCell>zyx987</TableCell>
        <TableCell>here</TableCell>
        <TableCell>$100</TableCell>
        <TableCell>$60</TableCell>
        <TableCell>$60</TableCell>
        <TableCell>description</TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={9}>Comments: This is the description for item abc123.  It should span the whole row.</TableCell>
      </TableRow>
    </React.Fragment>
  )
}

export default JobItemRow;