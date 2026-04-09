import { TMediaDto } from '@types';

export const extractMediaSizes = (item: TMediaDto): string =>
  item?.media_details?.width && item?.media_details?.height
    ? `${item?.media_details.width} × ${item?.media_details.height}`
    : '';

export const extractThumbnailUrl = (item: TMediaDto): string =>
  item?.media_details?.sizes?.thumbnail?.source_url ?? '';
