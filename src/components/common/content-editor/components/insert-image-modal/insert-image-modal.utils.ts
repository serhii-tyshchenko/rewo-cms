import { TInsertImageConfig } from './insert-image-modal.types';

export const generateImage = (config: TInsertImageConfig) => {
  const attributes = Object.entries(config)
    .filter(([, value]) => Boolean(value))
    .map(([key, value]) => `${key}="${value}"`)
    .join(' ');

  return `<img ${attributes} />`;
};
