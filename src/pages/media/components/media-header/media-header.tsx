import { useTranslation } from 'react-i18next';

import { PageHeader } from '@components/common';
import { Breadcrumbs } from '@components/ui';

import { ROUTE } from '@constants';

function MediaHeader() {
  const { t } = useTranslation();

  return (
    <PageHeader>
      <Breadcrumbs
        links={[
          { label: t('page.home'), link: ROUTE.HOME },
          { label: t('page.media') },
        ]}
      />
    </PageHeader>
  );
}

export default MediaHeader;
