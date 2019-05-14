import { combineReducers } from 'redux'
import userState from './user'
import authenticationState from './auth';
import roleState from './role';
import clientState from './client';
import clientContactState from './clientContact';
import jobState from './job';
import shipperState from './shipper';

const rootReducer = combineReducers({
  authenticationState,
  userState,
  roleState,
  clientState,
  clientContactState,
  jobState,
  shipperState
})

export default rootReducer
