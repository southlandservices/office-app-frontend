import types from './types';

export const list = data => {
  return {
    type: types.LIST_CLIENTCONTACTS,
    payload: data
  };
};

export default {
  list
}