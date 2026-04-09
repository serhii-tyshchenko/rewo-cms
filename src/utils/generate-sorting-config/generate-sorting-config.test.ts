import { generateSortingConfig } from './generate-sorting-config';

describe('generateSortingConfig', () => {
  it('should generate ascending and descending sorting options for each field', () => {
    expect(generateSortingConfig(['name', 'date'])).toEqual([
      'name_asc',
      'name_desc',
      'date_asc',
      'date_desc',
    ]);
  });

  it('should return an empty array when no fields are provided', () => {
    expect(generateSortingConfig([])).toEqual([]);
  });

  it('should handle a single field', () => {
    expect(generateSortingConfig(['price'])).toEqual([
      'price_asc',
      'price_desc',
    ]);
  });

  it('should preserve the order of the input fields', () => {
    expect(generateSortingConfig(['createdAt', 'title', 'id'])).toEqual([
      'createdAt_asc',
      'createdAt_desc',
      'title_asc',
      'title_desc',
      'id_asc',
      'id_desc',
    ]);
  });

  it('should handle duplicate field names', () => {
    expect(generateSortingConfig(['name', 'name'])).toEqual([
      'name_asc',
      'name_desc',
      'name_asc',
      'name_desc',
    ]);
  });

  it('should not mutate the input array', () => {
    const fields = ['name', 'date'];

    generateSortingConfig(fields);

    expect(fields).toEqual(['name', 'date']);
  });

  it('should handle empty string field names', () => {
    expect(generateSortingConfig([''])).toEqual(['_asc', '_desc']);
  });
});
