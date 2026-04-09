import { useTranslation } from 'react-i18next';

interface IProps {
  link?: string;
  sizes?: string;
  loading: boolean;
}
function PostFeaturedMedia(props: IProps) {
  const { t } = useTranslation();
  const { link, sizes, loading } = props;

  if (loading) return <p className="italic">{t('loading')}</p>;

  if (!link) return null;

  return (
    <>
      <p className="label label--normal mb-1">{t('featuredImage')}</p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="self-center mb-2"
      >
        <img src={link} alt={t('featuredImage')} />
      </a>
      <p className="text-xs text-center mb-3">{sizes}</p>
    </>
  );
}

export default PostFeaturedMedia;
