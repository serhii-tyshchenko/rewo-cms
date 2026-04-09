import { NavLinksItem } from './nav-links-item';

interface IProps {
  data: {
    route: string;
    title: string;
    icon: string;
  }[];
}

function NavLinks(props: IProps) {
  const { data = [] } = props;

  return (
    <ul className="list-none">
      {data.map((item) => (
        <NavLinksItem
          key={item.route}
          route={item.route}
          title={item.title}
          icon={item.icon}
        />
      ))}
    </ul>
  );
}

export default NavLinks;
