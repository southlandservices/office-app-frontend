import actions from './actions';
import types from './types';

const endpointBase = `${process.env.API_PREFIX}`;

const getHeaders = () => {
  const authorization = localStorage.getItem('token');
  return { authorization }
}

const list = () => {
  const endpoint = `${endpointBase}users`;
  const headers = getHeaders();
  return async (dispatch) => {
    try {
      let response = await fetch(endpoint, {
        method: 'GET',
        headers
      });
      let users = await response.json();
      dispatch({ type: types.LIST, payload: users });
    } catch (e) {
      dispatch({ type: types.ERROR, payload: e })
    }
  }
};

const getOne = (id) => {
  const endpoint = `${endpointBase}users/${id}`;
  const headers = getHeaders();
  return async (dispatch) => {
    try {
      let response = await fetch(endpoint, {
        method: 'GET',
        headers
      });
      let user = await response.json();
      dispatch({ type: types.SET_USER, payload: user });
    } catch (e) {
      dispatch({ type: types.ERROR, payload: e })
    }
  }
}

const addUser = (data) => {
  const endpoint = `${endpointBase}users`;
  const headers = getHeaders();
  return async (dispatch) => {
    try {
      let response = await fetch(endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify(data)
      });
      let result = await response.json();
      dispatch({ type: types.PERSIST_SUCCESS, payload: result });
    } catch (e) {
      dispatch({ type: types.PERSIST_ERROR, payload: e });
    }
  }
}

const updateUser = (id, data) => {
  const endpoint = `${endpointBase}users/${id}`;
  const headers = getHeaders();
  return async (dispatch) => {
    try {
      let response = await fetch(endpoint, {
        method: 'PUT',
        headers,
        body: JSON.stringify(data)
      });
      let result = await response.json();
      dispatch({ type: types.PERSIST_SUCCESS, payload: result });
    } catch (e) {
      dispatch({ type: types.PERSIST_ERROR, payload: e });
    }
  }
}

// client-only
const editRefresh = data => {
  return dispatch => dispatch(actions.editRefresh(data));
};

export default {
  addUser,
  updateUser,
  list,
  get: getOne,
  editRefresh
}