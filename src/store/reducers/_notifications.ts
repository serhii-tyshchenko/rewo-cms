/* eslint-disable default-param-last */
import { TNotification } from '@types';

import {
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION,
  REMOVE_NOTIFICATIONS,
} from '../action-types';

const initialState: TNotification[] = [];

const notificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return [action.payload, ...state];
    case REMOVE_NOTIFICATION:
      return state.filter((n) => n.id !== action.payload);
    case REMOVE_NOTIFICATIONS:
      return initialState;
    default:
      return state;
  }
};

export default notificationsReducer;
