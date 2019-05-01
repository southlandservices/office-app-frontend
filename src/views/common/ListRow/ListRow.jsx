import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { TableRow, TableCell } from '@material-ui/core/Table';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = {};

const ListRow = ({ classes, onClick, structure, id, item }) => (
  <TableRow>
    {Object.keys(structure).map(key => {
      let returnElement;
      if (structure[key].idLink) {
        returnElement = <TableCell key={`${id}_${key}`}><Link to={`${structure[key].linkPrefix}${id}`}>{item[key]}</Link></TableCell>;
      } else if (structure[key].element) {
        if (structure[key].element === 'Button') {
          switch (structure[key].action) {
            case 'delete':
              returnElement = <TableCell key={`${id}_${key}`}><Button onClick={onClick}>{item.deleted ? 'Restore' : 'Remove'}</Button></TableCell>;
              break;
            default:
              returnElement = <TableCell key={`${id}_${key}`}><Button onClick={onClick}>Clickme</Button></TableCell>;
          }
        }
      } else if (structure[key].valueFn) {
        const boolCheckProp = item[structure[key].boolCheckProp] || false;
        returnElement = <TableCell key={`${id}_${key}`}>{structure[key].action(boolCheckProp)}</TableCell>;
      } else {
        returnElement = <TableCell key={`${id}_${key}`}>{item[key]}</TableCell>;
      }
      return (returnElement);
    })}
  </TableRow>
);

const { object, func, string } = PropTypes;
ListRow.propTypes = {
  classes: object.isRequired,
  onClick: func.isRequired,
  structure: object.isRequired,
  id: string.isRequired,
  item: object.isRequired
};

export default withStyles(styles)(ListRow);
