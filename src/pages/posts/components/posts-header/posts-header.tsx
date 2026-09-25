import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import { PageHeader } from '@components/common';
import { Breadcrumbs, Button } from '@components/ui';

import { ROUTE } from '@constants';

interface IProps {
  onBulkAddClick: () => void;
}

function PostsHeader({ onBulkAddClick }: IProps) {
  const { t } = useTranslation();

  return (
    <PageHeader>
      <Breadcrumbs
        links={[
          { label: t('page.home'), link: ROUTE.HOME },
          { label: t('page.posts') },
        ]}
      />
      <div className="flex gap-2">
        <Link to="/posts/add" className="text-xs">{`[ ${t('addPost')} ]`}</Link>
        <Button
          variant="action"
          size="small"
          className="p-0"
          onClick={onBulkAddClick}
        >
          [ {t('bulkAdd')} ]
        </Button>
      </div>
    </PageHeader>
  );
}

export default PostsHeader;
