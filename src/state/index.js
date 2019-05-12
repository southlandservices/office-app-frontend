import { combineReducers } from 'redux'
import userState from './user'
import authenticationState from './auth';
import roleState from './role';
import clientState from './client';
import clientContactState from './clientContact';

const rootReducer = combineReducers({
  authenticationState,
  userState,
  roleState,
  clientState,
  clientContactState
})

export default rootReducer
