import types from './types';

export const list = data => {
  return {
    type: types.LIST,
    payload: data
  };
};

export const getShipper = data => {
  return {
    type: types.GET_SHIPPER,
    payload: data
  };
};

export const editRefresh = data => {
  return {
    type: types.EDIT_REFRESH,
    payload: data
  };
};

export const addShipper = (text, Shippers) => ({
  type: types.ADD_SHIPPER,
  payload: Shippers
});

export const updateShipper = data => {
  return {
    type: types.UPDATE_SHIPPER,
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
  getShipper,
  addShipper,
  updateShipper,
  persistSuccess,
  persistError,
  editRefresh,
  list
};
