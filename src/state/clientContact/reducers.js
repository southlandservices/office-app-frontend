import { combineReducers } from 'redux';
import types from './types';

export const clientContact = (state = {}, action) => {
  switch (action.type) {
    case types.SET_CLIENTCONTACT:
      return action.payload.data;
    case types.EDIT_REFRESH:
      return action.payload;
    default:
      return state;
  }
};

export const clientContacts = (state = [], action) => {
  switch (action.type) {
    case types.LIST:
      return action.payload.data;
    case types.ADD_CLIENTCONTACT:
      return action.payload;
    default:
      return state;
  }
};

const clientContactReducer = combineReducers({
  clientContacts,
  clientContact
});

export default clientContactReducer;