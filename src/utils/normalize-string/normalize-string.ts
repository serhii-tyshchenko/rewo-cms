export const normalizeString = (rawString: string) =>
  rawString
    .replaceAll('&#8217;', "'")
    .replaceAll('&#038;', '&')
    .replaceAll('&#8230;', '...')
    .replaceAll('&#8221;', '"');
