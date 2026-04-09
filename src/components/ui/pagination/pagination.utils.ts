export const getPages = (
  currentPage: number,
  totalPages: number,
  maxVisiblePages: number
) => {
  const pagesArray = [];
  const maxVisiblePagesHalf = Math.floor(maxVisiblePages / 2);
  const startPage = currentPage - maxVisiblePagesHalf;
  const endPage = currentPage + maxVisiblePagesHalf;
  for (let i = startPage; i <= endPage; i += 1) {
    if (i > 1 && i < totalPages) {
      pagesArray.push(i);
    }
  }
  return [1, ...pagesArray, totalPages];
};
