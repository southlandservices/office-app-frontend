import { combineReducers } from 'redux';
import types from './types';

export const authenticated = (state = false, action) => {
  switch (action.type) {
    case types.AUTHENTICATION_SET:
      return action.payload;
    case types.AUTHENTICATION_UNSET:
      return false;
    default:
      return state;
  }
}

const authenticationReducer = combineReducers({
  authenticated
});

export default authenticationReducer;