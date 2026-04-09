import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { isEmpty } from 'lodash-es';

import { FormGroup, Pill, Select } from '@components/ui';

import { TTag } from '@types';

import { formatOptions } from '@utils';

interface IProps {
  allTags: TTag[];
  postTags: number[];
  onAddTag: (tagId: number) => void;
  onRemoveTag: (tagId: number) => void;
}

function PostTagsManager(props: IProps) {
  const { allTags, postTags = [], onAddTag, onRemoveTag } = props;

  const { t } = useTranslation();

  const notUsedTags = allTags.filter(
    (tag: TTag) => !postTags?.includes(tag.id),
  );
  const tagsList = useMemo(
    () =>
      postTags
        .map((tagId) => allTags.find((tag: TTag) => tag.id === tagId))
        .filter(Boolean) as TTag[],
    [postTags, allTags],
  );

  const tagOptions = useMemo(
    () =>
      formatOptions({
        options: notUsedTags,
        placeholder: t('selectTag'),
        withTitle: true,
      }),
    [notUsedTags, t],
  );

  const handleAddTag = (ev: React.ChangeEvent<HTMLSelectElement>) =>
    onAddTag(Number(ev.target.value));

  const handleRemoveTag = (value: string | number) =>
    onRemoveTag(Number(value));

  return (
    <div data-testid="post-tags-manager">
      <FormGroup>
        <Select
          options={tagOptions}
          onChange={handleAddTag}
          value=""
          label={t('tags')}
          className="w-full"
          name="tags"
          disabled={isEmpty(notUsedTags)}
        />
      </FormGroup>
      {!isEmpty(tagsList) && (
        <div className="flex flex-wrap gap-2 mb-4">
          {tagsList.map(({ id, name }) => (
            <Pill
              key={id}
              value={id}
              label={name}
              size="small"
              onClick={handleRemoveTag}
              removeTitle={t('removeTag')}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default PostTagsManager;
