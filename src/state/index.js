import { combineReducers } from 'redux'
import userState from './user'
import authenticationState from './auth';
import roleState from './role';
import clientState from './client';
import clientContactState from './clientContact';
import jobState from './job';
import shipperState from './shipper';
import noteState from './note';

const rootReducer = combineReducers({
  authenticationState,
  userState,
  roleState,
  clientState,
  clientContactState,
  jobState,
  shipperState,
  noteState
})

export default rootReducer
