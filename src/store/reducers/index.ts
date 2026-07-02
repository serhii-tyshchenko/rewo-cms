import { combineReducers } from 'redux';

import apiReducer from './_api';
import settingsReducer from './_settings';
import snippetsReducer from './_snippets';
import userReducer from './_user';

const rootReducer = combineReducers({
  user: userReducer,
  api: apiReducer,
  settings: settingsReducer,
  snippets: snippetsReducer,
});

export default rootReducer;
