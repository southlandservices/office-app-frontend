import actions from './actions';
import types from './types';

const endpointBase = `${process.env.API_PREFIX}`;

const logIn = ({ email, password }) => {
  return async (dispatch) => {
    try {
      const endpoint = `${endpointBase}authentication`;
      const response = await fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify({
          email,
          password
        })        
      });
      const result = await response.json();
      localStorage.setItem('token', result.data.token);
      dispatch({ type: types.AUTHENTICATION_SET, payload: result.data });
    } catch (e) {
      dispatch({ type: types.AUTHENTICATION_ERROR })
    }
  }
}

const logOut = () => {
  return (dispatch) => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    dispatch({ type: types.AUTHENTICATION_UNSET });
  }
}

export default {
  logIn,
  logOut
}