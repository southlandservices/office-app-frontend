import types from './types';

export const setAuthentication = data => {
  return {
    type: types.AUTHENTICATION_SET,
    payload: data
  };
};

export const removeAuthentication = data => {
  return {
    type: types.AUTHENTICATION_UNSET
  }
};

export const errorAuthentication = data => {
  return {
    type: types.AUTHENTICATION_ERROR,
    payload: data
  }
}

export default {
  setAuthentication,
  removeAuthentication,
  errorAuthentication
};