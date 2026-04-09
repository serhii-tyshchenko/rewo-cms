import { TRootState } from '@store';

export const selectSnippetsData = (state: TRootState) => state.snippets;
