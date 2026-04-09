import { useTranslation } from 'react-i18next';

import { isEmpty } from 'lodash-es';

import { EmptyState } from '@components/ui';

import { TSnippet } from '@types';

import SnippetItem from './snippet-item';
import './snippet-list.styles.scss';

interface IProps {
  data: TSnippet[];
  onSelectSnippet: (value: TSnippet['value']) => void;
  onUpdateSnippet: (snippet: TSnippet) => void;
  onRemoveSnippet: (id: TSnippet['id']) => void;
}

function SnippetList(props: IProps) {
  const { data, onSelectSnippet, onUpdateSnippet, onRemoveSnippet } = props;
  const { t } = useTranslation();

  if (isEmpty(data)) {
    return <EmptyState>{t('noSnippets')}</EmptyState>;
  }

  return (
    <ul className="overflow-y-auto p-1 flex flex-col gap-3 mb-4 pr-2 snippet-list">
      {data.map((snippet) => (
        <SnippetItem
          key={snippet.id}
          data={snippet}
          onSelectSnippet={onSelectSnippet}
          onUpdateSnippet={onUpdateSnippet}
          onRemoveSnippet={onRemoveSnippet}
        />
      ))}
    </ul>
  );
}

export default SnippetList;
