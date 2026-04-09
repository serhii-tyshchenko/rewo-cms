import { render } from '@testing-library/react';

import { LeftPanel } from './left-panel';

describe('LeftPanels', () => {
  it('should match snapshot', () => {
    const { container } = render(<LeftPanel>Some content</LeftPanel>);
    expect(container).toMatchSnapshot();
  });
});
