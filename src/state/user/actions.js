import types from './types';

export const list = data => {
  return {
    type: types.LIST,
    payload: data
  };
};

export const getUser = data => {
  return {
    type: types.GET_UUSER,
    payload: data
  };
};

export const editRefresh = data => {
  return {
    type: types.EDIT_REFRESH,
    payload: data
  };
};

export const addUser = (text, Users) => ({
  type: types.ADD_User,
  payload: Users
});

export const updateUser = data => {
  return {
    type: types.UPDATE_USER,
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

export const toggleUserStatus = id => ({
  type: types.TOGGLE_USER,
  id
});

export const notes = data => {
  return {
    type: types.LIST_NOTES,
    payload: data
  };
};

export default {
  getUser,
  addUser,
  updateUser,
  persistSuccess,
  persistError,
  editRefresh,
  toggleUserStatus,
  list,
  notes
};
