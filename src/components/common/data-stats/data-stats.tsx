import { useTranslation } from 'react-i18next';

import { prettyNumber } from '@utils';

interface IProps {
  total: number;
  totalPages: number;
}

function DataStats(props: IProps) {
  const { total, totalPages } = props;
  const { t } = useTranslation();

  return (
    <ul className="ml-auto text-xs flex gap-2 align-center">
      <li>
        {t('total')}: <strong>{prettyNumber(total)}</strong>
      </li>
      <li>/</li>
      <li>
        {t('pages')}: <strong>{prettyNumber(totalPages)}</strong>
      </li>
    </ul>
  );
}

export { DataStats };
