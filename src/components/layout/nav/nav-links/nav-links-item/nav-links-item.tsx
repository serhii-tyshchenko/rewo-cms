import { NavLink } from 'react-router-dom';

import './nav-links-item.styles.scss';

const NAME_SPACE = 'nav-links-item';

interface IProps {
  route: string;
  title: string;
  icon: string;
}

function NavLinksItem(props: IProps) {
  const { route, title, icon } = props;

  return (
    <li className={NAME_SPACE}>
      <NavLink to={route} className={`${NAME_SPACE}__link`} title={title}>
        <i className={`icon-${icon}`} />
        <span className={`${NAME_SPACE}__title`}>{title}</span>
      </NavLink>
    </li>
  );
}

export { NavLinksItem };
