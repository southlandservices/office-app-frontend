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
      dispatch({ type: types.ERROR })
    }
  }
};

// client-only
const editRefresh = data => {
  return dispatch => dispatch(actions.editRefresh(data));
};

const toggleSponsorStatus = id => {
  return actions.toggleSponsorStatus(id);
};

export default {
  list,
  editRefresh,
  toggleSponsorStatus
}