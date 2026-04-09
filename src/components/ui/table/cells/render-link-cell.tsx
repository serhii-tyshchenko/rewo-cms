const renderLinkCell = (link: string, title: string) => (
  <a href={link} target="_blank" rel="noreferrer">
    {title}
  </a>
);

export default renderLinkCell;
