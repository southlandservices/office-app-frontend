import types from './types';

export const list = data => {
  return {
    type: types.LIST,
    payload: data
  };
};

export const getJob = data => {
  return {
    type: types.GET_JOB,
    payload: data 
  };
};

export const editRefresh = data => {
  return {
    type: types.EDIT_REFRESH,
    payload: data
  };
};

export const addJob = (text, Jobs) => ({
  type: types.ADD_JOB,
  payload: Jobs
});

export const updateJob = data => {
  return {
    type: types.UPDATE_JOB,
    payload: data
  };
};

export const persistSuccess = data => {
  return {
    type: types.PERSIST_SUCCESS,
    payload: data
  };
};

export const persistError = data => {
  return {
    type: types.PERSIST_ERROR,
    payload: data
  };
};

export default {
  list,
  editRefresh
}