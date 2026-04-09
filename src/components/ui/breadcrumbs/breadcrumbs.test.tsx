import { MemoryRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Breadcrumbs from './breadcrumbs';

describe('(Component) Breadcrumbs', () => {
  it('renders a list of breadcrumb links', () => {
    const links = [
      { label: 'Home', link: '/' },
      { label: 'Dashboard', link: '/dashboard' },
      { label: 'Profile' },
    ];

    render(
      <MemoryRouter>
        <Breadcrumbs links={links} />
      </MemoryRouter>,
    );

    // Should render all labels
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();

    // Should render links for items with 'link'
    expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '/');
    expect(screen.getByText('Dashboard').closest('a')).toHaveAttribute(
      'href',
      '/dashboard',
    );

    // Should not render link for item without 'link'
    expect(screen.getByText('Profile').closest('a')).toBeNull();
  });

  it('applies custom className', () => {
    render(
      <MemoryRouter>
        <Breadcrumbs
          links={[{ label: 'Home', link: '/' }]}
          className="custom-class"
        />
      </MemoryRouter>,
    );
    const ul = screen.getByTestId('ui-breadcrumbs');
    expect(ul.className).toContain('custom-class');
  });

  it('uses custom testId', () => {
    render(
      <MemoryRouter>
        <Breadcrumbs
          links={[{ label: 'Home', link: '/' }]}
          testId="my-breadcrumbs"
        />
      </MemoryRouter>,
    );
    expect(screen.getByTestId('my-breadcrumbs')).toBeInTheDocument();
  });

  it('renders nothing if links are empty', () => {
    render(
      <MemoryRouter>
        <Breadcrumbs links={[]} />
      </MemoryRouter>,
    );
    const ul = screen.queryByTestId('ui-breadcrumbs');
    expect(ul).not.toBeInTheDocument();
  });
});
