import { LS_KEY_NAME } from '@constants';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem(LS_KEY_NAME);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const getKey = (key) => {
  const state = loadState();
  return state ? state[key] : undefined;
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(LS_KEY_NAME, serializedState);
  } catch {
    // eslint-disable-next-line no-console
    console.error('Unable to save to LS');
  }
};

const clearState = () => localStorage.removeItem(LS_KEY_NAME);

const AUTH_TOKEN = getKey('user')?.token;

export { getKey, saveState, clearState, loadState, AUTH_TOKEN };
