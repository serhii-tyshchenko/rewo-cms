import type { ChangeEvent, FocusEvent, KeyboardEvent } from 'react';

import { TControlSize } from '@types';

type TInputNumberSpecificProps = {
  min?: number;
  max?: number;
  step?: number;
};

type TInputTextSpecificProps = {
  minLength?: number;
  maxLength?: number;
  pattern?: string;
};

type TInputCommonProps = {
  type?: 'text' | 'number' | 'password' | 'search' | 'url';
  name?: string;
  id?: string;
  testId?: string;
  className?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  value?: string | number;
  placeholder?: string;
  required?: boolean;
  autoFocus?: boolean;
  disabled?: boolean;
  label?: string;
  error?: string;
  size?: TControlSize;
  title?: string;
  readOnly?: boolean;
  autoComplete?: string;
};

export type {
  TInputNumberSpecificProps,
  TInputTextSpecificProps,
  TInputCommonProps,
};
