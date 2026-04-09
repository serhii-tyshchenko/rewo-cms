/* eslint-disable default-param-last */
import { TSnippet } from '@types';

import { ADD_SNIPPET, REMOVE_SNIPPET, UPDATE_SNIPPET } from '../action-types';

const initialState: TSnippet[] = [];

type TSnippetAction =
  | { type: typeof ADD_SNIPPET; payload: TSnippet }
  | { type: typeof UPDATE_SNIPPET; payload: TSnippet }
  | { type: typeof REMOVE_SNIPPET; payload: TSnippet['id'] };

const snippetsReducer = (
  state: TSnippet[] = initialState,
  action: TSnippetAction,
): TSnippet[] => {
  switch (action.type) {
    case ADD_SNIPPET:
      return [...state, action.payload];
    case UPDATE_SNIPPET:
      return state.map((s) =>
        s.id === action.payload.id ? action.payload : s,
      );
    case REMOVE_SNIPPET:
      return state.filter((s) => s.id !== action.payload);

    default:
      return state;
  }
};

export default snippetsReducer;
