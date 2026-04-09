import { useTranslation } from 'react-i18next';

import { TCategory } from 'types';

import { FormGroup, Input, Textarea } from '@components/ui';

interface IProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  formData: Partial<TCategory>;
}

function CategoryForm(props: IProps) {
  const { onSubmit, onChange, formData } = props;

  const { t } = useTranslation();

  return (
    <form onSubmit={onSubmit}>
      <FormGroup>
        <Input
          name="name"
          value={formData.name}
          onChange={onChange}
          placeholder={t('categoryName')}
          label={t('name')}
          required
        />
      </FormGroup>
      <FormGroup>
        <Input
          name="slug"
          value={formData.slug}
          onChange={onChange}
          placeholder={t('categorySlug')}
          label={t('slug')}
          required
        />
      </FormGroup>
      <FormGroup>
        <Textarea
          name="description"
          value={formData.description}
          onChange={onChange}
          placeholder={t('categoryDescription')}
          label={t('description')}
        />
      </FormGroup>
    </form>
  );
}

export default CategoryForm;
