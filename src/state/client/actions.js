import types from './types';

export const list = data => {
  return {
    type: types.LIST,
    payload: data
  };
};

export const getClient = data => {
  return {
    type: types.GET_CLIENT,
    payload: data
  };
};

export const editRefresh = data => {
  return {
    type: types.EDIT_REFRESH,
    payload: data
  };
};

export const addClient = (text, Clients) => ({
  type: types.ADD_CLIENT,
  payload: Clients
});

export const updateClient = data => {
  return {
    type: types.UPDATE_CLIENT,
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