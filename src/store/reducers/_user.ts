/* eslint-disable default-param-last */
import { LOG_IN, LOG_OUT } from '../action-types';

const initialState = {
  isLogged: false,
  email: null,
  token: null,
  name: null,
  displayName: null,
  locale: 'en-US',
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOG_IN:
      return {
        isLogged: true,
        ...payload,
      };
    case LOG_OUT:
      return initialState;
    default:
      return state;
  }
};

export default userReducer;
