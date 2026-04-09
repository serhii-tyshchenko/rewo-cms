import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { first, isEmpty } from 'lodash-es';

import { Checkbox, FormGroup, Input, Textarea } from '@components/ui';

import { doUpdateSettings } from '@store/actions';
import {
  selectBottomPanelCollapsed,
  selectRightPanelCollapsed,
} from '@store/selectors';

import { TPostFormData } from '@types';

import { getClassName, makeConfig } from '@utils';

import { CollapseButton } from '../collapse-button';
import { ContentEditor } from '../content-editor';
import {
  BottomPanel,
  EntryMetaFields,
  LeftPanel,
  RightPanel,
} from './components';
import './post-form.styles.scss';
import { getConfig } from './post-form.utils';

interface IProps {
  data: TPostFormData;
  onChange: (data: TPostFormData) => void;
  onReloadEntry?: () => void;
  onRemoveEntry?: () => void;
  onSubmit: () => void;
  editMode?: boolean;
  hasChanges?: boolean;
  isSubmitting?: boolean;
}

const NAME_SPACE = 'post-form';

function EntryForm(props: IProps) {
  const {
    data,
    onRemoveEntry = () => {},
    onReloadEntry = () => {},
    onSubmit,
    onChange,
    editMode = false,
    hasChanges = false,
    isSubmitting = false,
  } = props;

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const {
    title,
    slug,
    content,
    meta,
    excerpt,
    categories = [],
    autoSlug = false,
    tags,
  } = data;

  const isRightPanelCollapsed = useSelector(selectRightPanelCollapsed);
  const isBottomPanelCollapsed = useSelector(selectBottomPanelCollapsed);

  const categoryId = first(categories) ?? '';

  // const metaFieldsData = useMemo(
  //   () => (meta && moduleId ? getMetaFieldsData(moduleId, meta) : []),
  //   [meta, moduleId],
  // );

  const metaFieldsData = [];

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      const { name, value } = e.target;
      onChange({ ...data, [name]: makeConfig(getConfig(value))(name) });
    },
    [onChange, data],
  );

  const handleAutoSlugChange = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      onChange({
        ...data,
        autoSlug: ev.target.checked,
        slug: ev.target.checked ? '' : slug,
      });
    },
    [onChange, data, autoSlug],
  );

  const handleContentChange = useCallback(
    (newContent: string) => onChange({ ...data, content: newContent }),
    [onChange, data],
  );

  const handleMetaChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      onChange({ ...data, meta: { ...data.meta, [name]: value } });
    },
    [onChange, data],
  );

  const handleAddTag = useCallback(
    (tagId: number) => onChange({ ...data, tags: [...tags, tagId] }),
    [onChange, data, tags],
  );

  const handleRemoveTag = useCallback(
    (tagToRemove: number) =>
      onChange({ ...data, tags: tags.filter((tag) => tag !== tagToRemove) }),
    [onChange, data, tags],
  );

  const handleRightPanelCollapse = () =>
    dispatch(
      doUpdateSettings({ isRightPanelCollapsed: !isRightPanelCollapsed }),
    );

  const handleBottomPanelCollapse = () =>
    dispatch(
      doUpdateSettings({ isBottomPanelCollapsed: !isBottomPanelCollapsed }),
    );

  const editorClassName = getClassName(`${NAME_SPACE}__editor`, 'grow', {
    expanded: isBottomPanelCollapsed,
  });

  const isSubmitDisabled =
    isSubmitting ||
    (editMode && (!hasChanges || isEmpty(title) || isEmpty(slug))) ||
    (!editMode &&
      (!hasChanges ||
        (!autoSlug && isEmpty(slug)) ||
        isEmpty(title) ||
        !categoryId));

  return (
    <form className={NAME_SPACE}>
      <LeftPanel>
        <FormGroup>
          <Input
            label={t('title')}
            name="title"
            onChange={handleChange}
            placeholder={t('enterTitle')}
            required
            value={title}
          />
        </FormGroup>
        <div className="flex items-center gap-3">
          <FormGroup className="grow">
            <Input
              name="slug"
              placeholder={t(autoSlug ? 'autoGenerateSlug' : 'enterSlug')}
              value={slug}
              label={t('slug')}
              onChange={handleChange}
              disabled={autoSlug}
            />
          </FormGroup>
          {!editMode && (
            <div className="flex pt-1">
              <Checkbox
                name="autoSlug"
                checked={autoSlug}
                onChange={handleAutoSlugChange}
                label={t('auto')}
              />
            </div>
          )}
        </div>
        <ContentEditor
          className={editorClassName}
          onChange={handleContentChange}
          value={content}
        />
        <CollapseButton
          className="relative left-1/2"
          collapsed={isBottomPanelCollapsed}
          direction="down"
          onClick={handleBottomPanelCollapse}
        />
        <BottomPanel collapsed={isBottomPanelCollapsed}>
          <EntryMetaFields data={metaFieldsData} onChange={handleMetaChange} />
          <Textarea
            label={t('excerpt')}
            name="excerpt"
            onChange={handleChange}
            value={excerpt}
            className="resize-none"
            style={{
              height: '100px',
            }}
          />
        </BottomPanel>
      </LeftPanel>
      <CollapseButton
        className="absolute right-1 top-1/2"
        collapsed={isRightPanelCollapsed}
        direction="right"
        onClick={handleRightPanelCollapse}
      />
      <RightPanel
        collapsed={isRightPanelCollapsed}
        postData={data}
        editMode={editMode}
        submitDisabled={isSubmitDisabled}
        onSubmit={onSubmit}
        onChange={handleChange}
        onAddTag={handleAddTag}
        onRemoveTag={handleRemoveTag}
        onReloadEntry={onReloadEntry}
        onRemoveEntry={onRemoveEntry}
      />
    </form>
  );
}

export default EntryForm;
