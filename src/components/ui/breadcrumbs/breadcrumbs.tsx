import { Link } from 'react-router-dom';

import { isEmpty } from 'lodash-es';

import { getClassName } from '@utils';

import './breadcrumbs.styles.scss';

const NAME_SPACE = 'breadcrumbs';

interface IProps {
  links: { label: string; link?: string }[];
  className?: string;
  testId?: string;
}

function Breadcrumbs(props: IProps) {
  const { links, className = '', testId = 'ui-breadcrumbs' } = props;

  const componentClassName = getClassName('flex list-none', className);

  if (isEmpty(links)) {
    return null;
  }

  return (
    <ul className={componentClassName} data-testid={testId}>
      {links.map(({ link, label }) => (
        <li key={label} className={`text-xs ${NAME_SPACE}__item`}>
          {link ? (
            <Link to={link} className="text-xs">
              {label}
            </Link>
          ) : (
            label
          )}
        </li>
      ))}
    </ul>
  );
}

export default Breadcrumbs;
