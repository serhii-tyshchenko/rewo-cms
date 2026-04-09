/* eslint-disable no-alert */
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { isEqual } from 'lodash-es';

import { EntryForm } from '@components/common';
import { BaseLayout } from '@components/layout';

import { ROUTE } from '@constants';

import { useApiLoading, useTitle } from '@hooks';

import { useRemovePost, useRetrievePost, useUpdatePost } from '@queries';

import { TPostFormData } from '@types';

import { isPostDeleted } from '@utils';

import { PostEditHeader } from './components';

function PostEdit() {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    data: postData,
    refetch,
    dataUpdatedAt,
  } = useRetrievePost(Number(postId));
  const { onUpdatePost } = useUpdatePost();
  const { onRemovePost } = useRemovePost();
  const isApiLoading = useApiLoading();

  const [formData, setFormData] = useState({} as TPostFormData);

  useEffect(() => {
    if (!postData) {
      return;
    }
    setFormData((prev) => ({ ...prev, ...postData }));
  }, [postData, dataUpdatedAt]);

  const hasChanges = !isEqual(formData, postData);

  // TODO Add  category name in title
  useTitle(`${t('page.postEdit')} «${postData?.title ?? '...'}»`);

  const handleSubmit = useCallback(() => {
    onUpdatePost(formData);
  }, [dispatch, postData?.id, formData]);

  const handleReloadPost = useCallback(() => {
    if (hasChanges && !window.confirm(t('unsavedChangesConfirm'))) {
      return;
    }
    refetch();
  }, [hasChanges, refetch, t]);

  const handleRemovePost = useCallback(async () => {
    if (!window.confirm(t('removePostConfirm', { title: postData?.title }))) {
      return;
    }
    const { id, status } = postData || {};
    await onRemovePost({
      id: Number(id),
      force: isPostDeleted(status ?? 'publish'),
    });
    navigate(ROUTE.POSTS);
  }, [dispatch, postData?.id, postData?.title, navigate, t]);

  return (
    <BaseLayout>
      <PostEditHeader />
      {/* TODO Add page title */}
      <EntryForm
        data={formData}
        onChange={setFormData}
        onReloadEntry={handleReloadPost}
        onRemoveEntry={handleRemovePost}
        onSubmit={handleSubmit}
        hasChanges={hasChanges}
        editMode
        isSubmitting={isApiLoading}
      />
    </BaseLayout>
  );
}

export default PostEdit;
