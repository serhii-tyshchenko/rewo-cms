import { isPostDeleted } from './is-post-deleted';

describe('isPostDeleted', () => {
  it('should return true for status "trash"', () => {
    expect(isPostDeleted('trash')).toBe(true);
  });

  it('should return false for other valid statuses', () => {
    expect(isPostDeleted('draft')).toBe(false);
    expect(isPostDeleted('future')).toBe(false);
    expect(isPostDeleted('pending')).toBe(false);
    expect(isPostDeleted('private')).toBe(false);
    expect(isPostDeleted('publish')).toBe(false);
  });
});
