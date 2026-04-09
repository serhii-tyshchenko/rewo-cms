import { isEmpty } from 'lodash-es';

import { extractHeadersData } from '@api/utils';

import { TComment, TCommentDto, TListCommentsData } from '@types';

export const formatListCommentsResponse = (
  data: TCommentDto[],
  headers: Headers,
): TListCommentsData => ({
  ...extractHeadersData(headers),
  data: !isEmpty(data)
    ? data.map(
        (item): TComment => ({
          authorId: item.author,
          authorName: item.author_name,
          content: item.content.rendered,
          date: item.date,
          id: item.id,
          postId: item.post,
          status: item.status,
        }),
      )
    : [],
});
