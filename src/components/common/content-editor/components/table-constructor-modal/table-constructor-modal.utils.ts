import { createEmptyArray } from '@utils';

export const generateTable = (config) => {
  const { rows, columns, headers, caption, classes } = config;
  const rowsArray = createEmptyArray(+rows + 1);
  const columnsArray = createEmptyArray(columns);

  const getCaption = () => (caption ? `<caption>${caption}</caption>` : '');

  const getHead = () => {
    if (headers === 'none' || headers === 'column') return '';
    const content = columnsArray.reduce((acc) => `${acc}<th>&nbsp;</th>`, '');
    return `<thead><tr>${content}</tr></thead>`;
  };

  const getBody = () => {
    const content = rowsArray.reduce(
      (rowAcc) =>
        `${rowAcc}<tr>${columnsArray.reduce(
          (colAcc) => `${colAcc}<td>&nbsp;</td>`,
          '',
        )}</tr>`,
    );
    return `<tbody>${content}</tbody>`;
  };

  return `<table class="${classes}">${getCaption()}${getHead()}${getBody()}</table>`;
};
