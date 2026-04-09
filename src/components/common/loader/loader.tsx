import { useApiLoading } from '@hooks';

import './loader.styles.scss';

function Loader() {
  const isApiLoading = useApiLoading();

  if (!isApiLoading) {
    return null;
  }

  return (
    <div className="loader-backdrop">
      <div className="loader" />
    </div>
  );
}

export default Loader;
