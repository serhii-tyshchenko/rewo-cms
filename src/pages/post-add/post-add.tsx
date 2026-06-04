import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { isEqual } from 'lodash-es';

import { EntryForm, PageHeader } from '@components/common';
import { BaseLayout } from '@components/layout';
import { Breadcrumbs } from '@components/ui';

import { ROUTE } from '@constants';

import { useTitle } from '@hooks';

import { useAddPost, useRetrievePostMetaFields } from '@queries';

import { cleanObject, generateSlug } from '@utils';

import { INITIAL_STATE } from './post-add.constants';

function PostAdd() {
  const { t } = useTranslation();

  useTitle(t('page.postAdd'));
  const [formData, setFormData] = useState(INITIAL_STATE);

  const { onAddPost, isAdding } = useAddPost();

  const { data: metaFields } = useRetrievePostMetaFields();

  useEffect(() => {
    if (!metaFields) {
      return;
    }
    setFormData((prev) => ({
      ...prev,
      meta: metaFields.reduce(
        (acc, field) => ({ ...acc, [field]: '' }),
        formData.meta || {},
      ),
    }));
  }, [metaFields]);

  const handleSubmit = useCallback(() => {
    const { title, slug, content, categories, meta, excerpt, tags } =
      cleanObject({
        ...formData,
        slug: formData.autoSlug ? generateSlug(formData.title) : formData.slug,
      });
    onAddPost({
      title,
      slug,
      content,
      categories,
      excerpt,
      meta,
      tags,
      // TODO: add possibility to select post status
      status: 'publish',
    });
  }, [formData, onAddPost]);

  const hasChanges = !isEqual(formData, INITIAL_STATE);

  return (
    <BaseLayout>
      <PageHeader>
        <Breadcrumbs
          links={[
            { label: t('page.home'), link: ROUTE.HOME },
            { label: t('page.posts'), link: ROUTE.POSTS },
            { label: t('page.postAdd') },
          ]}
        />
      </PageHeader>
      <EntryForm
        data={formData}
        onChange={setFormData}
        onSubmit={handleSubmit}
        hasChanges={hasChanges}
        isSubmitting={isAdding}
      />
    </BaseLayout>
  );
}

export default PostAdd;
