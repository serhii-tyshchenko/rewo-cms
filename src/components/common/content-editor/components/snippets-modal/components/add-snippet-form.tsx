import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { isEmpty } from 'lodash-es';
import { v4 as uuid } from 'uuid';

import { Input } from '@components/ui';

import { TSnippet } from '@types';

interface IProps {
  onAddSnippet: (snippet: TSnippet) => void;
  disabled: boolean;
}

function AddSnippetForm(props: IProps) {
  const { onAddSnippet, disabled } = props;

  const { t } = useTranslation();

  const [newSnippet, setNewSnippet] = useState<string>('');

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) =>
    setNewSnippet(ev.target.value);

  const handleAddSnippet = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isEmpty(newSnippet)) {
      return;
    }
    onAddSnippet({ id: uuid(), value: newSnippet } as TSnippet);
    setNewSnippet('');
  };

  return (
    <form onSubmit={handleAddSnippet} className="flex items-center mt-auto">
      <Input
        value={newSnippet}
        onChange={handleChange}
        placeholder={t('enterNewSnippet')}
        disabled={disabled}
      />
    </form>
  );
}

export default AddSnippetForm;
