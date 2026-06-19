import { Link } from 'react-router-dom';

import { Loader } from '@components/common';

import { APP_NAME } from '@constants';

import { AuthBtn } from './components';
import './header.styles.scss';

const NAME_SPACE = 'header';

function Header() {
  return (
    <header className={NAME_SPACE}>
      <Link to="/" className={`${NAME_SPACE}__logo`}>
        {APP_NAME}
      </Link>
      <Loader />
      <div className="flex items-center gap-2">
        <AuthBtn />
      </div>
    </header>
  );
}

export { Header };
