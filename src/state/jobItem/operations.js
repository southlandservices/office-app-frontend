import types from './types';

const endpointBase = `${process.env.API_PREFIX}`;

const getHeaders = () => {
  const authorization = localStorage.getItem('token');
  return { authorization };
}

const listJobItems = (id) => {
  const endpoint = `${endpointBase}jobitems/job/${id}`;
  const headers = getHeaders();
  return async (dispatch) => {
    try {
      let response = await fetch(endpoint, {
        method: 'GET',
        headers
      });
      let jobItems = await response.json();
      dispatch({ type: types.LIST_JOB_ITEMS, payload: jobItems });
    } catch (e) {
      dispatch({ type: types.ERROR, payload: e })
    }
  }
}

const addJobItem = (data) => {
  const endpoint = `${endpointBase}jobitems`;
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

const updateJobItem = (id, data) => {
  const endpoint = `${endpointBase}jobItems/${id}`;
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
      console.log('error', e)
      dispatch({ type: types.PERSIST_ERROR, payload: e });
    }
  }
}

export default {
  listJobItems,
  addJobItem,
  updateJobItem
}