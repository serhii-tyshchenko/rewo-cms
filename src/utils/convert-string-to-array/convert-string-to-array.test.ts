import { convertStringToArray } from './convert-string-to-array';

describe('(Function) convertStringToArray', () => {
  it('should return empty array if input is empty', () => {
    const result = convertStringToArray('');
    expect(result).toEqual([]);
  });

  it('should return array of numbers if categories is not empty', () => {
    const result = convertStringToArray('1,2,3');
    expect(result).toEqual([1, 2, 3]);
  });

  it('should trim whitespace and filter out empty values', () => {
    const result = convertStringToArray(' 1 , 2 , , 3 ');
    expect(result).toEqual([1, 2, 3]);
  });

  it('should filter out non-numeric values', () => {
    const result = convertStringToArray('1,2,abc,3');
    expect(result).toEqual([1, 2, 3]);
  });
});
