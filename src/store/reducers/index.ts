import { combineReducers } from 'redux';

import apiReducer from './_api';
import notificationsReducer from './_notifications';
import settingsReducer from './_settings';
import snippetsReducer from './_snippets';
import userReducer from './_user';

const rootReducer = combineReducers({
  user: userReducer,
  api: apiReducer,
  settings: settingsReducer,
  notifications: notificationsReducer,
  snippets: snippetsReducer,
});

export default rootReducer;
