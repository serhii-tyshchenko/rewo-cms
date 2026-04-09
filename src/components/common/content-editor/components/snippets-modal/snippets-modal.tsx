import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { noop } from 'lodash-es';
import { TSnippet } from 'types';

import { Dialog } from '@components/ui';

import { doAddSnippet, doRemoveSnippet, doUpdateSnippet } from '@store/actions';
import { selectSnippetsData } from '@store/selectors';

import { sequence } from '@utils';

import { AddSnippetForm, SnippetList } from './components';
import { SNIPPETS_MAX_COUNT } from './snippets-modal.constants';

interface IProps {
  onClose?: () => void;
  onPick?: (value: string) => void;
}

function SnippetsModal(props: IProps) {
  const { onClose = noop, onPick = noop } = props;
  const { t } = useTranslation();
  const snippets = useSelector(selectSnippetsData) as TSnippet[];
  const dispatch = useDispatch();

  const handleSelectSnippet = sequence(
    (value: string) => navigator.clipboard.writeText(value),
    onPick,
    onClose,
  );

  const handleAddSnippet = (snippet: TSnippet) => {
    dispatch(doAddSnippet(snippet));
  };

  const handleUpdateSnippet = (snippet: TSnippet) => {
    dispatch(doUpdateSnippet(snippet));
  };

  const handleRemoveSnippet = (id: TSnippet['id']) => {
    dispatch(doRemoveSnippet(id));
  };

  const shouldDisableAddSnippet = snippets.length >= SNIPPETS_MAX_COUNT;

  return (
    <Dialog
      title={t('selectSnippet')}
      onClose={onClose}
      closeButtonTitle={t('close')}
    >
      <SnippetList
        data={snippets}
        onSelectSnippet={handleSelectSnippet}
        onUpdateSnippet={handleUpdateSnippet}
        onRemoveSnippet={handleRemoveSnippet}
      />
      <AddSnippetForm
        onAddSnippet={handleAddSnippet}
        disabled={shouldDisableAddSnippet}
      />
    </Dialog>
  );
}

export default SnippetsModal;
