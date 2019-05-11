import types from './types';

const endpointBase = `${process.env.API_PREFIX}`;

const getHeaders = () => {
  const authorization = localStorage.getItem('token');
  return { authorization }
}

const list = () => {
  const endpoint = `${endpointBase}roles`;
  const headers = getHeaders();
  return async (dispatch) => {
    try {
      let response = await fetch(endpoint, {
        method: 'GET',
        headers
      });
      let roles = await response.json();
      dispatch({ type: types.LIST, payload: roles });
    } catch (e) {
      dispatch({ type: types.ERROR, payload: e })
    }
  }
};

export default {
  list
}