import { UPDATE_SETTINGS } from '../action-types';

export const doUpdateSettings = (data) => ({
  type: UPDATE_SETTINGS,
  payload: data,
});
