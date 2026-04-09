import { render } from '@testing-library/react';

import Tabs from './tabs';

const labels = ['Tab 1', 'Tab 2', 'Tab 3'];

describe('(Component) Tabs', () => {
  it('should apply the className "test"', () => {
    const { getByTestId } = render(<Tabs labels={labels} className="test" />);
    expect(getByTestId('ui-tabs')).toHaveClass('test');
  });

  it('should render the correct number of tabs', () => {
    const { getAllByTestId } = render(<Tabs labels={labels} />);
    const tabs = getAllByTestId('tab');
    expect(tabs.length).toBe(labels.length);
  });

  it('should render the correct active tab', () => {
    const activeTab = 1;
    const { getAllByTestId } = render(
      <Tabs labels={labels} activeTab={activeTab} />
    );
    const tabs = getAllByTestId('tab');
    expect(tabs[activeTab]).toHaveClass('tabs__item--active');
  });

  it('should render the tabs in the correct position', () => {
    const { getByTestId } = render(
      <Tabs labels={labels} tabsPosition="right" />
    );
    expect(getByTestId('ui-tabs')).toHaveClass('tabs--right');
  });

  it('should render the children content', () => {
    const { getByText } = render(
      <Tabs labels={labels}>
        <div>Content 1</div>
        <div>Content 2</div>
        <div>Content 3</div>
      </Tabs>
    );
    expect(getByText('Content 1')).toBeInTheDocument();
  });
});
