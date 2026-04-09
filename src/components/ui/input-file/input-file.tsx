import { useState } from 'react';

import { noop } from 'lodash-es';

import { TControlSize } from '@types';

import { getClassName } from '@utils';

import './input-file.scss';

const NAME_SPACE = 'input-file';

interface IProps {
  id?: string;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  label?: string;
  error?: string;
  accept?: string | null;
  multiple?: boolean;
  size?: TControlSize;
  hideFileNames?: boolean;
  testId?: string;
}

function InputFile(props: IProps) {
  const {
    id = 'ui-input-file',
    name = 'ui-input-file',
    onChange = noop,
    className = '',
    required = false,
    disabled = false,
    label = 'Choose file',
    error = '',
    accept = null,
    multiple = false,
    size = 'normal',
    hideFileNames = false,
    testId = 'ui-input-file',
  } = props;

  const [fileName, setFileName] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    const fileNames = files
      ? [...files].map((file) => file.name).join(', ')
      : '';
    setFileName(fileNames);
    onChange(event);
  };

  const componentClassName = getClassName(
    NAME_SPACE,
    `${NAME_SPACE}--${size}`,
    {
      [`${NAME_SPACE}--disabled`]: disabled,
      [`${NAME_SPACE}--error`]: error,
    },
    className,
  );

  return (
    <div className={componentClassName} data-testid={testId}>
      <label htmlFor={id} className={`${NAME_SPACE}__label`}>
        {label}
      </label>
      <input
        type="file"
        id={id}
        name={name}
        className={`${NAME_SPACE}__input`}
        onChange={handleChange}
        required={required}
        disabled={disabled}
        accept={accept || undefined}
        multiple={multiple}
      />
      {!hideFileNames && (
        <div className={`${NAME_SPACE}__file-name`}>{fileName}</div>
      )}
      {error && <div className={`${NAME_SPACE}__error`}>{error}</div>}
    </div>
  );
}

export default InputFile;
