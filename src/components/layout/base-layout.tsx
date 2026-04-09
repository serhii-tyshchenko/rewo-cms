import { Header } from './header';
import { Main } from './main';
import { Nav } from './nav';

function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <Nav />
      <Main>{children}</Main>
    </>
  );
}

export default BaseLayout;
