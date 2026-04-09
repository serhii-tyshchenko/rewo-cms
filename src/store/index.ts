import * as ls from '@storage';
import {
  applyMiddleware,
  compose,
  legacy_createStore as createStore,
} from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

const persistedState = ls.loadState();

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  persistedState,
  composeTools(applyMiddleware(thunk)),
);

store.subscribe(() => {
  const { user, settings, snippets } = store.getState();
  ls.saveState({
    user,
    settings,
    snippets,
  });
});

export type TRootState = ReturnType<typeof store.getState>;

export type TAppDispatch = typeof store.dispatch;

export default store;
