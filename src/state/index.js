import { combineReducers } from 'redux'
import userState from './user'
import authenticationState from './auth';

const rootReducer = combineReducers({
  authenticationState,
  userState
})

export default rootReducer
