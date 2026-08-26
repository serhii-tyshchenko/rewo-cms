import { render } from '@testing-library/react';

import { NavLinksItem } from './nav-links-item';

vi.mock('react-router', () => ({
  ...(vi.importActual('react-router') as any),
  NavLink: ({ to, className, title, children }: any) => (
    <a href={to} className={className} title={title}>
      {children}
    </a>
  ),
}));

describe('(Component) NavLinksItem', () => {
  it('should match snapshot', () => {
    const { container } = render(
      <NavLinksItem route="/" title="Home" icon="home" />,
    );
    expect(container).toMatchSnapshot();
  });
});
