import React from 'react';
import Table, { TableBody, TableHead, TableCell, TableRow } from '@material-ui/core/Table';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './ListStyles.js';

const List = ({ classes, items, deleteFn, structure, buildRowElement, attributes }) => {
  return (
    <Table name={'listTable'} {...attributes} >
      <TableHead>
        <TableRow>
          {Object.keys(structure).map(key => (
            <TableCell key={key} name={`column_${key.replace(/\s/g, '')}`} className={classes.tableHeader}>{structure[key].display}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {
          items.map(item => buildRowElement({ item, onClick: deleteFn, structure }))
        }
      </TableBody>
    </Table>
  );
};

const { func, object, array, bool } = PropTypes;

List.propTypes = {
  deleteFn: func,
  items: array.isRequired,
  classes: object.isRequired,
  structure: object.isRequired,
  buildRowElement: func.isRequired,
  attributes: object
};

export default withStyles(styles)(List);
