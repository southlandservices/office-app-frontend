import types from './types';

const endpointBase = `${process.env.API_PREFIX}`;

const getHeaders = () => {
  const authorization = localStorage.getItem('token');
  return { authorization }
}

const listNotes = (id, slug) => {
  const endpoint = `${endpointBase}${slug}s/${id}/notes`;
  const headers = getHeaders();
  return async (dispatch) => {
    try {
      let response = await fetch(endpoint, {
        method: 'GET',
        headers
      });
      let notes = await response.json();
      dispatch({ type: types.LIST_NOTES, payload: notes });
    } catch (e) {
      dispatch({ type: types.ERROR, payload: e })
    }
  }
};

const addNote = (data, slug) => {
  const endpoint = `${endpointBase}${slug}notes`;
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

const updateNote = (id, data, slug) => {
  const endpoint = `${endpointBase}${slug}notes/${id}`;
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
  listNotes,
  addNote,
  updateNote
}