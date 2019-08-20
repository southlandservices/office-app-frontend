import { combineReducers } from 'redux'
import userState from './user'
import authenticationState from './auth';
import roleState from './role';
import clientState from './client';
import clientContactState from './clientContact';
import jobState from './job';
import shipperState from './shipper';
import noteState from './note';
import jobItemState from './jobItem';

const rootReducer = combineReducers({
  authenticationState,
  userState,
  roleState,
  clientState,
  clientContactState,
  jobState,
  shipperState,
  noteState,
  jobItemState
})

export default rootReducer
