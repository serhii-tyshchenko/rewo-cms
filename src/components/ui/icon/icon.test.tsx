import { render } from '@testing-library/react';

import Icon from './icon';

const testId = 'ui-icon';

describe('(Component) Icon', () => {
  it('should apply the icon prop', () => {
    const { getByTestId } = render(<Icon icon="trash" />);
    expect(getByTestId(testId)).toHaveClass('icon-trash');
  });

  it('should apply the className "test"', () => {
    const { getByTestId } = render(<Icon className="test" icon="cog" />);
    expect(getByTestId(testId)).toHaveClass('test');
  });

  it('should apply the size prop', () => {
    const { getByTestId } = render(<Icon size="big" icon="cog" />);
    expect(getByTestId(testId)).toHaveClass('icon--big');
  });

  it('should apply the title prop', () => {
    const { getByTestId } = render(<Icon title="Click me" icon="cog" />);
    expect(getByTestId(testId)).toHaveAttribute('title', 'Click me');
  });
});
