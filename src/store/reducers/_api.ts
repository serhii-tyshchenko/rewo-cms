import {
  API_REQUEST_ENDED,
  API_REQUEST_STARTED,
  LOG_OUT,
} from '../action-types';

const initialState = {
  error: '',
  loading: false,
};

type TReducerAction =
  | { type: typeof API_REQUEST_STARTED }
  | { type: typeof API_REQUEST_ENDED }
  | { type: typeof LOG_OUT };

const apiReducer = (state = initialState, action: TReducerAction) => {
  const { type } = action;
  switch (type) {
    case API_REQUEST_STARTED:
      return { ...state, loading: true };
    case API_REQUEST_ENDED:
      return { ...state, loading: false };
    case LOG_OUT:
      return initialState;
    default:
      return state;
  }
};

export default apiReducer;
