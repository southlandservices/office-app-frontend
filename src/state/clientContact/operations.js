import types from './types';

const endpointBase = `${process.env.API_PREFIX}`;

const getHeaders = () => {
  const authorization = localStorage.getItem('token');
  return { authorization }
}

const list = () => {
  const endpoint = `${endpointBase}clientContacts`;
  const headers = getHeaders();
  return async (dispatch) => {
    try {
      let response = await fetch(endpoint, {
        method: 'GET',
        headers
      });
      let clientContacts = await response.json();
      dispatch({ type: types.LIST, payload: clientContacts });
    } catch (e) {
      dispatch({ type: types.ERROR, payload: e })
    }
  }
};

const listByClient = (clientId) => {
  const endpoint = `${endpointBase}clients/${clientId}/contacts`;
  const headers = getHeaders();
  return async (dispatch) => {
    try {
      let response = await fetch(endpoint, {
        method: 'GET',
        headers
      });
      let clientContacts = await response.json();
      dispatch({ type: types.LIST, payload: clientContacts });
    } catch (e) {
      dispatch({ type: types.ERROR, payload: e })
    }
  }
};

const getOne = (id) => {
  const endpoint = `${endpointBase}clientContacts/${id}`;
  const headers = getHeaders();
  return async (dispatch) => {
    try {
      let response = await fetch(endpoint, {
        method: 'GET',
        headers
      });
      let clientContact = await response.json();
      dispatch({ type: types.SET_CLIENTCONTACT, payload: clientContact });
    } catch (e) {
      dispatch({ type: types.ERROR, payload: e })
    }
  }
}

const addClientContact = (data) => {
  const endpoint = `${endpointBase}clientContacts`;
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

const updateClientContact = (id, data) => {
  const endpoint = `${endpointBase}clientContacts/${id}`;
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
  addClientContact,
  updateClientContact,
  list,
  listByClient,
  get: getOne,
  editRefresh
}