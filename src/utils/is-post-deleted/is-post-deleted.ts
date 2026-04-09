import { TPostStatus } from '@types';

/**
 * Checks if a post is in the 'trash' status, indicating it has been deleted.
 *
 * @param {TPostStatus} status - The status of the post to check.
 * @returns {boolean} True if the post is deleted (in 'trash' status), false otherwise.
 */
export const isPostDeleted = (status: TPostStatus): boolean =>
  status === 'trash';
