import { useTranslation } from 'react-i18next';

import { FormGroup, InputDateTime } from '@components/ui';

import { CATEGORIES_DEFAULT_QUERY_PARAMS } from '@constants';
import { TAGS_DEFAULT_QUERY_PARAMS } from '@constants/_tags';

import { useListCategories, useListTags } from '@queries';

import { TPostFormData } from '@types';

import { getClassName } from '@utils';

import {
  PostActions,
  PostCategories,
  PostFeaturedMedia,
  PostSubmitButton,
  PostTagsManager,
} from './components';
import useFeaturedMedia from './use-featured-media';

interface IProps {
  postData: TPostFormData;
  collapsed?: boolean;
  editMode?: boolean;
  onSubmit: () => void;
  submitDisabled?: boolean;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  onAddTag: (id: number) => void;
  onRemoveTag: (id: number) => void;
  onReloadEntry?: () => void;
  onRemoveEntry?: () => void;
}

function RightPanel(props: IProps) {
  const {
    postData,
    editMode = false,
    collapsed = false,
    onSubmit,
    submitDisabled = false,
    onChange,
    onAddTag,
    onRemoveTag,
    onReloadEntry = () => {},
    onRemoveEntry = () => {},
  } = props;
  const { meta, categories = [], date = '', tags, featuredMedia } = postData;

  const { t } = useTranslation();

  const {
    link: mediaLink,
    sizes: mediaSizes,
    isLoading: isMediaLoading,
  } = useFeaturedMedia(featuredMedia, meta);

  const {
    data: { data: allTags },
  } = useListTags(TAGS_DEFAULT_QUERY_PARAMS);

  const { data: allCategories } = useListCategories(
    CATEGORIES_DEFAULT_QUERY_PARAMS,
  );

  const className = getClassName('flex flex-col', {
    hidden: collapsed,
  });

  return (
    <aside
      className={className}
      data-testid="right-panel"
      style={{ width: '15rem' }}
    >
      <PostCategories
        allCategories={allCategories.data}
        onChange={onChange}
        postCategories={categories}
      />
      {editMode && (
        <>
          <FormGroup>
            <InputDateTime
              label={t('date')}
              name="date"
              onChange={onChange}
              value={date}
            />
          </FormGroup>
          <PostActions
            data={postData}
            onReloadEntry={onReloadEntry}
            onRemoveEntry={onRemoveEntry}
          />
        </>
      )}
      <PostTagsManager
        allTags={allTags}
        postTags={tags}
        onAddTag={onAddTag}
        onRemoveTag={onRemoveTag}
      />
      {editMode && (
        <PostFeaturedMedia
          loading={isMediaLoading}
          link={mediaLink}
          sizes={mediaSizes}
        />
      )}
      <PostSubmitButton
        disabled={submitDisabled}
        onClick={onSubmit}
        editMode={editMode}
      />
    </aside>
  );
}

export default RightPanel;
