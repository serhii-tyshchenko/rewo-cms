/* eslint-disable default-param-last */
import { UPDATE_SETTINGS } from '../action-types';

const initialState = {
  language: 'en',
  theme: 'light',
  isNavCollapsed: false,
  isRightPanelCollapsed: false,
  isBottomPanelCollapsed: false,
};

const settingsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_SETTINGS:
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default settingsReducer;
