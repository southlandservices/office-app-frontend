import { combineReducers } from 'redux';
import types from './types';

export const jobItems = (state = [], action) => {
  switch (action.type) {
    case types.LIST_JOB_ITEMS:
      return action.payload.data;
    default:
      return state;
  }
}

const jobItemReducer = combineReducers({
  jobItems
});

export default jobItemReducer;