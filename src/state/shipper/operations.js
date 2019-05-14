import actions from './actions';
import types from './types';

const endpointBase = `${process.env.API_PREFIX}`;

const getHeaders = () => {
  const authorization = localStorage.getItem('token');
  return { authorization }
}

const list = () => {
  const endpoint = `${endpointBase}shippers`;
  const headers = getHeaders();
  return async (dispatch) => {
    try {
      let response = await fetch(endpoint, {
        method: 'GET',
        headers
      });
      let shippers = await response.json();
      dispatch({ type: types.LIST, payload: shippers });
    } catch (e) {
      dispatch({ type: types.ERROR, payload: e })
    }
  }
};

const getOne = (id) => {
  const endpoint = `${endpointBase}shippers/${id}`;
  const headers = getHeaders();
  return async (dispatch) => {
    try {
      let response = await fetch(endpoint, {
        method: 'GET',
        headers
      });
      let shipper = await response.json();
      dispatch({ type: types.SET_SHIPPER, payload: shipper });
    } catch (e) {
      dispatch({ type: types.ERROR, payload: e })
    }
  }
}

const addShipper = (data) => {
  const endpoint = `${endpointBase}shippers`;
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

const updateShipper = (id, data) => {
  const endpoint = `${endpointBase}shippers/${id}`;
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
  addShipper,
  updateShipper,
  list,
  get: getOne,
  editRefresh
}