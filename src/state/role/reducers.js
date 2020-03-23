import { combineReducers } from 'redux';
import types from './types';

export const roles = (state = [], action) => {
  switch (action.type) {
    case types.LIST:
      return action.payload.data;
    case types.ADD_ROLE:
      return action.payload;
    default:
      return state;
  }
};

const roleReducer = combineReducers({
  roles
});

export default roleReducer;