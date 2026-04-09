import { TRootState } from '@store';

export const selectAPILoading = (state: TRootState) => state.api.loading;
