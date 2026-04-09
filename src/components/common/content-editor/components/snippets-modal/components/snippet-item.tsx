import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { isEqual } from 'lodash-es';

import { Button, IconButton, Input } from '@components/ui';

import { TSnippet } from '@types';

interface IProps {
  data: TSnippet;
  onSelectSnippet: (value: string) => void;
  onUpdateSnippet: (data: TSnippet) => void;
  onRemoveSnippet: (id: string) => void;
}

const SNIPPET_MAX_LENGTH = 40;

function SnippetItem(props: IProps) {
  const {
    data: { id, value },
    onSelectSnippet,
    onUpdateSnippet,
    onRemoveSnippet,
  } = props;
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [snippetValue, setSnippetValue] = useState<string>(value);

  const handleEditSnippetClick = () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    if (isEqual(snippetValue, value)) {
      setIsEditing(false);
      return;
    }

    onUpdateSnippet({ id, value: snippetValue });
    setIsEditing(false);
  };

  const formattedValue =
    snippetValue?.length > SNIPPET_MAX_LENGTH
      ? `${snippetValue.slice(0, SNIPPET_MAX_LENGTH)}...`
      : snippetValue;

  return (
    <li className="flex gap-2">
      {!isEditing && (
        <Button
          onClick={() => onSelectSnippet(snippetValue)}
          className="w-full text-left snippet-item-button"
          variant="secondary"
          title={snippetValue}
        >
          {formattedValue}
        </Button>
      )}
      {isEditing && (
        <Input
          value={snippetValue}
          onChange={(e) => setSnippetValue(e.target.value)}
          placeholder={t('editSnippetPlaceholder')}
          disabled={!isEditing}
        />
      )}
      <div className="flex flex-col gap-1">
        <IconButton
          icon={isEditing ? 'ok' : 'pencil'}
          title={isEditing ? t('saveSnippet') : t('editSnippet')}
          size="small"
          onClick={handleEditSnippetClick}
        />
        <IconButton
          icon="trash"
          title={t('removeSnippet')}
          size="small"
          onClick={() => onRemoveSnippet(id)}
        />
      </div>
    </li>
  );
}

export default SnippetItem;
