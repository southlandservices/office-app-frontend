import actions from './actions';
import types from './types';

let authorization = '';
if(process.env.ENV === 'local') { authorization = process.env.TOKEN };
const endpointBase = `${process.env.API_PREFIX}`;
const headers = {
  authorization
};

const list = () => {
  const endpoint = `${endpointBase}users`;
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