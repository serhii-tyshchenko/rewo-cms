import { getObjectDiff } from './get-object-diff';

describe('(Function) getObjectDiff', () => {
  it('returns an empty object when all base keys are equal', () => {
    const current = { a: 1, b: 'x', c: true };
    const base = { a: 1, b: 'x', c: true };

    expect(getObjectDiff(current, base)).toEqual({});
  });

  it('returns only changed keys from base', () => {
    const current = { a: 2, b: 'x', c: false };
    const base = { a: 1, b: 'x', c: true };

    expect(getObjectDiff(current, base)).toEqual({ a: 2, c: false });
  });

  it('ignores keys that exist only in current and not in base', () => {
    const current = { a: 1, extra: 'value' };
    const base = { a: 1 };

    expect(getObjectDiff(current, base)).toEqual({});
  });

  it('performs deep comparison for nested objects', () => {
    const currentEqual = { config: { x: 1, y: [1, 2] } };
    const baseEqual = { config: { x: 1, y: [1, 2] } };

    const currentChanged = { config: { x: 1, y: [1, 3] } };
    const baseChanged = { config: { x: 1, y: [1, 2] } };

    expect(getObjectDiff(currentEqual, baseEqual)).toEqual({});
    expect(getObjectDiff(currentChanged, baseChanged)).toEqual({
      config: { x: 1, y: [1, 3] },
    });
  });

  it('performs deep comparison for arrays', () => {
    const currentEqual = { ids: [1, 2, 3] };
    const baseEqual = { ids: [1, 2, 3] };

    const currentChanged = { ids: [1, 2, 4] };
    const baseChanged = { ids: [1, 2, 3] };

    expect(getObjectDiff(currentEqual, baseEqual)).toEqual({});
    expect(getObjectDiff(currentChanged, baseChanged)).toEqual({
      ids: [1, 2, 4],
    });
  });

  it('does not mutate input objects', () => {
    const current = { a: 2, nested: { x: 1 } };
    const base = { a: 1, nested: { x: 1 } };

    const currentSnapshot = JSON.parse(JSON.stringify(current));
    const baseSnapshot = JSON.parse(JSON.stringify(base));

    getObjectDiff(current, base);

    expect(current).toEqual(currentSnapshot);
    expect(base).toEqual(baseSnapshot);
  });
});
