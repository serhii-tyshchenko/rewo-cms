import { cleanObject } from './clean-object';

describe('cleanObject', () => {
  it('should remove null and undefined values from an object', () => {
    const obj = {
      a: 1,
      b: null,
      c: undefined,
      d: {
        e: null,
        f: undefined,
        g: 2,
      },
    };
    const expected = {
      a: 1,
      d: {
        g: 2,
      },
    };
    expect(cleanObject(obj)).toEqual(expected);
  });

  it('should remove empty objects and arrays from an object', () => {
    const obj = {
      a: 1,
      b: {},
      c: [],
      d: {
        e: {},
        f: [],
        g: 2,
      },
    };
    const expected = {
      a: 1,
      d: {
        g: 2,
      },
    };
    expect(cleanObject(obj)).toEqual(expected);
  });

  it('should not remove Date objects from an object', () => {
    const obj = {
      a: 1,
      b: new Date(),
      c: {
        d: new Date(),
      },
    };
    expect(cleanObject(obj)).toEqual(obj);
  });
});
