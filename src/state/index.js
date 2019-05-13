import { combineReducers } from 'redux'
import userState from './user'
import authenticationState from './auth';
import roleState from './role';
import clientState from './client';
import clientContactState from './clientContact';
import jobState from './job'

const rootReducer = combineReducers({
  authenticationState,
  userState,
  roleState,
  clientState,
  clientContactState,
  jobState
})

export default rootReducer
