import { combineReducers } from 'redux';
import types from './types';

export const notes = (state = [], action) => {
  switch (action.type) {
    case types.LIST_NOTES:
      return action.payload.data.filter(note => note.isAdmin == false);
    default:
      return state;
  }
}

export const adminNotes = (state = [], action) => {
  switch (action.type) {
    case types.LIST_NOTES:
      return action.payload.data.filter(note => note.isAdmin == true);
    default:
      return state;
  }
}

const noteReducer = combineReducers({
  notes,
  adminNotes
});

export default noteReducer;