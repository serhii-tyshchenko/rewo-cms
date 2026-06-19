export type TSettingsState = {
  language: 'en' | 'uk';
  theme:
    | 'light'
    | 'dark'
    | 'light-blue'
    | 'dark-blue'
    | 'light-red'
    | 'dark-red'
    | 'system';
  isNavCollapsed: boolean;
  isRightPanelCollapsed: boolean;
  isBottomPanelCollapsed: boolean;
  textEditorPreviewEnabled: boolean;
  textEditorMode: 'visual' | 'text' | 'text+preview';
};
