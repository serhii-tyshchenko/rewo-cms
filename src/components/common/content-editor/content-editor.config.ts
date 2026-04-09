import { TFunction } from 'i18next';

interface IGetButtonsConfigParams {
  wrapWithTag: (
    tag: string,
    className?: string,
    data?: string[],
  ) => Promise<void>;
  insertText: (text: string) => void;
  changeCase: () => void;
  toggleSymbolPicker: () => void;
  toggleFindAndReplace: () => void;
  toggleTableConstructor: () => void;
  toggleFullScreen: () => void;
  toggleSnippetsModal: () => void;
  toggleInsertImageModal: () => void;
  isFindAndReplaceOpen: boolean;
  isFullScreen: boolean;
  isPreviewMode: boolean;
  togglePreviewMode: () => void;
  t: TFunction;
}

interface IGetVisualButtonsConfigParams {
  toggleFindAndReplace: () => void;
  toggleFullScreen: () => void;
  isFindAndReplaceOpen: boolean;
  isFullScreen: boolean;
  t: TFunction;
}

export const getButtonsConfig = ({
  wrapWithTag,
  insertText,
  changeCase,
  toggleSymbolPicker,
  toggleFindAndReplace,
  toggleTableConstructor,
  toggleFullScreen,
  toggleSnippetsModal,
  toggleInsertImageModal,
  isFindAndReplaceOpen,
  isFullScreen,
  isPreviewMode,
  togglePreviewMode,
  t,
}: IGetButtonsConfigParams) => [
  {
    icon: 'bold',
    onClick: () => wrapWithTag('strong'),
    title: t('textEditor.buttonTitle.bold'),
    className: 'mr-1',
  },
  {
    icon: 'italic',
    onClick: () => wrapWithTag('em'),
    title: t('textEditor.buttonTitle.italic'),
    className: 'mr-1',
  },
  {
    icon: 'underline',
    onClick: () => wrapWithTag('u'),
    title: t('textEditor.buttonTitle.underline'),
    className: 'mr-1',
  },
  {
    icon: 'strike',
    onClick: () => wrapWithTag('s'),
    title: t('textEditor.buttonTitle.strikethrough'),
    className: 'mr-1',
  },
  {
    icon: 'subscript',
    onClick: () => wrapWithTag('sub'),
    title: t('textEditor.buttonTitle.subscript'),
    className: 'mr-1',
  },
  {
    icon: 'superscript',
    onClick: () => wrapWithTag('sup'),
    title: t('textEditor.buttonTitle.superscript'),
    className: 'mr-1',
  },
  {
    icon: 'paragraph',
    onClick: () => wrapWithTag('p'),
    title: t('textEditor.buttonTitle.paragraph'),
    className: 'mr-1',
  },
  {
    icon: 'font',
    onClick: () => changeCase(),
    title: t('textEditor.buttonTitle.changeCase'),
    className: 'mr-1',
  },
  {
    icon: 'level-down',
    onClick: () => insertText('<br />'),
    title: t('textEditor.buttonTitle.insertLineBreak'),
    className: 'mr-1',
  },
  {
    icon: 'table',
    onClick: () => toggleTableConstructor(),
    title: t('textEditor.buttonTitle.tableConstructor'),
    className: 'mr-1',
  },
  {
    icon: 'picture',
    onClick: toggleInsertImageModal,
    title: t('textEditor.buttonTitle.insertImage'),
    className: 'mr-1',
  },
  {
    icon: 'at',
    onClick: () => toggleSymbolPicker(),
    title: t('textEditor.buttonTitle.insertSymbol'),
    className: 'mr-4',
  },
  {
    icon: 'search',
    onClick: () => toggleFindAndReplace(),
    title: t('textEditor.buttonTitle.findAndReplace'),
    className: 'mr-1',
    toggled: isFindAndReplaceOpen,
  },
  {
    icon: 'star-empty',
    onClick: () => toggleSnippetsModal(),
    title: t('textEditor.buttonTitle.snippets'),
    className: 'mr-1',
  },
  {
    icon: 'eye',
    onClick: () => togglePreviewMode(),
    title: t('textEditor.buttonTitle.preview'),
    className: 'ml-auto mr-1',
    toggled: isPreviewMode,
  },
  {
    icon: isFullScreen ? 'resize-small' : 'resize-full',
    onClick: () => toggleFullScreen(),
    title: t('textEditor.buttonTitle.fullScreen'),
  },
];

export const getVisualButtonsConfig = ({
  toggleFindAndReplace,
  toggleFullScreen,
  isFindAndReplaceOpen,
  isFullScreen,
  t,
}: IGetVisualButtonsConfigParams) => [
  {
    icon: 'search',
    onClick: () => toggleFindAndReplace(),
    title: t('textEditor.buttonTitle.findAndReplace'),
    className: 'mr-1',
    toggled: isFindAndReplaceOpen,
  },
  {
    className: 'ml-auto',
    icon: isFullScreen ? 'resize-small' : 'resize-full',
    onClick: () => toggleFullScreen(),
    title: t('textEditor.buttonTitle.fullScreen'),
    toggled: isFullScreen,
  },
];
