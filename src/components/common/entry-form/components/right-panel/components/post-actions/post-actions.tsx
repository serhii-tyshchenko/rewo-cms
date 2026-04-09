import { useTranslation } from 'react-i18next';

import { IconButton, IconLink } from '@components/ui';

import { ROUTE } from '@constants';

import { TPostFormData } from '@types';

interface IProps {
  data: TPostFormData;
  onReloadEntry?: () => void;
  onRemoveEntry?: () => void;
}

function PostActions(props: IProps) {
  const { data, onReloadEntry, onRemoveEntry } = props;

  const { t } = useTranslation();

  return (
    <div
      className="flex gap-1 items-center mb-3 w-auto ml-auto"
      data-testid="post-actions"
    >
      <IconLink
        to={`${ROUTE.CATEGORIES}?categories=${data.categories}`}
        icon="folder"
        title={t('category')}
        size="small"
      />
      <IconLink
        to={data?.link ?? ''}
        icon="link-ext"
        title={t('viewOnSite')}
        size="small"
        external
      />
      <IconButton
        icon="arrows-cw"
        title={t('reload')}
        onClick={onReloadEntry}
        size="small"
      />
      <IconButton
        icon="trash"
        onClick={onRemoveEntry}
        title={t('removePost')}
        size="small"
      />
    </div>
  );
}

export default PostActions;
