import { TRootState } from '@store';

export const selectLanguage = (state: TRootState) => state.settings.language;
export const selectTheme = (state: TRootState) => state.settings.theme;
export const selectNavCollapsed = (state: TRootState) =>
  state.settings.isNavCollapsed;
export const selectRightPanelCollapsed = (state: TRootState) =>
  state.settings.isRightPanelCollapsed;
export const selectBottomPanelCollapsed = (state: TRootState) =>
  state.settings.isBottomPanelCollapsed;
export const selectLastUrl = (state: TRootState) => state?.settings?.lastUrl;
