import { useTranslation } from 'react-i18next';

import { PageHeader } from '@components/common';
import { Breadcrumbs, Button } from '@components/ui';

import { ROUTE } from '@constants';

interface IProps {
  onAddTagClick: () => void;
}

function TagsHeader({ onAddTagClick }: IProps) {
  const { t } = useTranslation();

  return (
    <PageHeader>
      <Breadcrumbs
        links={[
          { label: t('page.home'), link: ROUTE.HOME },
          { label: t('page.tags') },
        ]}
      />
      <Button variant="action" onClick={onAddTagClick} className="p-0 text-xs">
        {`[ ${t('addTag')} ]`}
      </Button>
    </PageHeader>
  );
}

export default TagsHeader;
