import { fireEvent, render } from '@testing-library/react';

import Button from './button';

const testId = 'ui-button';

const renderButton = (props = {}, children = 'Click me') =>
  render(
    <Button data-testid={testId} {...props}>
      {children}
    </Button>,
  );

describe('(Component) Button', () => {
  it('should render with the text "Click me"', () => {
    const { getByText } = renderButton();
    expect(getByText('Click me')).toBeInTheDocument();
  });

  it('should render with the class "close-btn"', () => {
    const { getByTestId } = renderButton({ className: 'close-btn' });
    expect(getByTestId(testId)).toHaveClass('close-btn');
  });

  it('should call the onClick prop when the button is clicked', async () => {
    const handleClick = vi.fn();
    const { getByTestId } = renderButton({ onClick: handleClick }, 'Click');
    await fireEvent.click(getByTestId(testId));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should apply the type prop', () => {
    const { getByTestId } = renderButton({ type: 'submit' });
    expect(getByTestId(testId)).toHaveAttribute('type', 'submit');
  });

  it('should apply the variant prop', () => {
    const { getByTestId } = renderButton({ variant: 'primary' });
    expect(getByTestId(testId)).toHaveClass('button--primary');
  });

  it('should apply the size prop', () => {
    const { getByTestId } = renderButton({ size: 'big' });
    expect(getByTestId(testId)).toHaveClass('button--big');
  });

  it('should apply the title prop', () => {
    const { getByTestId } = renderButton({ title: 'Click me' }, 'Click');
    expect(getByTestId(testId)).toHaveAttribute('title', 'Click me');
  });

  it('should apply the disabled prop', () => {
    const { getByTestId } = renderButton({ disabled: true });
    expect(getByTestId(testId)).toBeDisabled();
  });

  it('should render children correctly', () => {
    const { getByTestId } = renderButton({}, 'Child');
    expect(getByTestId(testId)).toHaveTextContent('Child');
  });

  it('should render with secondary variant', () => {
    const { getByTestId } = renderButton({ variant: 'secondary' }, 'Secondary');
    expect(getByTestId(testId)).toHaveClass('button--secondary');
  });

  it('should render with action variant', () => {
    const { getByTestId } = renderButton({ variant: 'action' }, 'Action');
    expect(getByTestId(testId)).toHaveClass('button--action');
  });

  it('should render with default props', () => {
    const { getByTestId } = renderButton();
    expect(getByTestId(testId)).toHaveClass('button--primary');
    expect(getByTestId(testId)).toHaveClass('button--normal');
    expect(getByTestId(testId)).toHaveAttribute('type', 'button');
    expect(getByTestId(testId)).not.toBeDisabled();
  });
});
