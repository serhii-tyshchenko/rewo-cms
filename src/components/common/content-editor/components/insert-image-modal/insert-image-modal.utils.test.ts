import { describe, expect, it } from 'vitest';

import { generateImage } from './insert-image-modal.utils';

describe('(Function) generateImage', () => {
  it('should generate image markup with required src only', () => {
    expect(generateImage({ src: 'https://example.com/cat.png' })).toBe(
      '<img src="https://example.com/cat.png" />',
    );
  });

  it('should include all truthy attributes', () => {
    expect(
      generateImage({
        src: 'https://example.com/cat.png',
        alt: 'Cat image',
        class: 'w-full rounded',
        width: 640,
        height: 360,
        loading: 'lazy',
        decoding: 'async',
      }),
    ).toBe(
      '<img src="https://example.com/cat.png" alt="Cat image" class="w-full rounded" width="640" height="360" loading="lazy" decoding="async" />',
    );
  });

  it('should ignore falsy optional values', () => {
    expect(
      generateImage({
        src: 'https://example.com/cat.png',
        alt: '',
        class: '',
        width: 0,
        height: 0,
        loading: undefined,
        decoding: undefined,
      }),
    ).toBe('<img src="https://example.com/cat.png" />');
  });
});
