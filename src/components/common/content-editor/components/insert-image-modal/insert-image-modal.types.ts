export type TInsertImageConfig = {
  src: string;
  alt?: string;
  class?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager' | undefined;
  decoding?: 'async' | 'sync' | undefined;
};
