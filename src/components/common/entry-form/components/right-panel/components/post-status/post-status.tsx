import { ChangeEvent, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { FormGroup, Select } from '@components/ui';

import type { TPostStatus } from '@types';

import { formatOptions } from '@utils';

interface IProps {
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  postStatus: TPostStatus;
}

function PostStatus(props: IProps) {
  const { onChange, postStatus } = props;
  const { t } = useTranslation();
  const statusOptions = useMemo(
    () =>
      formatOptions({
        options: [
          { id: 'draft', name: t('postStatuses.draft') },
          { id: 'pending', name: t('postStatuses.pending') },
          { id: 'publish', name: t('postStatuses.publish') },
          { id: 'future', name: t('postStatuses.future') },
          { id: 'private', name: t('postStatuses.private') },
        ],
      }),
    [t],
  );

  return (
    <FormGroup>
      <Select
        className="w-full"
        label={t('status')}
        name="status"
        onChange={onChange}
        options={statusOptions}
        value={postStatus}
      />
    </FormGroup>
  );
}

export default PostStatus;
