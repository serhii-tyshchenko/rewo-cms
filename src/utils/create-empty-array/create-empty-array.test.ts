import { createEmptyArray } from './create-empty-array';

describe('createEmptyArray', () => {
  it('should create an array of the specified length filled with empty strings', () => {
    expect(createEmptyArray(3)).toEqual(['', '', '']);
  });

  it('should return an empty array when length is 0', () => {
    expect(createEmptyArray(0)).toEqual([]);
  });

  it('should return an array with the correct length', () => {
    expect(createEmptyArray(5)).toHaveLength(5);
  });

  it('should fill every element with an empty string', () => {
    expect(createEmptyArray(4).every((item) => item === '')).toBe(true);
  });

  it('should return an empty array for a negative length', () => {
    expect(createEmptyArray(-1)).toEqual([]);
  });

  it('should truncate non-integer lengths to a valid array length', () => {
    expect(createEmptyArray(2.9)).toEqual(['', '']);
  });
});
