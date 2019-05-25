import { combineReducers } from 'redux';
import types from './types';

export const user = (state = {}, action) => {
  switch (action.type) {
    case types.SET_USER:
      return action.payload.data;
    case types.EDIT_REFRESH:
      return action.payload;
    case types.TOGGLE_USER:
      if (state.id !== action.id) {
        return state;
      }
      return {
        ...state,
        deleted: !state.deleted
      };
    default:
      return state;
  }
};

export const notes = (state = [], action) => {
  switch(action.type) {
    case types.LIST_NOTES:
      return action.payload.data.filter(note => note.isAdmin == false);
    default: 
      return state;
  }
}

export const adminNotes = (state = [], action) => {
  switch(action.type) {
    case types.LIST_NOTES:
      return action.payload.data.filter(note => note.isAdmin == true);
    default:
      return state;
  }
}

export const users = (state = [], action) => {
  switch (action.type) {
    case types.LIST:
      return action.payload.data;
    case types.ADD_USER:
      return action.payload;
    default:
      return state;
  }
};

export const saveSuccess = (state = null, action) => {
  switch (action.type) {
    case types.PERSIST_SUCCESS:
      return true;
    case types.PERSIST_ERROR:
      return false;
    default:
      return null;
  }
};

const userReducer = combineReducers({
  user,
  users,
  saveSuccess,
  notes,
  adminNotes
});

export default userReducer;