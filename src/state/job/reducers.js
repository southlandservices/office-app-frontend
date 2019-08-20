import { combineReducers } from 'redux';
import types from './types';

export const job = (state = {}, action) => {
  switch (action.type) {
    case types.SET_JOB:
      return action.payload.data;
    case types.EDIT_REFRESH:
      return action.payload;
    default:
      return state;
  }
};

export const jobs = (state = [], action) => {
  switch (action.type) {
    case types.LIST:
      return action.payload.data;
    case types.ADD_JOB:
      return action.payload;
    default:
      return state;
  }
};

const jobReducer = combineReducers({
  job,
  jobs
});

export default jobReducer;