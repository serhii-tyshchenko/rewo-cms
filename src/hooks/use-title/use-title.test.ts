import { renderHook } from '@testing-library/react';

import useTitle from './use-title';

vi.mock('@constants', () => ({
  APP_NAME: 'TestApp',
}));

describe('(Hook) useTitle', () => {
  const originalTitle = document.title;

  afterEach(() => {
    document.title = originalTitle;
  });

  it('sets document.title to "title | APP_NAME" when title is provided', () => {
    renderHook(() => useTitle('Dashboard'));
    expect(document.title).toBe('Dashboard | TestApp');
  });

  it('updates document.title when title changes', () => {
    const { rerender } = renderHook(({ title }) => useTitle(title), {
      initialProps: { title: 'Page1' },
    });
    expect(document.title).toBe('Page1 | TestApp');
    rerender({ title: 'Page2' });
    expect(document.title).toBe('Page2 | TestApp');
  });
});
