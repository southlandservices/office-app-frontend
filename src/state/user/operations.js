import actions from './actions';
import types from './types';
// import apiConfig from '../../config/env';

console.log('PROCESS.ENV.API_PREFIX IN OPERATIONS', process.env.API_PREFIX);
console.log('PROCESS.ENV.ENV IN OPERATIONS', process.env.ENV);

const endpointBase = `${process.env.API_PREFIX}`;
const headers = {
  authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRpY3R1bS5tYWduYUBmYXVjaWJ1c01vcmJpdmVoaWN1bGEuY2EiLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE1NTY2NjUyNTgsImV4cCI6MTU1Njc1MTY1OH0.7YKEaVsOPEJ5W9JzEqVt4P8ryY0MlEJbM6PIxMgigU8'
};

const list = () => {
  const endpoint = `${endpointBase}users`;
  return async (dispatch) => {
    try {
      let response = await fetch(endpoint, {
        method: 'GET',
        headers
      });
      let users = await response.json();
      dispatch({ type: types.LIST, payload: users });
    } catch (e) {
      dispatch({ type: types.ERROR })
    }
  }
};

// client-only
const editRefresh = data => {
  return dispatch => dispatch(actions.editRefresh(data));
};

const toggleSponsorStatus = id => {
  return actions.toggleSponsorStatus(id);
};

export default {
  list,
  editRefresh,
  toggleSponsorStatus
}