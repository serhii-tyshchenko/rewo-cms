/* eslint-disable @typescript-eslint/no-unused-vars */
import { prepareMetaData } from './bulk-add-modal.utils';

describe('prepareMetaData', () => {
  it('should return empty object if data is empty', () => {
    const testData = {
      categories: 1,
      slug: 'test',
      title: 'test',
    };
    const { categories, slug, title, ...rest } = testData;
    const result = prepareMetaData(rest);
    expect(result).toEqual({});
  });

  it('should return object with data if data is not empty', () => {
    const testData = {
      categories: 1,
      slug: 'test',
      title: 'test',
      hw_image_link: 'test_link',
      hw_image_alt: 'test_alt',
    };
    const { categories, slug, title, ...rest } = testData;
    const result = prepareMetaData(rest);
    expect(result).toEqual({
      hw_image_link: 'test_link',
      hw_image_alt: 'test_alt',
    });
  });
});
