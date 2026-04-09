import { useState } from 'react';

import { getClassName } from '@utils';

import './tabs.styles.scss';

const NAME_SPACE = 'tabs';
// TODO move to utils
const getTabClass = (index: number, activeTabIndex: number | undefined) =>
  getClassName(`${NAME_SPACE}__item`, {
    [`${NAME_SPACE}__item--active`]: index === activeTabIndex,
  });

interface IProps {
  className?: string;
  labels: string[];
  activeTab?: number;
  children?: React.ReactNode;
  tabsPosition?: 'left' | 'right' | 'center';
  testId?: string;
}

function Tabs(props: IProps) {
  const {
    className = '',
    labels = [],
    children = null,
    activeTab = 0,
    tabsPosition = 'left',
    testId = 'ui-tabs',
  } = props;

  const [activeTabIndex, setActiveTabIndex] = useState(activeTab);

  const handleTabClick = (e: React.MouseEvent<HTMLInputElement>) => {
    setActiveTabIndex(labels.indexOf(e.currentTarget.value));
  };

  const componentClassName = getClassName(
    NAME_SPACE,
    `${NAME_SPACE}--${tabsPosition}`,
    className,
  );

  return (
    <div className={componentClassName} data-testid={testId}>
      <ol className={`${NAME_SPACE}__list`}>
        {labels.map((label, index) => (
          <li
            key={label}
            className={getTabClass(index, activeTabIndex)}
            data-testid="tab"
          >
            <input
              className={`${NAME_SPACE}__btn`}
              type="button"
              onClick={handleTabClick}
              value={label}
            />
          </li>
        ))}
      </ol>
      {Array.isArray(children) &&
        children.map((child, index) =>
          index === activeTabIndex ? child : null,
        )}
    </div>
  );
}

export default Tabs;
