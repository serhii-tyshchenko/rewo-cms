/* eslint-disable no-await-in-loop */

/* eslint-disable no-restricted-syntax */
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAddPostWithRetry } from '@queries';

import { toast } from '@services/notification-service';

import { convertStringToArray } from '@utils';

import { TCsvEntry } from './bulk-add-modal.types';
import { prepareMetaData } from './bulk-add-modal.utils';

interface IArgs {
  file: TCsvEntry[] | null;
  delay: number;
}

export function useBulkPostUpload() {
  const { t } = useTranslation();

  const { onAddPostWithRetry } = useAddPostWithRetry();

  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState<number>(0);

  const uploadPosts = useCallback(
    async ({ file, delay = 0 }: IArgs): Promise<void> => {
      try {
        setProgress(0);
        setIsUploading(true);

        for (const entry of file || []) {
          const {
            categories,
            slug,
            status = 'publish',
            title,
            tags = '',
            ...metaData
          } = entry;

          await onAddPostWithRetry({
            categories: convertStringToArray(categories),
            meta: prepareMetaData(metaData),
            slug,
            status,
            tags: convertStringToArray(tags),
            title,
          });

          setProgress((prev) => prev + 1);

          await new Promise<void>((resolve) => {
            setTimeout(resolve, delay * 1000);
          });
        }
        toast.success(t('postsAddedSuccessfully'));
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : t('postsAddedError');
        toast.error(message);
      } finally {
        setIsUploading(false);
      }
    },
    [onAddPostWithRetry, t],
  );

  return { uploadPosts, isUploading, progress };
}
