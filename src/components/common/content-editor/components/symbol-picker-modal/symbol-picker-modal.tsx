import { useTranslation } from 'react-i18next';

import { noop } from 'lodash-es';

import { Dialog } from '@components/ui';

import SymbolList from './symbol-list';
import { SYMBOLS } from './symbol-picker-modal.constants';

type TSymbol = {
  key: string;
  value: string;
  color?: string;
};

interface IProps {
  onClose?: () => void;
  onPick?: (symbol: string) => void;
}

function SymbolPickerModal(props: IProps) {
  const { onClose = noop, onPick = noop } = props;
  const { t } = useTranslation();

  const handleSymbolPick = (symbol: string) => {
    navigator.clipboard.writeText(symbol);
    onPick(symbol);
    onClose();
  };

  const symbolsWithTitles = SYMBOLS.map((symbol: TSymbol) => ({
    ...symbol,
    title: t(`symbols.${symbol.key}`),
  }));

  return (
    <Dialog
      title={t('textEditor.selectSymbol')}
      onClose={onClose}
      closeButtonTitle={t('close')}
    >
      <SymbolList
        items={symbolsWithTitles}
        onEscapePress={onClose}
        onSymbolPick={handleSymbolPick}
      />
    </Dialog>
  );
}

export default SymbolPickerModal;
