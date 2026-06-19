import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { CollapseButton } from '@components/common';

import { doUpdateSettings } from '@store/actions';
import { selectSettings } from '@store/selectors';

import { getClassName } from '@utils';

import { NavLinks } from './nav-links';
import './nav.styles.scss';
import { getNavLinks } from './nav.utils';

const NAME_SPACE = 'nav';

function Nav() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const links = getNavLinks(t);

  const { isNavCollapsed } = useSelector(selectSettings);
  const className = getClassName(NAME_SPACE, {
    [`${NAME_SPACE}--collapsed`]: isNavCollapsed,
  });
  const handleNavToggle = useCallback(
    () => dispatch(doUpdateSettings({ isNavCollapsed: !isNavCollapsed })),
    [dispatch, isNavCollapsed],
  );

  return (
    <nav className={className}>
      <NavLinks data={links} />
      <CollapseButton
        collapsed={isNavCollapsed}
        onClick={handleNavToggle}
        className={`${NAME_SPACE}__toggle-btn`}
        direction="left"
      />
    </nav>
  );
}

export default Nav;
