import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { noop } from 'lodash-es';

import { Tabs, Textarea } from '@components/ui';

import { countWords, getClassName, getSelection } from '@utils';

import {
  FindAndReplacePanel,
  InsertImageModal,
  SnippetsModal,
  SymbolPickerModal,
  TableConstructorModal,
  Toolbar,
} from './components';
import { NAME_SPACE } from './content-editor.constants';
import './content-editor.styles.scss';
import useContentEditor from './use-content-editor';

interface IProps {
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  defaultMode?: 'visual' | 'text' | 'text+preview';
}

function ContentEditor(props: IProps) {
  const {
    value = '',
    onChange = noop,
    className = '',
    defaultMode = 'visual',
  } = props;
  const { t } = useTranslation();

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const {
    isSymbolPickerOpen,
    toggleSymbolPicker,
    isFindAndReplaceOpen,
    isTableConstructorOpen,
    toggleTableConstructor,
    isSnippetsModalOpen,
    toggleSnippetsModal,
    isInsertImageModalOpen,
    toggleInsertImageModal,
    handleTextEditorChange,
    handleVisualEditorChange,
    handleReplaceConfirm,
    insertText,
    textEditorToolbarConfig,
    visualEditorToolbarConfig,
    isFullScreen,
    isPreviewMode,
  } = useContentEditor({
    value,
    onChange,
    textareaRef,
    isPreviewEnabled: defaultMode === 'text+preview',
  });

  const componentClassName = getClassName(
    NAME_SPACE,
    { [`${NAME_SPACE}--full-screen`]: isFullScreen },
    className,
  );
  const textEditorClassName = getClassName(`${NAME_SPACE}-textarea`, {
    [`${NAME_SPACE}-textarea--with-preview`]: isPreviewMode,
  });
  const isVisualMode = defaultMode === 'visual';

  return (
    <>
      <Tabs
        labels={[t('textEditor.visual'), t('textEditor.text')]}
        tabsPosition="right"
        className={componentClassName}
        activeTab={isVisualMode ? 0 : 1}
      >
        <div className="flex flex-col grow">
          <Toolbar config={visualEditorToolbarConfig} />
          <FindAndReplacePanel
            opened={isFindAndReplaceOpen}
            onConfirm={handleReplaceConfirm}
          />
          <div
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: value }}
            contentEditable
            onBlur={handleVisualEditorChange}
            className={`${NAME_SPACE}-textarea`}
          />
          <div className="p-1 text-xs">
            {value.length} characters | {countWords(value)} words
          </div>
        </div>
        <div className="flex flex-col grow">
          <Toolbar config={textEditorToolbarConfig} />
          <FindAndReplacePanel
            opened={isFindAndReplaceOpen}
            onConfirm={handleReplaceConfirm}
            selectedText={getSelection(textareaRef).value}
          />
          <div className="flex gap-2 grow">
            <Textarea
              value={value}
              onChange={handleTextEditorChange}
              className={textEditorClassName}
              innerRef={textareaRef}
            />
            {isPreviewMode && (
              <div
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: value }}
                className={`${NAME_SPACE}-preview`}
                contentEditable
                onBlur={handleVisualEditorChange}
              />
            )}
          </div>
          <div className="p-1 text-xs">
            {value.length} characters | {countWords(value)} words
          </div>
        </div>
      </Tabs>
      {isSymbolPickerOpen && (
        <SymbolPickerModal onClose={toggleSymbolPicker} onPick={insertText} />
      )}
      {isTableConstructorOpen && (
        <TableConstructorModal
          onClose={toggleTableConstructor}
          onConfirm={insertText}
        />
      )}
      {isSnippetsModalOpen && (
        <SnippetsModal onClose={toggleSnippetsModal} onPick={insertText} />
      )}
      {isInsertImageModalOpen && (
        <InsertImageModal
          onClose={toggleInsertImageModal}
          onConfirm={insertText}
        />
      )}
    </>
  );
}

export default ContentEditor;
