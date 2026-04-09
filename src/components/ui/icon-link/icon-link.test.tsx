import { MemoryRouter } from 'react-router-dom';

import { render } from '@testing-library/react';

import IconLink from './icon-link';

describe('IconLink', () => {
  it('should render internal link with correct props', () => {
    const { getByTitle } = render(
      <MemoryRouter>
        <IconLink to="/internal" title="Internal Link" icon="home" size="big" />
      </MemoryRouter>,
    );
    const link = getByTitle('Internal Link');
    expect(link).toHaveAttribute('href', '/internal');
    expect(link).toHaveClass('icon-link', 'icon-home', 'icon-link--big');
  });

  it('should render external link with correct props', () => {
    const { getByTitle } = render(
      <IconLink to="https://example.com" title="External Link" external />,
    );
    const link = getByTitle('External Link');
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    expect(link).toHaveClass('icon-link', 'icon-link-ext', 'icon-link--normal');
  });

  it('should use default icon and size if not provided', () => {
    const { getByTitle } = render(
      <IconLink to="https://example.com" title="Default Icon" external />,
    );
    const link = getByTitle('Default Icon');
    expect(link).toHaveClass('icon-link', 'icon-link-ext', 'icon-link--normal');
  });

  it('should apply custom className', () => {
    const { getByTitle } = render(
      <IconLink
        to="https://example.com"
        title="With Class"
        className="custom-class"
        external
      />,
    );
    const link = getByTitle('With Class');
    expect(link).toHaveClass('custom-class');
  });
});
