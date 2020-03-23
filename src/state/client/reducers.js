import { combineReducers } from 'redux';
import types from './types';

export const client = (state = {}, action) => {
  switch (action.type) {
    case types.SET_CLIENT:
      return action.payload.data;
    case types.EDIT_REFRESH:
      return action.payload;
    default:
      return state;
  }
};

export const clients = (state = [], action) => {
  switch (action.type) {
    case types.LIST:
      return action.payload.data;
    case types.ADD_CLIENT:
      return action.payload;
    default:
      return state;
  }
};

const clientReducer = combineReducers({
  client,
  clients
});

export default clientReducer;