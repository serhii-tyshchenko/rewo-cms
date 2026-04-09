import { useRetrieveMedia } from '@queries';

const useFeaturedMedia = (mediaId: number) => {
  const { data, isLoading, error } = useRetrieveMedia(mediaId);

  const link = data?.sourceUrl ? data.sourceUrl : '';
  const sizes = data?.sizes || '';

  return { link, sizes, isLoading, error };
};

export default useFeaturedMedia;
