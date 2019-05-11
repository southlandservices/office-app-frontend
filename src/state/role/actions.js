import types from './types';

export const list = data => {
  return {
    type: types.LIST,
    payload: data
  };
};

export default {
  list
}