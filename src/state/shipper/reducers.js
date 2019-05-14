import { combineReducers } from 'redux';
import types from './types';

export const shipper = (state = {}, action) => {
  switch (action.type) {
    case types.SET_SHIPPER:
      return action.payload.data;
    case types.EDIT_REFRESH:
      return action.payload;
    case types.TOGGLE_SHIPPER:
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

export const shippers = (state = [], action) => {
  switch (action.type) {
    case types.LIST:
      return action.payload.data;
    case types.ADD_SHIPPER:
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

const shipperReducer = combineReducers({
  shipper,
  shippers,
  saveSuccess
});

export default shipperReducer;