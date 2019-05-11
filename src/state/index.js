import { combineReducers } from 'redux'
import userState from './user'
import authenticationState from './auth';
import roleState from './role';

const rootReducer = combineReducers({
  authenticationState,
  userState,
  roleState
})

export default rootReducer
