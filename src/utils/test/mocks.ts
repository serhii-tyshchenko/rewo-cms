import { TFunction } from 'i18next';

export const createTFunctionMock = () =>
  Object.assign(
    vi.fn((key: string) => key),
    {
      $TFunctionBrand: 'translation',
    },
  ) as unknown as TFunction;
