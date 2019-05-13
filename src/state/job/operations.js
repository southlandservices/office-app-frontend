import actions from './actions';
import types from './types';

const endpointBase = `${process.env.API_PREFIX}`;

const getHeaders = () => {
  const authorization = localStorage.getItem('token');
  return { authorization }
}

const list = () => {
  const endpoint = `${endpointBase}jobs`;
  const headers = getHeaders();
  return async (dispatch) => {
    try {
      let response = await fetch(endpoint, {
        method: 'GET',
        headers
      });
      let jobs = await response.json();
      dispatch({ type: types.LIST, payload: jobs });
    } catch (e) {
      dispatch({ type: types.ERROR_JOB, payload: e })
    }
  }
};

const getOne = (id) => {
  const endpoint = `${endpointBase}jobs/${id}`;
  const headers = getHeaders();
  return async (dispatch) => {
    try {
      let response = await fetch(endpoint, {
        method: 'GET',
        headers
      });
      let job = await response.json();
      dispatch({ type: types.SET_JOB, payload: job });
    } catch (e) {
      dispatch({ type: types.ERROR, payload: e })
    }
  }
}

const addJob = (data) => {
  const endpoint = `${endpointBase}jobs`;
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

const updateJob = (id, data) => {
  const endpoint = `${endpointBase}jobs/${id}`;
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

const editRefresh = data => {
  return dispatch => dispatch(actions.editRefresh(data));
};

export default {
  addJob,
  updateJob,
  list,
  get: getOne,
  editRefresh
}