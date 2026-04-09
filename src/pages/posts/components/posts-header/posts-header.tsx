import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { PageHeader } from '@components/common';
import { Breadcrumbs } from '@components/ui';

import { ROUTE } from '@constants';

function PostsHeader() {
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
      </div>
    </PageHeader>
  );
}

export default PostsHeader;
