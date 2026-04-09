import './main.styles.scss';

function Main({ children = null }: { children?: React.ReactNode }) {
  return <main className="main">{children}</main>;
}

export default Main;
