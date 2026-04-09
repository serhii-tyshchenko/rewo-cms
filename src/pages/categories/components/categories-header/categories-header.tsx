import { useTranslation } from 'react-i18next';

import { PageHeader } from '@components/common';
import { Breadcrumbs, Button } from '@components/ui';

import { ROUTE } from '@constants';

interface IProps {
  onAddCategoryClick: () => void;
}

function CategoriesHeader(props: IProps) {
  const { onAddCategoryClick } = props;
  const { t } = useTranslation();

  return (
    <PageHeader>
      <Breadcrumbs
        links={[
          { label: t('page.home'), link: ROUTE.HOME },
          { label: t('page.categories') },
        ]}
      />
      <Button
        variant="action"
        onClick={onAddCategoryClick}
        className="p-0 text-xs"
      >
        {`[ ${t('addCategory')} ]`}
      </Button>
    </PageHeader>
  );
}

export default CategoriesHeader;
