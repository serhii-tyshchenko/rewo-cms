export const generateImage = (config) => {
  const { imageUrl, alt, classes } = config;
  const srcAttr = `src="${imageUrl}"`;
  const altAttr = alt ? `alt="${alt}"` : '';
  const classesAttr = classes ? `class="${classes}"` : '';
  const attributes = [srcAttr, altAttr, classesAttr].filter(Boolean).join(' ');

  return `<img ${attributes} />`;
};
