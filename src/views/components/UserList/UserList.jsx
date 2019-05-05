import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './UserListStyles';
import { Link } from 'react-router-dom';
import MUIDataTable from 'mui-datatables';
import _ from 'lodash';
import '../../../assets/styles/table.css';

const columns = [
  {
    label: 'First Name',
    name: 'userLink',
    options: {
      customBodyRender: 
        (value, tableMeta, updateValue) => 
        ( <Link to={`/users/${value.id}`} className='textLink'>{ value.name }</Link> )
    } 
  },
  { label: 'Last Name', name: 'lastName' },
  { label: 'Title', name: 'title' },
  { label: 'Phone', name: 'phone1' },
  { label: 'Phone (alt)', name: 'phone2' },
  { label: 'Email', name: 'email' },
  { label: 'Role', name: 'userRole.name'}
];

const data = (users) => {
  return _.map(users, user => {
    const userLink = {
      name: user.firstName,
      id: user.id
    }
    return Object.assign(user, { userLink });
  });
}

const UserList = ({ classes, users, tableOptions }) => {
  return (
    <div>
      <h2>Users</h2>
      <MUIDataTable data={ data(users) } columns={ columns } />
    </div>
  )
}

const { object, array } = PropTypes;
UserList.propTypes = {
  classes: object.isRequired,
  users: array.isRequired,
  // tableOptions: object.isRequired // for table options like onRowClick
};

export default withStyles(styles)(UserList);