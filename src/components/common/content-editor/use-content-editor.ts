import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { useToggle } from '@hooks';

import { getSelection } from '@utils';

import {
  getButtonsConfig,
  getVisualButtonsConfig,
} from './content-editor.config';
import { normalizeValue, restoreCaretPosition } from './content-editor.utils';

interface IUseContentEditorParams {
  onChange: (value: string) => void;
  value: string;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
}

const useContentEditor = ({
  onChange,
  value,
  textareaRef,
}: IUseContentEditorParams) => {
  const [isSymbolPickerOpen, toggleSymbolPicker] = useToggle();
  const [isFindAndReplaceOpen, toggleFindAndReplace] = useToggle();
  const [isTableConstructorOpen, toggleTableConstructor] = useToggle();
  const [isFullScreen, toggleFullScreen] = useToggle();
  const [isPreviewMode, togglePreviewMode] = useToggle();
  const [isSnippetsModalOpen, toggleSnippetsModal] = useToggle();
  const [isInsertImageModalOpen, toggleInsertImageModal] = useToggle();
  const { t } = useTranslation();

  const handleTextEditorChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value),
    [onChange],
  );

  const handleVisualEditorChange = useCallback(
    (e: React.ChangeEvent<HTMLDivElement>) =>
      onChange(normalizeValue(e.target.innerHTML)),
    [onChange],
  );

  const wrapWithTag = async (
    tag: string,
    className = '',
    data: string[] = [],
  ) => {
    const { start, end } = getSelection(textareaRef);
    const classValue = className ? ` class="${className}"` : '';
    const dataAttrsValue = data.length ? ` ${data.join(' ')}` : '';
    await onChange(
      `${value.substring(
        0,
        start,
      )}<${tag}${classValue}${dataAttrsValue}>${value.substring(
        start,
        end,
      )}</${tag}>${value.substring(end)}`,
    );
    const newStart =
      end + tag.length + 2 + (className ? className.length + 9 : 0);
    restoreCaretPosition(textareaRef, newStart);
  };

  const wrapWithCustomClass = (
    className: string,
    data: string[],
    tag: string,
  ) => wrapWithTag(tag, className, data);

  const insertText = async (text: string) => {
    const { start, end } = getSelection(textareaRef);
    await onChange(
      `${value.substring(0, start)}${text}${value.substring(end)}`,
    );
    restoreCaretPosition(textareaRef, start + text.length);
  };

  const changeCase = () => {
    const selectedText = getSelection(textareaRef).value;
    const newText =
      // eslint-disable-next-line no-nested-ternary
      selectedText === selectedText.toUpperCase()
        ? selectedText.toLowerCase()
        : selectedText === selectedText.toLowerCase()
          ? selectedText.charAt(0).toUpperCase() + selectedText.slice(1)
          : selectedText.toUpperCase();

    insertText(newText);
  };

  const textEditorToolbarConfig = getButtonsConfig({
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
  });

  const visualEditorToolbarConfig = getVisualButtonsConfig({
    toggleFindAndReplace,
    toggleFullScreen,
    isFindAndReplaceOpen,
    isFullScreen,
    t,
  });

  const handleReplaceConfirm = (formValues: {
    find: string;
    replace: string;
  }) => onChange(value.replaceAll(formValues.find, formValues.replace));

  return {
    isSymbolPickerOpen,
    toggleSymbolPicker,
    isFindAndReplaceOpen,
    toggleFindAndReplace,
    isTableConstructorOpen,
    toggleTableConstructor,
    isSnippetsModalOpen,
    toggleSnippetsModal,
    toggleInsertImageModal,
    isInsertImageModalOpen,
    handleTextEditorChange,
    handleVisualEditorChange,
    insertText,
    handleReplaceConfirm,
    textEditorToolbarConfig,
    visualEditorToolbarConfig,
    wrapWithTag,
    wrapWithCustomClass,
    isFullScreen,
    isPreviewMode,
  };
};

export default useContentEditor;
