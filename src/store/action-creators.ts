import { API_REQUEST_ENDED, API_REQUEST_STARTED } from './action-types';

export const actionApiRequestStarted = () => ({
  type: API_REQUEST_STARTED,
});

export const actionApiRequestEnded = () => ({
  type: API_REQUEST_ENDED,
});
