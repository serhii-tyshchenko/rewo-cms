import { TRootState } from '@store';

export const selectUserData = (state: TRootState) => state.user;
