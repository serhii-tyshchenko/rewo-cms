import { TSnippet } from '@types';

import { ADD_SNIPPET, REMOVE_SNIPPET, UPDATE_SNIPPET } from '../action-types';

export const doAddSnippet = (snippet: TSnippet) => ({
  type: ADD_SNIPPET,
  payload: snippet,
});

export const doUpdateSnippet = (snippet: TSnippet) => ({
  type: UPDATE_SNIPPET,
  payload: snippet,
});

export const doRemoveSnippet = (id: TSnippet['id']) => ({
  type: REMOVE_SNIPPET,
  payload: id,
});
