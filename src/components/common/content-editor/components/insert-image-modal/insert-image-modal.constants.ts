import { type TInsertImageConfig } from './insert-image-modal.types';

export const INITIAL_CONFIG: TInsertImageConfig = {
  src: '',
  alt: undefined,
  class: undefined,
  width: undefined,
  height: undefined,
  loading: 'lazy',
  decoding: 'async',
};
