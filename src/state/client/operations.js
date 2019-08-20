import actions from './actions';
import types from './types';

const endpointBase = `${process.env.API_PREFIX}`;

const getHeaders = () => {
  const authorization = localStorage.getItem('token');
  return { authorization }
}

const list = () => {
  const endpoint = `${endpointBase}clients`;
  const headers = getHeaders();
  return async (dispatch) => {
    try {
      let response = await fetch(endpoint, {
        method: 'GET',
        headers
      });
      let clients = await response.json();
      dispatch({ type: types.LIST, payload: clients });
    } catch (e) {
      dispatch({ type: types.ERROR_CLIENT, payload: e })
    }
  }
};

const getOne = (id) => {
  const endpoint = `${endpointBase}clients/${id}`;
  const headers = getHeaders();
  return async (dispatch) => {
    try {
      let response = await fetch(endpoint, {
        method: 'GET',
        headers
      });
      let client = await response.json();
      dispatch({ type: types.SET_CLIENT, payload: client });
    } catch (e) {
      dispatch({ type: types.ERROR, payload: e })
    }
  }
}

const addClient = (data) => {
  const endpoint = `${endpointBase}clients`;
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

const updateClient = (id, data) => {
  const endpoint = `${endpointBase}clients/${id}`;
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
  addClient,
  updateClient,
  list,
  get: getOne,
  editRefresh
}